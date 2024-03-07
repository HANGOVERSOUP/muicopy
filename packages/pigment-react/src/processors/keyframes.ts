import type { Expression, TemplateElement } from '@babel/types';
import type {
  CallParam,
  TemplateParam,
  Params,
  TailProcessorParams,
  ValueCache,
} from '@wyw-in-js/processor-utils';
import { serializeStyles, Interpolation } from '@emotion/serialize';
import { type Replacements, type Rules, ValueType, type ExpressionValue } from '@wyw-in-js/shared';
import type { CSSInterpolation } from '@emotion/css';
import { validateParams } from '@wyw-in-js/processor-utils';
import BaseProcessor from './base-processor';
import type { IOptions } from './styled';
import { cache } from '../utils/emotion';

export type Primitive = string | number | boolean | null | undefined;

export type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

export class KeyframesProcessor extends BaseProcessor {
  callParam: CallParam | TemplateParam;

  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    if (params.length < 2) {
      throw BaseProcessor.SKIP;
    }
    validateParams(
      params,
      ['callee', ['call', 'template']],
      `Invalid use of ${this.tagSource.imported} tag.`,
    );

    const [, callParams] = params;
    if (callParams[0] === 'call') {
      this.dependencies.push(callParams[1]);

      const [firstArg, ...restArgs] = callParams.slice(1).flat() as (
        | ExpressionValue
        | TemplateElement
      )[];
      if ('kind' in firstArg && firstArg.kind === ValueType.LAZY) {
        restArgs.forEach((arg) => {
          if ('kind' in arg) {
            this.dependencies.push(arg);
          }
        });
      }
    } else if (callParams[0] === 'template') {
      callParams[1].forEach((element) => {
        if ('kind' in element && element.kind !== ValueType.CONST) {
          this.dependencies.push(element);
        }
      });
    }
    this.callParam = callParams;
  }

  build(values: ValueCache) {
    if (this.artifacts.length > 0) {
      throw new Error(`MUI: "${this.tagSource.imported}" is already built`);
    }

    const [callType, ...callArgs] = this.callParam;

    if (callType === 'template') {
      this.handleTemplate(this.callParam, values);
    } else {
      let isTaggedTemplateCall = false;
      const [firstArg, ...args] = callArgs.flat();
      if ('kind' in firstArg && firstArg.kind === ValueType.LAZY) {
        const firstValue = values.get(firstArg.ex.name) as Primitive | Primitive[];
        if (Array.isArray(firstValue) && firstValue.every((val) => typeof val === 'string')) {
          isTaggedTemplateCall = true;
          this.handleTaggedTemplateCall(
            firstArg.source.trim().match(/`([^`]+)`/)?.[1] || '',
            args,
            values,
          );
        }
      }

      if (!isTaggedTemplateCall) {
        this.handleCall(this.callParam, values);
      }
    }
  }

  private handleTemplate([, callArgs]: TemplateParam, values: ValueCache) {
    const templateStrs: string[] = [];
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    templateStrs.raw = [];
    const templateExpressions: Primitive[] = [];
    const { themeArgs } = this.options as IOptions;

    callArgs.forEach((item) => {
      if ('kind' in item) {
        switch (item.kind) {
          case ValueType.FUNCTION: {
            const value = values.get(item.ex.name) as TemplateCallback;
            templateExpressions.push(value(themeArgs));
            break;
          }
          case ValueType.CONST:
            templateExpressions.push(item.value);
            break;
          case ValueType.LAZY: {
            const evaluatedValue = values.get(item.ex.name);
            if (typeof evaluatedValue === 'function') {
              templateExpressions.push(evaluatedValue(themeArgs));
            } else {
              templateExpressions.push(evaluatedValue as Primitive);
            }
            break;
          }
          default:
            break;
        }
      } else if (item.type === 'TemplateElement') {
        templateStrs.push(item.value.cooked as string);
        // @ts-ignore
        templateStrs.raw.push(item.value.raw);
      }
    });
    this.generateArtifacts(templateStrs, ...templateExpressions);
  }

  // This is a temporary support for `call` that has tagged template literal as first argument
  // It's likely come from bundled code, e.g. `@mui/material` stable build.
  // We can remove this once we updated the browserslist.rc in v6
  private handleTaggedTemplateCall(
    taggedTemplate: string,
    expressions: (ExpressionValue | TemplateElement)[],
    values: ValueCache,
  ) {
    const templateExpressions: Primitive[] = [];
    const { themeArgs } = this.options as IOptions;

    expressions.forEach((item) => {
      if ('kind' in item) {
        switch (item.kind) {
          case ValueType.FUNCTION: {
            const value = values.get(item.ex.name) as TemplateCallback;
            templateExpressions.push(value(themeArgs));
            break;
          }
          case ValueType.CONST:
            templateExpressions.push(item.value);
            break;
          case ValueType.LAZY: {
            const evaluatedValue = values.get(item.ex.name);
            if (typeof evaluatedValue === 'function') {
              templateExpressions.push(evaluatedValue(themeArgs));
            } else {
              templateExpressions.push(evaluatedValue as Primitive);
            }
            break;
          }
          default:
            break;
        }
      }
    });

    const newTemplate = taggedTemplate.replace(/\$\{[^}]+\}/gm, () =>
      String(templateExpressions.shift()),
    );

    this.generateArtifacts(`${newTemplate}`);
  }

  generateArtifacts(styleObjOrTaggged: CSSInterpolation | string[], ...args: Primitive[]) {
    const { styles } = serializeStyles(
      [styleObjOrTaggged as Interpolation<{}>, args],
      cache.registered,
    );
    const cssText = `@keyframes {${styles}}`;

    const rules: Rules = {
      [this.asSelector]: {
        className: this.className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const sourceMapReplacements: Replacements = [
      {
        length: cssText.length,
        original: {
          start: {
            column: this.location?.start.column ?? 0,
            line: this.location?.start.line ?? 0,
          },
          end: {
            column: this.location?.end.column ?? 0,
            line: this.location?.end.line ?? 0,
          },
        },
      },
    ];
    this.artifacts.push(['css', [rules, sourceMapReplacements]]);
  }

  private handleCall([, callArg]: CallParam, values: ValueCache) {
    let styleObj: CSSInterpolation;
    if (callArg.kind === ValueType.LAZY) {
      styleObj = values.get(callArg.ex.name) as CSSInterpolation;
    } else if (callArg.kind === ValueType.FUNCTION) {
      const { themeArgs } = this.options as IOptions;
      const value = values.get(callArg.ex.name) as (
        args: Record<string, unknown> | undefined,
      ) => CSSInterpolation;
      styleObj = value(themeArgs);
    }
    if (styleObj) {
      this.generateArtifacts(styleObj);
    }
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    this.doEvaltimeReplacement();
  }

  get asSelector() {
    return this.className;
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.className);
  }
}

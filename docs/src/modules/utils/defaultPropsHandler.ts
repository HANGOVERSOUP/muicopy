import * as astTypes from 'ast-types';
import { parse as parseDoctrine, Annotation } from 'doctrine';
import { Documentation, Handler, Importer, NodePath, utils as docgenUtils } from 'react-docgen';
import { isAnnotatedComponent } from './findAnnotatedComponentsResolver';

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112
// adjusted for material-ui getThemedProps

const { namedTypes: types } = astTypes;

function getDefaultValue(
  propertyPath: NodePath,
  importer: Importer,
): { value: string; computed: boolean } | null {
  if (!types.AssignmentPattern.check(propertyPath.get('value').node)) {
    return null;
  }
  let path: NodePath = propertyPath.get('value', 'right');
  let node = path.node;

  let defaultValue: string | undefined;
  if (types.Literal.check(path.node)) {
    // @ts-expect-error TODO upstream fix
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue(path.get('right'), importer);
    } else {
      path = resolveToValue(path, importer);
    }
    if (types.ImportDeclaration.check(path.node)) {
      if (!types.Identifier.check(node)) {
        throw new TypeError(
          `Unable to follow data flow. Expected an 'Identifier' resolve to an 'ImportDeclaration'. Instead attempted to resolve a '${node.type}'.`,
        );
      }
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue(path);
    }
  }
  if (defaultValue !== undefined) {
    return {
      value: defaultValue,
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node),
    };
  }

  return null;
}

function getJsdocDefaultValue(jsdoc: Annotation): { value: string } | undefined {
  const defaultTag = jsdoc.tags.find((tag) => tag.title === 'default');
  if (defaultTag === undefined) {
    return undefined;
  }
  return { value: defaultTag.description || '' };
}

function getDefaultValuesFromProps(
  properties: NodePath,
  documentation: Documentation,
  importer: Importer,
): void {
  const { props: documentedProps } = documentation.toObject();
  const implementedProps: Record<string, NodePath> = {};
  properties
    .filter((propertyPath: NodePath) => types.Property.check(propertyPath.node), undefined)
    .forEach((propertyPath: NodePath) => {
      const propName = getPropertyName(propertyPath);
      if (propName) {
        implementedProps[propName] = propertyPath;
      }
    });

  // Sometimes we list props in .propTypes even though they're implemented by another component
  // These props are spread so they won't appear in the component implementation.
  Object.entries(documentedProps).forEach(([propName, propDescriptor]) => {
    if (propDescriptor.description === undefined) {
      // private props have no propsType validator and therefore
      // not description.
      // They are either not subject to eslint react/prop-types
      // or are and then we catch these issues during linting.
      return;
    }

    const jsdocDefaultValue = getJsdocDefaultValue(
      parseDoctrine(propDescriptor.description, {
        sloppy: true,
      }),
    );
    if (jsdocDefaultValue) {
      propDescriptor.jsdocDefaultValue = jsdocDefaultValue;
    }

    const propertyPath = implementedProps[propName];
    if (propertyPath !== undefined) {
      const defaultValue = getDefaultValue(propertyPath, importer);
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    } else {
      propDescriptor.external = true;
    }
  });
}

function getRenderBody(componentDefinition: NodePath, importer: Importer): NodePath {
  const value = resolveToValue(componentDefinition, importer);
  if (isReactForwardRefCall(value, importer)) {
    return value.get('arguments', 0, 'body', 'body');
  }
  return value.get('body', 'body');
}

function getPropsPath(functionBody: NodePath): NodePath | undefined {
  let propsPath: NodePath | undefined;
  // visitVariableDeclarator, can't use visit body.node since it looses scope information
  functionBody
    .filter((path: NodePath) => {
      return types.VariableDeclaration.check(path.node);
    }, undefined)
    .forEach((path: NodePath) => {
      const declaratorPath = path.get('declarations', 0);
      if (declaratorPath.get('init', 'name').value === 'props') {
        propsPath = declaratorPath.get('id');
      }
    });

  return propsPath;
}

const defaultPropsHandler: Handler = (documentation, componentDefinition, importer) => {
  if (isAnnotatedComponent(componentDefinition)) {
    Object.values(documentation.toObject().props).forEach((propDescriptor) => {
      // For annotated components static analysis already breaks down.
      // Props can be considered external i.e. we can't verify if the documented default value matches at runtime.
      propDescriptor.external = true;
    });
  } else {
    const renderBody = getRenderBody(componentDefinition, importer);
    const props = getPropsPath(renderBody);
    if (props !== undefined) {
      getDefaultValuesFromProps(props.get('properties'), documentation, importer);
    }
  }
};

export default defaultPropsHandler;

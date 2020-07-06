import { ComponentsPropsList } from './props';
import { CSSProperties, CreateCSSProperties, PropsFunc } from '@material-ui/styles/withStyles';

export type Variants = {
  [Name in keyof ComponentsPropsList]?: Array<{
    matcher: Partial<ComponentsPropsList[Name]>;
    styles: // JSS property bag
    | CSSProperties
      // JSS property bag where values are based on props
      | CreateCSSProperties<Partial<ComponentsPropsList[Name]>>
      // JSS property bag based on props
      | PropsFunc<
          Partial<ComponentsPropsList[Name]>,
          CreateCSSProperties<Partial<ComponentsPropsList[Name]>>
        >;
  }>;
};

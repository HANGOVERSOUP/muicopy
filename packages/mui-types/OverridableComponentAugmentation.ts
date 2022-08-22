import * as React from 'react';

declare module '@mui/types' {
  /**
   * A component whose root component can be controlled via a `component` prop.
   *
   * Adjusts valid props based on the type of `component`.
   */
  export interface OverridableComponent<M extends OverridableTypeMap> {
    <C extends React.ElementType>(
      props: {
        /**
         * The component used for the root node.
         * Either a string to use a HTML element or a component.
         */
        component: C;
      } & OverridePropsVer2<M, C>,
    ): JSX.Element;
    (props: DefaultComponentPropsVer2<M>): JSX.Element;
    propTypes?: any;
  }

  /**
   * Props of the component if `component={Component}` is used.
   */
  // prettier-ignore
  export type OverridePropsVer2<
  M extends OverridableTypeMap,
  C extends React.ElementType
  > = (
  & BaseProps<M>
  & DistributiveOmit<React.ComponentPropsWithoutRef<C>, keyof BaseProps<M>>
  & { ref?: React.Ref<any> }
  );

  /**
   * Props if `component={Component}` is NOT used.
   */
  // prettier-ignore
  export type DefaultComponentPropsVer2<M extends OverridableTypeMap> =
  & BaseProps<M>
  & DistributiveOmit<React.ComponentPropsWithoutRef<M['defaultComponent']>, keyof BaseProps<M>>
  & { ref?: React.Ref<any> };
}

import * as React from 'react';
import { useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import { ColorPaletteProp, VariantProp } from './types';

const VariantOverride = React.createContext<undefined | Array<VariantProp>>(undefined);

export const useVariantInversion = (childVariant: VariantProp | undefined) => {
  const overriableVariants = React.useContext(VariantOverride);
  return {
    /**
     * Resolve the `color` value for the component.
     * @param {ColorPaletteProp | 'inherit' | undefined} instanceColorProp The color defined on the instance.
     * @param {ColorPaletteProp | 'inherit' | undefined} defaultColorProp The default color to use when variant inversion is not enabled.
     */
    getColor: (
      instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
      defaultColorProp: ColorPaletteProp | 'inherit' | undefined,
    ): ColorPaletteProp | undefined => {
      if (overriableVariants && childVariant) {
        if (overriableVariants.includes(childVariant)) {
          // @ts-ignore internal logic
          return instanceColorProp || 'context';
        }
      }
      // @ts-ignore internal logic
      return instanceColorProp || defaultColorProp;
    },
  };
};

interface VariantInversionProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
}

export const VariantInversionProvider = ({ children, variant }: VariantInversionProviderProps) => {
  const theme = useSystemTheme(defaultTheme);
  return (
    <VariantOverride.Provider value={variant ? theme.variantInversionConfig[variant] : undefined}>
      {children}
    </VariantOverride.Provider>
  );
};

export default VariantOverride;

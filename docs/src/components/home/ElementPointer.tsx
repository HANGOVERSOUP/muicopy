import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { debounce } from '@material-ui/core/utils';

const PointerContext = React.createContext<undefined | React.Dispatch<React.SetStateAction<Data>>>(
  undefined,
);

export const withPointer = <T extends React.ElementType>(
  Component: T,
  options: { id: string; name: string },
) => {
  const WithPointer = (props: unknown) => {
    const root = React.useRef<null | HTMLElement>(null);
    const setData = React.useContext(PointerContext);
    return (
      <React.Fragment>
        {/* @ts-ignore */}
        <Component
          ref={root}
          {...props}
          onMouseOver={(event: React.MouseEvent) => {
            event.stopPropagation();
            if (setData && root.current) {
              setData({
                id: options.id,
                target: root.current,
                name: options.name,
              });
            }
          }}
        />
      </React.Fragment>
    );
  };

  return WithPointer as T;
};

export type Data = { id: null | string; name: null | string; target: null | HTMLElement };

export default function PointerContainer({
  onElementChange,
  ...props
}: BoxProps & { onElementChange?: (data: Data) => void }) {
  const container = React.useRef<null | HTMLDivElement>(null);
  const [data, setData] = React.useState<Data>({
    id: null,
    name: null,
    target: null,
  });
  const debouncedSetData = React.useRef(debounce(setData, 200));
  React.useEffect(() => {
    if (onElementChange) onElementChange(data);
  }, [data, onElementChange]);
  return (
    <PointerContext.Provider value={debouncedSetData.current}>
      <Box
        ref={container}
        {...props}
        onMouseLeave={() => debouncedSetData.current({ id: null, name: null, target: null })}
        sx={{ position: 'relative', ...props.sx }}
      >
        {props.children}
        {container.current && data.target && (
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              pointerEvents: 'none',
              position: 'absolute',
              zIndex: 10,
              transition: 'none !important',
              ...(() => {
                const containerRect = container.current.getBoundingClientRect();
                const targetRect = data.target.getBoundingClientRect();
                return {
                  top: targetRect.top - containerRect.top,
                  left: targetRect.left - containerRect.left,
                  width: `${targetRect.width}px`,
                  height: `${targetRect.height}px`,
                };
              })(),
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.main',
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
                px: 0.5,
                position: 'absolute',
                top: 0,
                transform: 'translateY(-100%)',
                left: -1,
              }}
            >
              <Typography
                color="#fff"
                fontSize="0.625rem"
                fontWeight={500}
                sx={{ display: 'block' }}
              >
                {data.name}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </PointerContext.Provider>
  );
}

import * as React from 'react';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';

export default function AvatarVariantsAndColors() {
  const [variant, setVariant] = React.useState<AvatarProps['variant']>('soft');
  const [color, setColor] = React.useState<AvatarProps['color']>('neutral');
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mx: 'auto', alignSelf: 'center', p: 3 }}>
        <Avatar
          variant={variant}
          color={color}
          alt="Cindy Baker"
          src="/static/images/avatar/4.jpg"
        />
        <Avatar variant={variant} color={color}>
          IN
        </Avatar>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 343,
          p: 2,
          bgcolor: 'background.level1',
          borderRadius: 'sm',
        }}
      >
        <Typography
          level="body2"
          fontWeight="xl"
          id="avatar-variant-selector"
          textColor="text.primary"
          mb={1}
        >
          Variants
        </Typography>
        <RadioGroup
          row
          name="avatar-variant"
          aria-labelledby="avatar-variant-selector"
          value={variant}
          onChange={(event) =>
            setVariant(event.target.value as AvatarProps['variant'])
          }
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {['plain', 'outlined', 'soft', 'solid'].map((value) => {
            const checked = variant === value;
            return (
              <Chip
                size="sm"
                variant="outlined"
                color={checked ? 'primary' : 'neutral'}
              >
                <Radio
                  size="sm"
                  variant={checked ? 'solid' : 'outlined'}
                  color={checked ? 'primary' : 'neutral'}
                  label={
                    <Typography
                      endDecorator={checked ? <Check fontSize="md" /> : null}
                    >
                      {value}
                    </Typography>
                  }
                  value={value}
                  disableIcon
                  overlay
                />
              </Chip>
            );
          })}
        </RadioGroup>

        <Typography
          id="avatar-color-selector"
          level="body2"
          fontWeight="xl"
          textColor="text.primary"
          mb={1}
          mt={3}
        >
          Color
        </Typography>
        <RadioGroup
          row
          name="avatar-color"
          aria-labelledby="avatar-color-selector"
          value={color}
          onChange={(event) => setColor(event.target.value as AvatarProps['color'])}
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {['neutral', 'primary', 'danger', 'info', 'success', 'warning'].map(
            (value) => {
              const checked = color === value;
              return (
                <Chip
                  size="sm"
                  variant="outlined"
                  color={checked ? 'primary' : 'neutral'}
                >
                  <Radio
                    size="sm"
                    variant={checked ? 'solid' : 'outlined'}
                    color={checked ? 'primary' : 'neutral'}
                    label={
                      <Typography
                        endDecorator={checked ? <Check fontSize="md" /> : null}
                      >
                        {value}
                      </Typography>
                    }
                    value={value}
                    disableIcon
                    overlay
                  />
                </Chip>
              );
            },
          )}
        </RadioGroup>
      </Sheet>
    </Box>
  );
}

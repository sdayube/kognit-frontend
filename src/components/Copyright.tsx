import { Link, Typography } from '@mui/material';
import { SxProps, TypographyProps } from '@mui/system';

export function Copyright(
  props: TypographyProps & {
    sx?: SxProps;
  },
) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        target="_blank"
        href="https://www.linkedin.com/in/silvio-dayube/"
      >
        Silvio Dayube Carigé
      </Link>
      {' - '}
      {new Date().getFullYear()}
    </Typography>
  );
}

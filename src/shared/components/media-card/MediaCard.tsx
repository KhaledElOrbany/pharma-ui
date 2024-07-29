import { CardMedia } from '@mui/material';
import 'react-medium-image-zoom/dist/styles.css';
import { API_URL } from '../../../redux/baseQuery';

type MediaCardProps = {
  withZoom?: boolean;
  isNew?: boolean;
  alt: string;
  height?: number | string;
  width?: number | string;
  src: string;
  sx?: object;
};

export default function MediaCard({
  isNew = false,
  alt,
  height = 64,
  width = 64,
  src,
  sx,
}: MediaCardProps) {
  const defaultSx = {
    objectFit: 'contain',
    mixBlendMode: 'multiply',
  };

  return (
    <CardMedia
      loading='lazy'
      component='img'
      alt={alt}
      width={width}
      height={height}
      src={isNew ? src : API_URL + '/images' + src}
      sx={{
        ...sx,
        ...defaultSx,
      }}
    />
  );
}

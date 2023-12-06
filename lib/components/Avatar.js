import { cn } from 'lib/utils';

export default function Avatar({ size, shape }) {
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }[size];
  const shapeClass = {
    circle: 'rounded-full',
    square: 'rounded-md',
  }[shape];
  return <img src="/default_avatar.png" alt="default avatar" className={cn(sizeClass, shapeClass, 'border')} />;
}

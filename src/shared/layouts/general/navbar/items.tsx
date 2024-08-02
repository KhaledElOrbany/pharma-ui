import { JSX } from 'react';
import SvgColor from '@/shared/components/svg-color';

export type itemProps = {
  title: string;
  path: string;
  icon: JSX.Element;
  isActive: boolean;
  subItems?: itemProps[];
};

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const items: itemProps[] = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_dashboard'),
    isActive: true,
  },
  {
    title: 'doctors',
    path: '/doctors',
    icon: icon('ic_doctor'),
    isActive: true,
  },
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
    isActive: true,
  },
];

export default items;

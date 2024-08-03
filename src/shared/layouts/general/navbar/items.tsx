import { JSX } from 'react';
import SvgColor from '@/shared/components/svg-color';

export type itemProps = {
  title: string;
  path: string;
  icon: JSX.Element;
  isActive: boolean;
  allowedRoles: string[];
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
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    title: 'doctors',
    path: '/doctors',
    icon: icon('ic_doctor'),
    isActive: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    title: 'doctorClasses',
    path: '/doctorClass',
    icon: icon('ic_doctorClass'),
    isActive: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    title: 'pharmacies',
    path: '/pharmacy',
    icon: icon('ic_pharmacy'),
    isActive: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    title: 'medicines',
    path: '/medicine',
    icon: icon('ic_medicine'),
    isActive: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
    isActive: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
];

export default items;

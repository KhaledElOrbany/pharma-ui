import SvgColor from '@/shared/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const items = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_dashboard'),
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

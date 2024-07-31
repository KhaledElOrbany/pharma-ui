import { NavLink as RouterLink } from 'react-router-dom';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { StyledNavItemIcon } from './styles';
import { useTranslation } from 'react-i18next';
import Iconify from '../iconify';
import { useState } from 'react';

type NavSectionProps = {
  data: any[];
  sx?: object;
};

export default function NavSection({ data = [], ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data
          .filter((item) => item.isActive)
          .map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
      </List>
    </Box>
  );
}

type NavItemProps = {
  item: {
    title: string;
    path: string;
    icon: any;
    subItems: any[];
  };
};

function NavItem({ item }: NavItemProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { title, path, icon, subItems } = item;
  const isRTL = localStorage.getItem('language') === 'ar';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItemButton
        component={RouterLink}
        to={path}
        sx={{
          ...theme.typography.body2,
          height: 48,
          position: 'relative',
          textTransform: 'capitalize',
          color: theme.palette.text.secondary,
          borderRadius: theme.shape.borderRadius,
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
            my: 0.4,
          },
          ...(isRTL && { textAlign: 'right' }),
          ...(isRTL && { pl: 1 }),
          ...(isRTL && { pr: 1 }),
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText primary={t(title)} />
        {subItems && subItems.length > 0 && (
          <Box component='span'>
            <IconButton
              title='Sub Menu'
              aria-haspopup='true'
              aria-controls='profile-menu'
              onClick={(event) => {
                event.preventDefault();
                setIsOpen(!isOpen);
              }}
              sx={{
                ...(isRTL ? { ml: 1 } : { mr: 1 }),
              }}
            >
              {isOpen ? (
                <Iconify
                  icon={'mingcute:down-fill'}
                  color={theme.palette.text.secondary}
                />
              ) : isRTL ? (
                <Iconify
                  icon={'mingcute:left-fill'}
                  color={theme.palette.text.secondary}
                />
              ) : (
                <Iconify
                  icon={'mingcute:right-fill'}
                  color={theme.palette.text.secondary}
                />
              )}
            </IconButton>
          </Box>
        )}
      </ListItemButton>

      {isOpen && subItems && (
        <NavSection
          data={subItems.filter((subItem) => subItem.isActive)}
          sx={{ ...(isRTL ? { pr: 3 } : { pl: 3 }) }}
        />
      )}
    </>
  );
}

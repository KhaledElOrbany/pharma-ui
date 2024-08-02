import { useEffect } from 'react';
import {
  alpha,
  Avatar,
  Box,
  Drawer,
  Skeleton,
  styled,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import useResponsive from '@/helpers/hooks/useResponsive';
import Scrollbar from '@/shared/components/scrollbar';
import Logo from '@/shared/components/logo';
import NavSection from '@/shared/components/nav-section';
import navConfig from './config';

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export default function Nav({
  openNav,
  onCloseNav,
}: {
  openNav: boolean;
  onCloseNav: () => void;
}) {
  const { pathname } = useLocation();
  const currentUser = { name: 'Khaled', phone_number: '01554103081' };
  const isLoading = false;
  const isRTL = localStorage.getItem('language') === 'ar';
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <StyledAccount>
          {isLoading ? (
            <Skeleton
              variant='circular'
              animation='pulse'
              width={40}
              height={40}
            />
          ) : (
            <Avatar src={''} alt={currentUser?.name} />
          )}

          <Box
            sx={{
              width: '70%',
              ml: isRTL ? 0 : 2.5,
              mr: isRTL ? 2.5 : 0,
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {isLoading ? (
                <Skeleton variant='text' animation='pulse' width='100%' />
              ) : (
                currentUser?.name
              )}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {isLoading ? (
                <Skeleton variant='text' animation='pulse' width={'80%'} />
              ) : (
                currentUser?.phone_number
              )}
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          anchor={isRTL ? 'right' : 'left'}
          variant='permanent'
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: (theme) => theme.palette.background.default,
              borderRightStyle: isRTL ? 'none' : 'dashed',
              borderLeftStyle: isRTL ? 'dashed' : 'none',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          anchor={isRTL ? 'right' : 'left'}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

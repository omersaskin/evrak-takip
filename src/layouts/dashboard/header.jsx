import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import { HEADER } from './config-layout';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md'); // Adjust breakpoint as needed

  const renderContent = (
    <>
      {isMobile && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          style={{ backgroundColor: '#F9FAFB', zIndex: 0 }}
          sx={{
            boxShadow: 'none',
            height: HEADER.H_MOBILE,
            zIndex: theme.zIndex.appBar + 1,
            transition: theme.transitions.create(['height'], {
              duration: theme.transitions.duration.shorter,
            }),
          }}
        >
          <Toolbar
            sx={{
              height: 1,
              px: { lg: 5 },
            }}
          >
            {renderContent}
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

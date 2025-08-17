import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Fade } from '@mui/material';
import { setSplashVisible } from '../../store/slices/appSlice';
import SplashScreen from '../common/SplashScreen';
import SessionContextContainer from '../common/SessionContextContainer';
import WorkingWindowArea from '../common/WorkingWindowArea';
import MoreFunctionButton from '../common/MoreFunctionButton';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { splashVisible } = useSelector((state) => state.app);

  const handleMoreFunctionClick = () => {
    console.log('More functions clicked - ready for next features!');
    // Future functionality will be added here
  };

  useEffect(() => {
    if (splashVisible) {
      const timer = setTimeout(() => {
        dispatch(setSplashVisible(false));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, splashVisible]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <SplashScreen />

      <Fade in={!splashVisible} timeout={800}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            visibility: splashVisible ? 'hidden' : 'visible',
          }}
        >
          <SessionContextContainer />
          <WorkingWindowArea />
        </Box>
      </Fade>

      <MoreFunctionButton onClick={handleMoreFunctionClick} />
    </Box>
  );
};

export default MainLayout;

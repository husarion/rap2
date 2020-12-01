import React, { useState } from 'react';

import DestTable from './DestTable';
import Instructions from './Instructions';
import Logo from './Logo';
import ModelSizeSlider from './ModelSizeSlider';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const husarionMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5f52',
      main: '#c62828',
      dark: '#8e0000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff867c',
      main: '#ef5350',
      dark: '#b61827',
      contrastText: '#000',
    },
  },
});

export default (props) => {

  return (
    <div>
      <Logo />
      <Instructions />
      <DestTable targets={props.targets} />
      <ThemeProvider theme={husarionMaterialTheme}>
        <ModelSizeSlider 
          changeModelSizeHandler={props.changeModelSizeHandler}
        />
      </ThemeProvider>
    </div>
  );
}
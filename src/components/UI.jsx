import React, { useState } from 'react';

import DestTable from './DestTable';
import Instructions from './Instructions';
import Logo from './Logo';
import ModelSizeSlider from './ModelSizeSlider';
import AddTargetButton from './AddTargetButton';
import LoggingButton from './LoggingButton';

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

  const deleteTargetById = (id) => {
    const updatedTargets = [];
    props.targets.forEach(t => {
      if (t.id !== id) {
        updatedTargets.push(t);
      }
    });

    return updatedTargets;
  }

  return (
    <div>
      <Logo />
      <Instructions />
      <DestTable 
        targets={props.targets} 
        activeTargetId={props.activeTargetId}
        deleteButtonClickHandler={(id) => {
          const newTargets = deleteTargetById(id);
          props.updateTargetsHandler(newTargets);
        }} 
      />
      <ThemeProvider theme={husarionMaterialTheme}>
        <ModelSizeSlider 
          changeModelSizeHandler={props.changeModelSizeHandler}
        />
        <AddTargetButton
          clickHandler={props.addTargetHandler}
        />
        <LoggingButton
          clickHandler={props.debugModeHandler}
        />
      </ThemeProvider>
    </div>
  );
}
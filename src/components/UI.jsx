import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DestTable from './DestTable';
import Instructions from './Instructions';
import Logo from './Logo';
import AddTargetButton from './buttons/AddTargetButton';
import ResetCameraButton from './buttons/ResetCameraButton';

import ConnectionIndicator from './ConnectionIndicator';

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
  // it's mildly annoying that these modifiers are in this place,
  // but i am gonna leave it for now.

  const deleteTargetById = (id) => {
    const updatedTargets = [];
    props.targets.forEach((t) => {
      if (t.id !== id) {
        updatedTargets.push(t);
      }
    });

    return updatedTargets;
  };

  const modifyTargetById = (id, changes) => {
    const updatedTargets = [];
    props.targets.forEach((t) => {
      if (t.id === id) {
        Object.assign(t, changes);
      }
      updatedTargets.push(t);
    });

    return updatedTargets;
  };

  return (
    <div>
      <Logo />
      <Instructions />
      <ConnectionIndicator />
      <ThemeProvider theme={husarionMaterialTheme}>
        <AddTargetButton clickHandler={props.addTargetHandler} />
        {/* <LoggingButton clickHandler={props.debugModeHandler} /> */}
        <ResetCameraButton clickHandler={props.resetCameraHandler} />
      </ThemeProvider>
      <DestTable
        targets={props.targets}
        activeTargetId={props.activeTargetId}
        deleteButtonClickHandler={(id) => {
          const newTargets = deleteTargetById(id);
          props.updateTargetsHandler(newTargets);
        }}
        modifyTargetHandler={(id, changes) => {
          const newTargets = modifyTargetById(id, changes);
          props.updateTargetsHandler(newTargets);
        }}
      />
    </div>
  );
};

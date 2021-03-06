import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DestTable from './DestTable';
import Instructions from './Instructions';
import Logo from './Logo';
import AddTargetButton from './buttons/AddTargetButton';
import ResetCameraButton from './buttons/ResetCameraButton';
import StopButton from './buttons/StopButton';

import ConnectionIndicator from './ConnectionIndicator';
import RestartSLAMButton from './buttons/RestartSLAMButton';

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

export default (props) => (
  <div>
    <Logo />
    <Instructions />
    <ConnectionIndicator isConnected={props.isConnected} />
    <ThemeProvider theme={husarionMaterialTheme}>
      <AddTargetButton clickHandler={props.addTargetHandler} />
      <ResetCameraButton clickHandler={props.resetCameraHandler} />
      <StopButton clickHandler={props.stopHandler} />
      <RestartSLAMButton clickHandler={props.restartSLAMHandler} />
    </ThemeProvider>
    <DestTable
      targets={props.targets}
      activeTargetId={props.activeTargetId}
      driveToTargetButtonClickHandler={(id) => {
        props.driveToTargetHandler(id);
      }}
      deleteButtonClickHandler={(id) => {
        props.deleteTargetHandler(id);
      }}
      modifyTargetHandler={(id, changes) => {
        props.modifyTargetHandler(id, changes);
      }}
      rowMouseOverHandler={props.highlightTarget}
      rowMouseOutHandler={props.clearHighlightTarget}
    />
  </div>
);

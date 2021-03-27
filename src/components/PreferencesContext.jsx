import React, { createContext, useContext } from 'react';

export const PreferencesContext = createContext({
  arrowHelperColor: 0x00ff00,
});

export const usePreferences = () => useContext(PreferencesContext);

export class PreferencesManager extends React.Component {
  state = {
    arrowHelperColor: 0x00ff00,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PreferencesContext.Provider
        value={{ ...this.state }}
      >
        {this.props.children}
      </PreferencesContext.Provider>
    );
  }
}

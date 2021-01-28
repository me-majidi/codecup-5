import React from "react";
import { THEME_TYPE } from "../constants";

export const ThemeContext = React.createContext(THEME_TYPE.LIGHT);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(THEME_TYPE.LIGHT);

  function toggleTheme() {
    if (theme === THEME_TYPE.DARK) {
      setTheme(THEME_TYPE.LIGHT);
    } else {
      setTheme(THEME_TYPE.DARK);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode: theme,
        changeTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

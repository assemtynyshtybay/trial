import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem("isDark")) || false
  );

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || {
      name: "",
      surname: "",
      email: "",
    }
  );

  const toggleTheme = () => {
    setIsDarkTheme((v) => !v);
  };

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, data, setData }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

import React, { useContext } from "react";
import notFound from "../assets/images/404-dark.png";
import notFoundLight from "../assets/images/404-light.png";
import { ThemeContext } from "../hocs/ThemeContext";

const NotFoundPage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div className="cont-404">
      <img src={isDarkTheme ? notFound : notFoundLight} alt="png" />
    </div>
  );
};

export default NotFoundPage;

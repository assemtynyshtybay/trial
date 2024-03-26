import { useContext } from "react";
import { ThemeContext } from "./hocs/ThemeContext";
import NavBar from "./components/NavBar";
import "./index.css";
import { Outlet } from "react-router-dom";
import {
  Container,
  Footer,
  MCart,
  MCartContainer,
} from "./utils/styledComponents";
import { BsCartPlus } from "react-icons/bs";
import { useOutClick } from "./hooks/useOutClick";
import Cart from "./components/Cart";

function App() {
  const { isDarkTheme } = useContext(ThemeContext);
  const { setIsOpen, isOpen, openRef } = useOutClick();
  return (
    <Container className={`app ${isDarkTheme && "dark"}`}>
      <NavBar />
      <Outlet />
      <Footer>@assemtynyshtybay</Footer>
      <MCart
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <BsCartPlus size={35} />
      </MCart>
      {isOpen && <Cart openRef={openRef} setIsOpen={setIsOpen} />}
    </Container>
  );
}

export default App;

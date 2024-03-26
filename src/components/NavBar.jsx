import { useContext } from "react";
import { ThemeContext } from "../hocs/ThemeContext";
import { MdLightMode, MdOutlineNightlight } from "react-icons/md";
import FormC from "./Form";
import styled from "styled-components";
import { FaUser } from "react-icons/fa6";
import { TfiControlForward } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { HOME, NEWS, PRODUCTS } from "../utils/variables";
import { useOutClick } from "../hooks/useOutClick";

const NavBar = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { setIsOpen, isOpen: isUserData, openRef } = useOutClick();
  const nav = useNavigate();

  return (
    <NavBarContainer>
      <Icon onClick={() => nav(HOME)}>
        <TfiControlForward size={35} color="orange" />
        <span>elta</span>
      </Icon>
      <NavTabs>
        <Tab onClick={() => nav(HOME)}>Главная</Tab>
        <Tab onClick={() => nav(PRODUCTS)}>Магазин</Tab>
        <Tab onClick={() => nav(NEWS)}>Новости</Tab>

        <Icon onClick={toggleTheme.bind(null)} data-title="Режим">
          {isDarkTheme ? (
            <MdLightMode size={30} />
          ) : (
            <MdOutlineNightlight size={30} />
          )}
        </Icon>
        <Icon data-title="Профиль">
          <FaUser onClick={() => setIsOpen((v) => !v)} size={30} />
        </Icon>
      </NavTabs>
      {isUserData && <FormC dataRef={openRef} />}
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  grid-area: nav;
  width: 100%;
  background-color: var(--grey);
  padding: 0.25rem 8rem;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const NavTabs = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 3rem;
  color: var(--text-light);
  cursor: pointer;
  span {
    font-size: 2rem;
  }
`;

const Tab = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark-blue);
`;

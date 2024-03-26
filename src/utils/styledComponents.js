import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  height: 100vh;

  /* grid-template-columns: 1fr; */
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-template-areas:
    "nav"
    "main"
    "footer";
  text-align: center;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    /* grid-template-columns: 1fr; */
    grid-template-rows: 0.4fr 6fr 1fr;
    grid-template-areas:
      "nav"
      "main"
      "footer";
  }
`;
export const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
export const Main = styled.main`
  grid-area: main;
`;

export const Footer = styled.footer`
  grid-area: footer;
  padding: 0.4rem;
  background-color: var(--bg-light);
  color: var(--text-light);
`;

export const PageContainer = styled.div`
  width: 100%;
  /* max-width: 2040px; */
  padding: 0.8rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-light);
`;

export const Cards = styled.div`
  width: 100%;
  display: ${({ isflex }) => (isflex ? "flex" : "grid")};
  flex-flow: column nowrap;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  overflow: hidden;
`;
export const BackCard = styled.div`
  background: ${({ url }) => (url ? `url(${url}) no-repeat center` : "none")};
  background-size: cover;
  cursor: pointer;
`;
export const Card = styled.div`
  padding: 1.5rem;
  display: grid;
  ${({ url }) => (url ? "backdrop-filter: blur(15px)" : "")};
  grid-template-columns: 35% 55%;
  grid-template-rows: 0.5fr 1.8fr 0.5fr;
  gap: 0.5rem;
  height: auto;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--grey);
  border-radius: 8px;
  box-sizing: border-box;
`;

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const Dot = styled.div`
  background-color: var(--text-light);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const blinkElement = keyframes`
  0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	50% {
		-webkit-transform: scale(0.9);
		transform: scale(0.9);
	}
	100% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
`;
export const MCart = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 5rem;
  background-color: var(--dark-blue);
  border-radius: 100%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${blinkElement} 1.5s linear infinite;
`;

export const MCartContainer = styled.div`
  position: fixed;
  bottom: 6rem;
  right: 1rem;
  background-color: var(--dark-blue);
  color: #fff;
  border-radius: 8px;
  width: 270px;
  height: fit-content;
  display: flex;
  padding: 2rem 0.8rem;
  align-items: flex-start;
  justify-content: center;
`;

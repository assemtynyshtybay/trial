import React from "react";
import styled from "styled-components";
import Slider from "../components/Slider/Slider";

const HomePage = () => {
  return (
    <PageContainer>
      <Slider autoPlayTime={3000}/>
    </PageContainer>
  );
};

export default HomePage;

const PageContainer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
`;

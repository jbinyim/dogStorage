import React from "react";
import styled from "styled-components";
import Slide from "../components/Slide";
import Board from "../components/Board";

const Wrapper = styled.div``;

const Home = () => {
  return (
    <Wrapper>
      <Slide />
      <Board />
    </Wrapper>
  );
};

export default Home;

import React from 'react';
import styled from 'styled-components';
import Controls from '../../components/Controls';
import Map from '../../components/Map';
import bg from './media/bg.png';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${bg});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media screen and (max-width: 992px) {
    height: auto;
  }
`;

const MainScene = () => {
  return (
    <Wrapper>
      <Controls />
      <Map containerElement={<div style={{ height: `100%`, width: '50%' }} />} mapElement={<div style={{ height: `100%` }} />} />
    </Wrapper>
  );
};

export default MainScene;

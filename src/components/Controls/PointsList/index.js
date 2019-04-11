import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const PointsList = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PointsList;

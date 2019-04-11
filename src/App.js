import React from 'react';

import { BaseCSS } from 'styled-bootstrap-grid';
import MainScene from './scenes/MainScene';

const App = () => {
  return (
    <React.Fragment>
      <BaseCSS />
      <MainScene />
    </React.Fragment>
  );
};

export default App;

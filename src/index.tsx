import React from 'react';
import ReactDOM from 'react-dom';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { Grid } from './grid/grid';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Grid />
  </React.StrictMode>,
  document.getElementById('root')
);

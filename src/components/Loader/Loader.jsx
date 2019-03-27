import React, { Fragment } from 'react';

import './Loader.scss';
import blueLoader from '../../assets/loading_blue.gif';

const Loader = () => (
  <Fragment>
    <div className="loader-container">
      <img src={blueLoader} alt="loader" />
    </div>
    <div className="overlay" />
  </Fragment>
);

export default Loader;

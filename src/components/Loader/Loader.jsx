import React, { Fragment } from 'react';

import './Loader.scss';

const Loader = () => (
  <Fragment>
    <div className="loader-container">
      <span className="a" />
      <span className="b" />
      <span className="c" />
    </div>
    <div className="overlay" />
  </Fragment>
);

export default Loader;

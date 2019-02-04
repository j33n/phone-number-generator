import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './NumberTable.scss';

class NumberTable extends PureComponent {
    static propTypes = {
      numbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    render() {
      const { numbers } = this.props;
      return (
        <div className="number-display">
          <div className="number-display--header">
            <h2>Here are all the numbers generated</h2>
          </div>
          <div className="sub-heading">
            <div className="index-header">
                        Index
            </div>
            <div className="number-header">
                        Phone Number
            </div>
          </div>
          {numbers.map((number, index) => (
            <div className={`number-display--number number-display--number__${index % 2}`} key={number}>
              <div className="index-column">
                {index}
              </div>
              <div className="number-column">
                {number}
              </div>
            </div>
          ))}
        </div>
      );
    }
}

export default NumberTable;

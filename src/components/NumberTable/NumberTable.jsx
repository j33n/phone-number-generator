import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './NumberTable.scss';

const sortBy = {
  ASC: 'ASC',
  DESC: 'DESC',
  MIN: 'MIN',
  MAX: 'MAX',
};

class NumberTable extends PureComponent {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortable: PropTypes.bool,
  }

  static defaultProps = {
    sortable: false,
  }

  state = {
    numbers: [],
    sort: '',
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('this.state.numbers', prevState.numbers === this.state.numbers);
  }

  componentDidMount = () => {
    const { numbers } = this.props;
    this.setState({ numbers });
  }

  sortNumbersBy = (type) => {
    const { numbers } = this.props;
    const asc = numbers.sort();
    switch (type) {
      case 'ASC':
        return this.setState({
          numbers: asc,
        });
      case 'DESC':
        return this.setState({
          numbers: numbers.sort().reverse(),
        });
      default:
        return this.setState({ numbers });
    }
  }

  render() {
    const { sortable, } = this.props;
    const { numbers, sort } = this.state;
    const {
      DESC, ASC, MIN, MAX
    } = sortBy;
    const toTabulize = sort ? (sort === ASC ? numbers.sort() : (sort === DESC ? numbers.sort().reverse() : numbers)) : numbers;
    return (
      <div className="number-display">
        <div className="number-display--header">
          <h2>Here are all the numbers generated</h2>
        </div>
        {sortable
          && (
            <div className="sortable">
              <div role="presentation" onClick={() => this.setState({ sort: DESC })}>Desc</div>
              <div role="presentation" onClick={() => this.setState({ sort: ASC })}>Asc</div>
              <div role="presentation" onClick={() => this.setState({ sort: MIN })}>Min</div>
              <div role="presentation" onClick={() => this.setState({ sort: MAX })}>Max</div>
            </div>
          )
        }
        <div className="sub-heading">
          <div className="index-header">
            Index
          </div>
          <div className="number-header">
            Phone Number
          </div>
        </div>
        {toTabulize.map((number, index) => (
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

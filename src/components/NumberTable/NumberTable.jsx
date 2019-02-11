import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formZeroedNumber } from '../../pages/GenerateNumbers/GenerateNumbers';
import Loader from '../Loader/Loader';

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
    showLoader: false,
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

  handleOnSort = (sort) => {
    this.setState({
      sort,
      showLoader: true,
    });
    setTimeout(() => {
      this.setState({ showLoader: false });
    }, 1000);
  }

  render() {
    const { sortable, } = this.props;
    const { numbers, sort, showLoader, } = this.state;
    const {
      DESC, ASC, MIN, MAX,
    } = sortBy;
    const toTabulize = () => {
      if (sort === ASC) {
        return numbers.sort();
      } if (sort === DESC) {
        return numbers.sort().reverse();
      } if (sort === MAX) {
        const maxNumber = Math.max(...numbers);
        return [formZeroedNumber(maxNumber, 10 - maxNumber.length)];
      } if (sort === MIN) {
        const minNumber = formZeroedNumber(Math.min(...numbers));
        return [formZeroedNumber(minNumber, 10 - minNumber.length)];
      }
      return numbers;
    };
    return (
      <div className="number-display">
        {showLoader && <Loader />}
        <div className="number-display--header">
          <h2>Here are all the numbers generated</h2>
        </div>
        {sortable
          && (
            <div className="sortable">
              <div role="presentation" onClick={() => this.handleOnSort(DESC)}>Desc</div>
              <div role="presentation" onClick={() => this.handleOnSort(ASC)}>Asc</div>
              <div role="presentation" onClick={() => this.handleOnSort(MIN)}>Min</div>
              <div role="presentation" onClick={() => this.handleOnSort(MAX)}>Max</div>
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
        {!showLoader && toTabulize().map((number, index) => (
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

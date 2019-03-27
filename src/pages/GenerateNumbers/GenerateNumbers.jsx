import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NumberTable from '../../components/NumberTable/NumberTable';
import ScrollEnd from '../../components/ScrollEnd/ScrollEnd';

import './generate.scss';

export const formZeroedNumber = (number, numberOfZeroes) => {
  let zeroes;
  let combinedZeroes = '';
  for (zeroes = 1; zeroes <= numberOfZeroes; zeroes += 1) {
    combinedZeroes = `${combinedZeroes}0`;
  }
  return combinedZeroes + number;
};

class GenerateNumbers extends PureComponent {
  static propTypes = {
    windowCrypto: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    windowCrypto: null,
  }

  constructor(props) {
    super(props);
    this.dimensionRef = React.createRef();
    this.state = {
      numbersGenerated: 0,
      height: null,
      allNumbers: [],
    };
  }

  componentDidMount = () => {
    this.setState({ height: this.dimensionRef.current && this.dimensionRef.current.clientHeight });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.dimensionRef.current && this.dimensionRef.current.clientHeight
      && prevState.height !== this.dimensionRef.current.clientHeight) {
      this.setState({
        height: this.dimensionRef.current && this.dimensionRef.current.clientHeight
      });
    }
  }

  stringifyNumber = (number, length) => {
    const strNumber = number.toString(10);
    if (strNumber.length < length) {
      return formZeroedNumber(number, length - strNumber.length);
    }
    return number.toString(10);
  }

  triggerGenerator = (length = 10000) => {
    const { windowCrypto } = this.props;
    const arrayLength = new Uint32Array(length);
    const randomNumbers = windowCrypto
    || (window.crypto && window.crypto.getRandomValues(arrayLength));

    const generatedNumber = [];
    randomNumbers.forEach((randomNumber) => {
      generatedNumber.push(this.stringifyNumber(randomNumber, 10));
    });
    console.log('generatedNumber :', generatedNumber);
    if (generatedNumber.length === length) {
      // Save numbers generated to localStorage
      const storage = localStorage.getItem('numbers');
      console.log('storage :', storage);
      if (!storage) {
        localStorage.setItem('numbers', generatedNumber);
      } else {
        const storedNumbers = storage && storage.split(',');
        try {
          localStorage.setItem('numbers', generatedNumber.concat(storedNumbers));
        } catch (e) {
          // eslint-disable-next-line no-alert
          const clearStorage = window.confirm('Local Storage is full, Please empty data');
          if (clearStorage) {
            localStorage.clear();
          }
          // fires When localstorage gets full
          // you can handle error here or empty the local storage
        }
      }
      this.setState({
        numbersGenerated: generatedNumber.length,
        allNumbers: generatedNumber,
      });
    }
  };

  render() {
    const { numbersGenerated, allNumbers, height } = this.state;
    return (
      <div className="container" ref={this.dimensionRef}>
        <ScrollEnd size={32} height={height} />
        <div className="generator-button" onClick={() => this.triggerGenerator(10000)} type="button" role="presentation">Generate Random Phone Numbers</div>
        {!!numbersGenerated && (
          <div className="alert-container">
            <span className="alert alert--success">
              {`${numbersGenerated} Random Phone Numbers were Generated`}
            </span>
          </div>
        )}
        {!!numbersGenerated && allNumbers.length === 10000 && (
          <NumberTable numbers={allNumbers} />
        )}
      </div>
    );
  }
}

export default GenerateNumbers;

import React, { PureComponent } from 'react';

import NumberTable from '../../components/NumberTable/NumberTable';
import ScrollEnd from '../../components/ScrollEnd/ScrollEnd';

import './generate.scss';

class GenerateNumbers extends PureComponent {
  constructor(props) {
    super(props);
    this.dimensionRef = React.createRef();
    this.state = {
      numbersGenerated: 0,
      height: null,
    };
  }

  componentDidMount = () => {
    this.setState({ height: this.dimensionRef.current && this.dimensionRef.current.clientHeight });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.dimensionRef.current && this.dimensionRef.current.clientHeight
      && prevState.height !== this.viewRef.current.clientHeight) {
      this.setState({
        height: this.dimensionRef.current && this.dimensionRef.current.clientHeight
      });
    }
  }

  formZeroedNumber = (number, numberOfZeroes) => {
    let zeroes;
    let combinedZeroes = '';
    for (zeroes = 1; zeroes <= numberOfZeroes; zeroes += 1) {
      combinedZeroes = `${combinedZeroes}0`;
    }
    return combinedZeroes + number;
  }

  stringifyNumber = (number, length) => {
    const strNumber = number.toString(10);
    if (strNumber.length < length) {
      return this.formZeroedNumber(number, length - strNumber.length);
    }
    return number.toString(10);
  }

  triggerGenerator = () => {
    const arrayLength = new Uint32Array(10000);
    const randomNumbers = window.crypto.getRandomValues(arrayLength);

    const generatedNumber = [];
    randomNumbers.forEach((randomNumber) => {
      generatedNumber.push(this.stringifyNumber(randomNumber, 10));
    });
    if (generatedNumber.length === 10000) {
      // Save numbers generated to localStorage
      localStorage.setItem('numbers', generatedNumber);
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
        <div className="generator-button" onClick={this.triggerGenerator} type="button" role="presentation">Generate Random Phone Numbers</div>
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

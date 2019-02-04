import React, { PureComponent } from 'react';

import NumberTable from '../../components/NumberTable/NumberTable';

import './generate.scss';
import ScrollEnd from '../../components/ScrollEnd/ScrollEnd';

class GenerateNumbers extends PureComponent {
  state = {
    numbersGenerated: 0,
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
    const { numbersGenerated, allNumbers } = this.state;
    return (
      <div className="container">
        <ScrollEnd size={32} />
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

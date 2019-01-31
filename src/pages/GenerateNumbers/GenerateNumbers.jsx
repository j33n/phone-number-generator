import React, { PureComponent } from 'react';

import './generate.scss';

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
      this.setState({
        numbersGenerated: randomNumbers.length,
      });

      const generatedNumber = [];
      randomNumbers.forEach((randomNumber) => {
        generatedNumber.push(this.stringifyNumber(randomNumber, 10));
      });
    };

    render() {
      const { numbersGenerated } = this.state;
      return (
        <div className="container">
          <div className="generator-button" onClick={this.triggerGenerator} type="button" role="presentation">Generate Random Phone Numbers</div>
          {!!numbersGenerated && (
          <span className="alert alert--success">
            {`${numbersGenerated} Random Phone Numbers were Generated`}
          </span>
          )}
        </div>
      );
    }
}

export default GenerateNumbers;

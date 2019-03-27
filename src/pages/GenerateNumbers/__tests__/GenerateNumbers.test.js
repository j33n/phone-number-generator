import React from 'react';

import { shallow } from 'enzyme';

import GenerateNumbers, { formZeroedNumber } from '../GenerateNumbers';

describe('GenerateNumbers', () => {
  const component = <GenerateNumbers />;

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should form zeroed numbers', () => {
    expect(formZeroedNumber('123', '3')).toEqual('000123');
  });

  describe('should generate numbers', () => {
    it('should call function to generate numbers', () => {
      const mockedCrypto = [1, 2, 3];
      const tree = shallow(<GenerateNumbers windowCrypto={mockedCrypto} />);
      tree.instance().triggerGenerator = jest.fn();
      tree.find('.generator-button').simulate('click');
      expect(tree.instance().triggerGenerator).toHaveBeenCalled();
    });
  });

  it('should stringify numbers to add zeroes', () => {
    const subject = shallow(component);
    const number = '12345';
    const length = '7';
    const stringifyResult = subject.instance().stringifyNumber(number, length);
    expect(stringifyResult).toBe('0012345');
  });

  it('should return the number if stringify is not needed', () => {
    const subject = shallow(component);
    const number = '12345';
    const length = '5';
    const stringifyResult = subject.instance().stringifyNumber(number, length);
    expect(stringifyResult).toBe('12345');
  });

  it('should be able to generate numbers', () => {
    const mockedCrypto = [1, 2, 3];
    const subject = shallow(<GenerateNumbers windowCrypto={mockedCrypto} />);
    subject.instance().triggerGenerator(3);
    expect(subject.state('numbersGenerated')).toBe(3);
    expect(subject.state('allNumbers')).toEqual(['0000000001', '0000000002', '0000000003']);
  });
});

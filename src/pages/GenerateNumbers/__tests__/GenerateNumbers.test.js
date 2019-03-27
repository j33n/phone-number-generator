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
});

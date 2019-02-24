import React from 'react';
import {
  shallow
} from 'enzyme';
import renderer from 'react-test-renderer';

import GenerateNumbers, {
  formZeroedNumber
} from './GenerateNumbers';

describe('GenerateNumbers', () => {
  const component = <GenerateNumbers />;

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should form zeroed numbers', () => {
    expect(formZeroedNumber('123', '3')).toEqual('000123');
  });

  //   it('should update height based on clientHeight', () => {
  //     const shallowComponent = shallow(component);

//     shallowComponent.setState({
//       height: 0
//     });
//     // shallowComponent.instance().dimensionRef = {
//     //   current: {
//     //     clientHeight: 10,
//     //   }
//     // };
//     expect(tree.state('height')).toEqual(10);
//   });
});

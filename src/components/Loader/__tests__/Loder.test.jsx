import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../Loader';

describe('Loader', () => {
  const component = <Loader />;
  const tree = shallow(component);
  it('renders', () => {
    expect(component).toMatchSnapshot();
  });

  it('should be englobed in a container div', () => {
    expect(tree.find('div.loader-container')).toHaveLength(1);
  });
});

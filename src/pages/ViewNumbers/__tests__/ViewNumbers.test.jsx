import React from 'react';

import { shallow } from 'enzyme';

import ViewNumbers from '../ViewNumbers';
import NumberTable from '../../../components/NumberTable/NumberTable';

describe('GenerateNumbers', () => {
  const component = <ViewNumbers />;

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should give you an oops message when no numbers', () => {
    const subject = shallow(component);
    expect(subject.find('h3').text()).toEqual('Oops no numbers generated yet 🤭');
  });

  it('should render a table', () => {
    const subject = shallow(component);
    subject.setState({ storedNumbers: ['1'] });
    expect(subject.find(NumberTable)).toHaveLength(1);
  });
});

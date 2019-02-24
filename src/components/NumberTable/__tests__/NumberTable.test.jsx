import React from 'react';
import { shallow } from 'enzyme';

import NumberTable from '../NumberTable';

describe('NumberTable', () => {
  const numbers = ['1', '2', '3'];
  const component = <NumberTable numbers={numbers} sortable />;
  const tree = shallow(component);

  jest.useFakeTimers();

  it('renders', () => {
    expect(component).toMatchSnapshot();
  });

  it('should sort by `DESC`', () => {
    tree.find('#desc').simulate('click');
    expect(tree.state('sort')).toEqual('DESC');
    expect(tree.state('showLoader')).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect(tree.state('showLoader')).toBeFalsy();
    expect(tree.instance().toTabulize()).toEqual(['3', '2', '1']);
  });

  it('should sort by `ASC`', () => {
    tree.find('#asc').simulate('click');
    expect(tree.state('sort')).toEqual('ASC');
    expect(tree.state('showLoader')).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect(tree.state('showLoader')).toBeFalsy();
    expect(tree.instance().toTabulize()).toEqual(['1', '2', '3']);
  });

  it('should sort by `MIN`', () => {
    tree.find('#min').simulate('click');
    expect(tree.state('sort')).toEqual('MIN');
    expect(tree.state('showLoader')).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect(tree.state('showLoader')).toBeFalsy();
    expect(tree.instance().toTabulize()).toEqual(['0000000001']);
  });

  it('should sort by `MAX`', () => {
    tree.find('#max').simulate('click');
    expect(tree.state('sort')).toEqual('MAX');
    expect(tree.state('showLoader')).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect(tree.state('showLoader')).toBeFalsy();
    expect(tree.instance().toTabulize()).toEqual(['3']);
  });
});

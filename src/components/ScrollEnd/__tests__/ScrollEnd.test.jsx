import React from 'react';
import { shallow } from 'enzyme';

import ScrollEnd from '../ScrollEnd';

describe('NumberTable', () => {
  const component = <ScrollEnd size={12} height={12} />;

  jest.useFakeTimers();

  it('renders', () => {
    expect(component).toMatchSnapshot();
  });

  it('should auto set scrollY to 0 by default', () => {
    window.addEventListener = jest.fn();
    window.scrollY = 0;
    const subject = shallow(component);
    expect(window.addEventListener).toHaveBeenCalled();
    expect(subject.state('scrollY')).toEqual(0);
  });

  it('should auto set scrollY', () => {
    window.addEventListener = jest.fn();
    window.scrollY = 100;
    const subject = shallow(component);
    expect(window.addEventListener).toHaveBeenCalled();
    expect(subject.state('scrollY')).toEqual(100);
  });

  it('should identify vertical scroll', () => {
    window.scrollY = 100;
    const subject = shallow(component);
    expect(subject.state('scrollY')).toEqual(100);
    expect(subject.state('topBottomScroll')).toBeTruthy();
    expect(subject.state('bottomTopScroll')).toBeFalsy();
  });

  it('should identify horizontal scroll', () => {
    window.scrollY = -100;
    const subject = shallow(component);
    expect(subject.state('scrollY')).toEqual(-100);
    expect(subject.state('topBottomScroll')).toBeFalsy();
    expect(subject.state('bottomTopScroll')).toBeTruthy();
  });

  it('should afford scrolling to the far bottom', () => {
    window.scrollY = 100;
    window.scrollTo = jest.fn();
    const subject = shallow(component);
    subject.find('.scroll').simulate('click');
    expect(window.scrollTo).toBeCalledWith(expect.any(Number), expect.any(Number));
  });

  it('should afford scrolling to the far top', () => {
    window.scrollY = -100;
    window.scrollTo = jest.fn();
    const subject = shallow(component);
    subject.find('.scroll').simulate('click');
    expect(window.scrollTo).toBeCalledWith(expect.any(Number), expect.any(Number));
  });

  it('should default to 0, 0', () => {
    window.scrollY = 0;
    window.scrollTo = jest.fn();
    const subject = shallow(component);
    subject.instance().scrollToEnd();
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });
});

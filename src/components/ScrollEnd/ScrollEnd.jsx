import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import arrow from '../../assets/arrow.svg';

import './ScrollEnd.scss';

class ScrollEnd extends PureComponent {
    static propTypes = {
      size: PropTypes.number,
      height: PropTypes.number,
    }

    static defaultProps = {
      size: 32,
      height: 0,
    }

    state = {
      scrollY: 0,
      topBottomScroll: false,
      bottomTopScroll: false
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate = (prevProps, prevState) => {
      const { scrollY } = this.state;
      if (prevState.scrollY !== scrollY && scrollY > prevState.scrollY && scrollY !== 0) {
        this.setState({
          topBottomScroll: true,
          bottomTopScroll: false
        });
      }

      if (prevState.scrollY !== scrollY && scrollY < prevState.scrollY && scrollY !== 0) {
        this.setState({
          topBottomScroll: false,
          bottomTopScroll: true
        });
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }


    scrollToEnd = () => {
      const { bottomTopScroll, topBottomScroll } = this.state;
      const { height } = this.props;

      if (topBottomScroll) {
        window.scrollTo(0, height);
      } else if (bottomTopScroll) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }

    handleScroll = () => {
      const { scrollY } = window;
      if (scrollY === 0) {
        return this.setState({
          scrollY: 0,
          topBottomScroll: false,
          bottomTopScroll: false,
        });
      }
      return this.setState({ scrollY });
    }

    render() {
      const { size } = this.props;
      const { bottomTopScroll, topBottomScroll } = this.state;
      const imageStyle = {
        width: size,
      };
      return (
        (bottomTopScroll || topBottomScroll)
            && (
            <div className="scroll" onClick={this.scrollToEnd} role="presentation">
              <img src={arrow} alt="arrow" style={imageStyle} className={`arrow-button ${bottomTopScroll && 'scroll-up'} ${topBottomScroll && 'scroll-down'}`} />
            </div>
            )
      );
    }
}

export default ScrollEnd;

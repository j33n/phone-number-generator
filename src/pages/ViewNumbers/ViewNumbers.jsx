import React, { Component } from 'react';

import NumberTable from '../../components/NumberTable/NumberTable';
import ScrollEnd from '../../components/ScrollEnd/ScrollEnd';

import './ViewNumbers.scss';

class ViewNumbers extends Component {
  constructor(props) {
    super(props);
    this.viewRef = React.createRef();
    this.state = {
      storedNumbers: [],
      height: null,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.viewRef.current && this.viewRef.current.clientHeight
      && prevState.height !== this.viewRef.current.clientHeight) {
      this.setState({
        height: this.viewRef.current && this.viewRef.current.clientHeight
      });
    }
  }

  componentDidMount = () => {
    const storage = localStorage.getItem('numbers');
    const storedNumbers = storage && storage.split(',');
    if (storage) {
      this.setState({
        height: this.viewRef.current && this.viewRef.current.clientHeight,
        storedNumbers,
      });
    }
  }

  render() {
    const { storedNumbers, height } = this.state;
    if (!storedNumbers || storedNumbers.length === 0) {
      return (
        <div className="error">
          <h3>
            Oops no numbers generated yet
            {' '}
            <span role="img" aria-label="oops">🤭</span>
          </h3>
        </div>
      );
    }
    return (
      <div className="view-container" ref={this.viewRef}>
        <div className="numbers-text">{`We have generated ${storedNumbers.length} numbers in total`}</div>
        <ScrollEnd size={32} height={height} />
        <NumberTable numbers={storedNumbers} sortable />
      </div>
    );
  }
}

export default ViewNumbers;

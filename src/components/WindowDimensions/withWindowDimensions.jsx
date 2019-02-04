import React, { Component } from 'react';


function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withWindowDimensions(WrappedComponent) {
  class WithWindowDimensions extends Component {
        state = { width: 0, height: 0 };

        componentDidMount() {
          this.updateWindowDimensions();
          window.addEventListener('resize', this.updateWindowDimensions);
        }

        componentWillUnmount() {
          window.removeEventListener('resize', this.updateWindowDimensions);
        }

          updateWindowDimensions = () => {
            console.log('window.pageYOffset', window.pageYOffset);
            this.setState({ width: window.innerWidth, height: window.innerHeight });
          }

          render() {
            const { width, height } = this.state;
            return (
              <WrappedComponent
                {...this.props}
                windowWidth={width}
                windowHeight={height}
                isMobileSized={width < 700}
              />
            );
          }
  }

  WithWindowDimensions.displayName = `WithWindowDimensions(${getDisplayName(WrappedComponent)})`;

  return WithWindowDimensions;
}

export default withWindowDimensions;

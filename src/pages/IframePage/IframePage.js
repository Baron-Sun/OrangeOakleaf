import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import {WebcamStreamCapture} from '../../components/WebcamStreamCapture.js';

class IframePage extends Component {
  state = {
    isLoading: true,
    scale: 1
  };

  componentDidMount() {

    this.scaleResize()
    this.iframeEl.onload = () => {
      this.setState({
        isLoading: false,
      });
    };

  }

  //适配

  scaleResize = () => {
    let scale = 1;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    if (screenWidth > 1024) {
      scale = 1
    } else if (1024 * 0.8 >= screenWidth <= 1024) {
      scale = 0.8
    } else {
      scale = Math.floor(screenWidth / 1024 * 10) / 10
    }
    this.setState({
      scale,
    });
  };


  render() {
    const { isLoading, scale } = this.state;
    // 打平之后的菜单
    const query = this.props.location.query || {};
    const { authUser } = this.props

    return (
      <div>
        <div style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        }>
          <WebcamStreamCapture/>
        </div>
        <div
          className="iframe-container"
          style={{
            paddingLeft: 10,
            width: 1024,
            height: 798,
            WebkitOverflowScrolling: 'touch',
            // overflow-y: scroll;
            // pointerEvents: 'none'
          }}
        >
          {isLoading ? (
            <div
              style={{
                position: 'absolute',
                zIndex: 1000,
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgb(245, 247, 250)',
              }}
            >
              <Spin />
            </div>
          ) : null}
          <iframe
            title="外链"
            ref={el => (this.iframeEl = el)}
            allowtransparency="no"
            src={`${query.url}?user=${authUser}`}
            frameBorder="0"
            width={'100%'}
            height={'100%'}
            scrolling="yes"
            style={{ transform: `scale(${scale})` }}
          // sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    );
  }
}

export default connect(({ authUser }) => ({ authUser }))(IframePage);
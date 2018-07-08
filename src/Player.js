import React, { Component } from 'react';

class Player extends Component {
    start() {
        this.props.audio.start();
    }

    stop() {
        this.props.audio.stop();
    }

    render() {
        // When react aclls onClick, _this_ context isn't correct.  Fat arrow _thus_ context is correct.
        return (
            <div>
                <button onClick={() => this.start()}>Start</button>
                <button onClick={() => this.stop()}>Stop</button>
            </div>
        );
    }
}

export default Player;

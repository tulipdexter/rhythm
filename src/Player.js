import React, { Component } from 'react';

class Player extends Component {
    start = () => {
        this.props.audio.start();
    }

    loop = () => {
        this.props.audio.loop();
    }

    stop = () => {
        this.props.audio.stop();
    }

    render() {
        return (
            <div>
                <button onClick={this.start}>Start</button>
                <button onClick={this.loop}>Loop</button>
                <button onClick={this.stop}>Stop</button>
            </div>
        );
    }
}

export default Player;

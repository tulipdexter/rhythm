import React, {Component} from 'react';
import {samples, sampleTypes} from "./audio/samples";

class SheetMusic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentBar: undefined
        };

        props.audio.addEventListener(({bar}) => {
            this.setState({currentBar: bar});
        });
    }

    _getRow(drumName, barIdx, matrix, audio) {
        if (sampleTypes[drumName] === undefined) {
            throw new Error(`Unknown instrument ${drumName}`);
        }

        const drumIdx = sampleTypes[drumName];

        // noinspection CheckTagEmptyBody
        return matrix[drumIdx].slice(barIdx * audio.beatsPerBar, barIdx * audio.beatsPerBar + audio.beatsPerBar)
            .map((note, noteIdx) =>
                <span
                    key={noteIdx}
                    className={`beat beat--${samples[drumIdx].type}`}
                    style={{
                        left: `${(100 / audio.beatsPerBar) * noteIdx}%`
                    }}
                ></span>
            );
    }

    _getBar(barIdx) {
        const audio = this.props.audio;
        const matrix = audio.matrix;
        const animationDuration = (60.0 / audio.bpm) * audio.beatsPerBar;

        const shouldShow = this.state.currentBar === barIdx;

        // noinspection CheckTagEmptyBody
        return (
            <div className="bar" key={barIdx}>
                {shouldShow && <div className="bar-cursor" style={{animationDuration: `${animationDuration}s`}}></div>}
                <div className="row">{this._getRow('hi-hat', barIdx, matrix, audio)}</div>
                <div className="row row--line"></div>
                <div className="row"></div>
                <div className="row row--line"></div>
                <div className="row">{this._getRow('snare', barIdx, matrix, audio)}</div>
                <div className="row row--line"></div>
                <div className="row"></div>
                <div className="row row--line"></div>
                <div className="row">{this._getRow('kick', barIdx, matrix, audio)}</div>
                <div className="row row--line"></div>

            </div>
        );
    }

    render() {
        const bars = [];
        const audio = this.props.audio;

        for (let i = 0; i < audio.bars; i++) {
            bars.push(this._getBar(i));
        }
        return (
            <div className="sheet-music">
                {bars}
            </div>
        );
    }
}

export default SheetMusic;

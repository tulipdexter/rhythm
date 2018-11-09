import React, {Component} from 'react';
import {samples} from "./audio/samples";

class SheetMusic extends Component {
    getBar(barIndex) {
        const audio = this.props.audio;
        const matrix = audio.matrix;
        // const beats = [];
        //
        // for (let i = 0; i < audio.beatsPerBar; i++) {
        //     const notes = [];
        //     for (let sampleIndex = 0; sampleIndex < audio.numberOfInstruments; sampleIndex++) {
        //         if (matrix[sampleIndex][(barIndex * this.props.audio.beatsPerBar) + i] === true) {
        //             notes.push(samples[sampleIndex].type);
        //         }
        //     }
        //     beats.push(notes);
        // }
        //
        // const classes = beats.map(note => note.length > 0 ? note.join(' ') : 'half-note-spacer');

        // noinspection CheckTagEmptyBody
        return (
            <div className="bar" key={barIndex}>
                {matrix.map((instrument, instrumentIdx) =>
                    <div className="row" key={instrumentIdx}>
                        {instrument.slice(barIndex * audio.beatsPerBar, barIndex * audio.beatsPerBar + audio.beatsPerBar)
                            .map((note, noteIdx) =>
                                <span
                                    key={noteIdx}
                                    className={`beat beat--${samples[instrumentIdx].type}`}
                                    style={{
                                        left: `${(100 / audio.beatsPerBar) * noteIdx}%`
                                    }}
                                ></span>
                            )}
                    </div>
                )}
            </div>

            // <div className="bar" key={barIndex}>
            //     {/*<div className="stave-header"></div>*/}
            //     {beats.map(((noteClasses, idx) =>
            //         <div key={idx} className={'bar__span bar__span--quarter'}>
            //
            //             <span className={`note note--quarter note--${noteClasses}`}></span>
            //         </div>
            //     ))}
            //     {/*<div className="bar-line"></div>*/}
            // </div>
        );
    }

    render() {
        const bars = [];
        const audio = this.props.audio;

        for (let i = 0; i < audio.bars; i++) {
            bars.push(this.getBar(i));
        }
        return (
            <div className="sheet-music">
                {bars}
            </div>
        );
    }
}

export default SheetMusic;

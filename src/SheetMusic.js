import React, { Component } from 'react';

const sampleIndexToNote = {
    0: 'g5',
    1: 'e5',
    2: 'a5'
};

class SheetMusic extends Component {
    getBar(barIndex) {
        const audio = this.props.audio;
        const matrix = audio.matrix;
        const notes = [];
        for (let i = 0; i < audio.beatsPerBar; i++) {
            const note = [];
            for (let sampleIndex = 0; sampleIndex < audio.numberOfInstruments; sampleIndex++) {
                if (matrix[sampleIndex][(barIndex * this.props.audio.beatsPerBar) + i] === true) {
                    note.push(sampleIndexToNote[sampleIndex]);
                }
            }
            notes.push(note);
        }

        const classes = notes.map(note => note.length > 0 ? note.join(' ') : 'half-note-spacer');

        return (
            <div className="bar" key={barIndex}>
                <div className="stave-header"></div>
                {classes.map(((noteClasses, idx) => <div key={idx} className={`quarter-note ${noteClasses}`}></div>))}
                <div className="bar-line"></div>
            </div>
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

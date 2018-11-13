import React, {Component} from 'react';
import Player from './Player';
import AudioManager from './audio';
import SheetMusic from './SheetMusic';
import { HI_HAT, KICK, SNARE } from './audio/samples';
import './App.css';

// TODO: Transition constant arrangement to editable state.
const arrangement = [
    {
        instrument: HI_HAT,
        positions: [0, 1, 2, 3],
    },
    {
        instrument: KICK,
        positions: [0],
    },
    {
        instrument: SNARE,
        positions: [2],
    },
];

class App extends Component {
    constructor(p, c) {
        super(p, c);

        this.state = {
            loaded: false
        };

        this.audio = new AudioManager();
        this.audio.load().then(() => {
            for (let i=0; i < this.audio.bars; i++) {
                // TODO: define length.  E.g. quarter, eighth, sixteenth.  How to do triplets?
                const beatsElapsed = i * this.audio.beatsPerBar;
                arrangement.forEach(({ instrument, positions }) => {
                    positions.forEach(position => {
                        this.audio.addNote(instrument, beatsElapsed + position);
                    });
                });
            }

            this.setState({
                loaded: true
            });
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <main>
                    <Player audio={this.audio}/>
                    <SheetMusic audio={this.audio}/>
                </main>
            )
        }

        return <h1>Drum roll please...<span role="img" aria-label="Drum emoji">🥁</span></h1>;
    }
}

export default App;

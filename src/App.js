import React, {Component} from 'react';
import Player from './Player';
import AudioManager from './audio';
import SheetMusic from './SheetMusic';
import './App.css';

class App extends Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            loaded: false
        };
        this.audio = new AudioManager();
        this.audio.load().then(() => {
            this.audio.addNote('hi-hat', 0);
            this.audio.addNote('hi-hat', 1);
            this.audio.addNote('hi-hat', 2);
            this.audio.addNote('hi-hat', 3);

            this.audio.addNote('snare', 4);
            this.audio.addNote('snare', 6);
            this.audio.addNote('kick', 8);
            this.audio.addNote('kick', 10);

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

        return <h1>LOADING! WAIT.</h1>;
    }
}

export default App;

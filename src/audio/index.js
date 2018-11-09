import audioContext from './audioContext';
import {samples, sampleTypes} from "./samples";

const bars = 1;
const beatsPerBar = 4;
const numberOfSamples = bars * beatsPerBar;
const bpm = 120;

// NOTE: Fixed bpm (not configurable) - matrix will have to update if changed

class AudioManager {
    constructor() {
        this.bars = bars;
        this.beatsPerBar = beatsPerBar;
        this.numberOfInstruments = samples.length;
    }

    load() {
        const promises = samples.map(sample =>
            fetch(sample.path)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.arrayBuffer();
                })
                .then(buffer =>
                    audioContext.decodeAudioData(buffer)
                )
        );

        return Promise.all(promises).then(decodedBuffers => {
            this.sounds = decodedBuffers;
            
            this.matrix = [];
            for (let i = 0; i < samples.length; i++)  {
                this.matrix.push(new Array(numberOfSamples));
            }
        });
    }

    addNote(sampleType, samplePosition) {
        const sampleIndex = sampleTypes[sampleType];
        this.matrix[sampleIndex][samplePosition] = true;
    }

    removeNote(sampleType, samplePosition) {
        const index = sampleTypes[sampleType];
        this.matrix[index][samplePosition] = false;
    }

    loop() {
        this.start(true);
    }

    start(loop = false) {
        if (this.interval) return;

        let currentStep = 0;
        let nextNoteTime = audioContext.currentTime;

        this.interval = setInterval(() => {
            while (nextNoteTime < audioContext.currentTime + 0.1) {
                for (let i = 0; i < this.matrix.length; i++) {
                    if (this.matrix[i][currentStep] === true) {
                        const sourceNode = audioContext.createBufferSource();
                        sourceNode.buffer = this.sounds[i];
                        sourceNode.connect(audioContext.destination);
                        sourceNode.start(nextNoteTime);
                    }
                }

                nextNoteTime += 60.0 / bpm;
                currentStep = (currentStep + 1) % numberOfSamples;

                if (!loop && currentStep === 0) {
                    clearInterval(this.interval);
                    this.interval = false;
                }
            }
        }, 0);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = false;
    }
}

export default AudioManager;
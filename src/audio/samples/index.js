import hihat from './hi-hat.wav';
import kick from './kick.wav';
import snare from './snare.wav';

export const samples = [
    {
        type: 'hi-hat',
        path: hihat
    },
    {
        type: 'kick',
        path: kick
    },
    {
        type: 'snare',
        path: snare
    }
];

export const sampleTypes = samples.reduce((accumulator, current, index) => {
    accumulator[current.type] = index;
    return accumulator;
}, {});
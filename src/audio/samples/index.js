import hihat from './hi-hat.wav';
import kick from './kick.wav';
import snare from './snare.wav';

export const HI_HAT = 'hi-hat';
export const KICK = 'kick';
export const SNARE = 'snare';

export const samples = [
    {
        type: HI_HAT,
        path: hihat
    },
    {
        type: KICK,
        path: kick
    },
    {
        type: SNARE,
        path: snare
    }
];

export const sampleTypes = samples.reduce((accumulator, current, index) => {
    accumulator[current.type] = index;
    return accumulator;
}, {});
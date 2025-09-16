/* eslint-disable @typescript-eslint/no-explicit-any */

// Fisher-Yates (aka Knuth) Shuffle.
export function FisherYatesShuffle(array: any[]) {
    const arrayDeepCopy = JSON.parse(JSON.stringify(array));
    let currentIndex = arrayDeepCopy.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrayDeepCopy[currentIndex], arrayDeepCopy[randomIndex]] = [
            arrayDeepCopy[randomIndex],
            arrayDeepCopy[currentIndex],
        ];
    }

    return arrayDeepCopy;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function DurstenfeldShuffle(array: any[]) {
    const arrayDeepCopy = JSON.parse(JSON.stringify(array));

    for (let i = arrayDeepCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayDeepCopy[i], arrayDeepCopy[j]] = [arrayDeepCopy[j], arrayDeepCopy[i]];
    }

    return arrayDeepCopy;
}

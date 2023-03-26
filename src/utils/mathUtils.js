export const DEGREES_PER_RADIAN = 0.0174533;

export function distBetween(pos1, pos2) {
    return (pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) + (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]);
}

export function rotate90(diff, clockwise) {
    return clockwise ? [diff[1], -diff[0]] : [-diff[1], diff[0]];
}

export function scaleVector(vec, amt) {
    for (let i = 0; i < vec.length; i++) {
        vec[i] *= amt;
    }
    return vec;
}

export function formatNumber(posNumber) {
    return posNumber > 0 ? (" + " + posNumber) : (" - " + Math.abs(posNumber));
}

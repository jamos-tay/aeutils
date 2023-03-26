import * as mathUtils from './mathUtils'

describe('scaleVector', () => {
    it('should scale a vector with a positive amount', () => {
        const vec = [1, 2, 3];
        const scaledVec = mathUtils.scaleVector(vec, 2);
        expect(scaledVec).toEqual([2, 4, 6]);
    });

    it('should scale a vector with a negative amount', () => {
        const vec = [1, 2, 3];
        const scaledVec = mathUtils.scaleVector(vec, -2);
        expect(scaledVec).toEqual([-2, -4, -6]);
    });

    it('should scale a vector with a zero amount', () => {
        const vec = [1, 2, 3];
        const scaledVec = mathUtils.scaleVector(vec, 0);
        expect(scaledVec).toEqual([0, 0, 0]);
    });

    it('should return the same vector when scaling by 1', () => {
        const vec = [1, 2, 3];
        const scaledVec = mathUtils.scaleVector(vec, 1);
        expect(scaledVec).toBe(vec);
    });
});

describe('distBetween', () => {
    it('should calculate the distance between two points', () => {
        const pos1 = [0, 0];
        const pos2 = [3, 4];
        expect(mathUtils.distBetween(pos1, pos2)).toEqual(25);
    });

    it('should return 0 when given two identical points', () => {
        const pos1 = [1, 2];
        const pos2 = [1, 2];
        expect(mathUtils.distBetween(pos1, pos2)).toEqual(0);
    });

    it('should handle negative coordinates', () => {
        const pos1 = [1, -2];
        const pos2 = [-3, 4];
        expect(mathUtils.distBetween(pos1, pos2)).toEqual(52);
    });

    it('should handle non-integer coordinates', () => {
        const pos1 = [1.5, 2.5];
        const pos2 = [4.5, 6.5];
        expect(mathUtils.distBetween(pos1, pos2)).toEqual(25);
    });
});

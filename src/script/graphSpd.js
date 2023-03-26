import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function graphSpd() {
    const selectedProperties = compUtils.filterAnimatableProperties(compUtils.getAllSelectedProperties());
    if (selectedProperties.length == 0) {
        return;
    }

    const speedPercent = parseFloat(variableUtils.getVariable("speedPercent"));
    if (isNaN(speedPercent)) {
        return;
    }

    for (let j = 0; j < selectedProperties.length; j++) {
        let totalDist = 0;
        for (let i = 1; i < selectedProperties[j].numKeys; i++) {
            const currPoint = selectedProperties[j].keyValue(i);
            const nextPoint = selectedProperties[j].keyValue(i + 1);
            totalDist += Math.sqrt((currPoint[0] - nextPoint[0]) * (currPoint[0] - nextPoint[0]) + (currPoint[1] - nextPoint[1]) * (currPoint[1] - nextPoint[1]));
        }
        const avgSpeed = totalDist / (selectedProperties[j].keyTime(selectedProperties[j].numKeys) - selectedProperties[j].keyTime(1));
        const speed = avgSpeed * speedPercent / 100;

        const easeIn = new KeyframeEase(speed, 33.333);
        const easeOut = new KeyframeEase(speed, 33.333);
        for (let i = 0; i < selectedProperties[j].numKeys; i++) {
            selectedProperties[j].setTemporalEaseAtKey(i + 1, [easeIn], [easeOut]);
        }
    }
}


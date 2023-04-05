import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'
import * as variableUtils from '../utils/variableUtils'
import round from './round';
import graphSpd from './graphSpd';

export default function moveDirection() {
    move();
    round();
    graphSpd();
}

function move() {
    const property = compUtils.findPropertyWithName(compUtils.getAllSelectedProperties(), 'Position');
    if (property == null) {
        alert('Select one Position property');
        return;
    }
    
    const loopTime = parseFloat(variableUtils.getVariable("loopLength"));
    if (isNaN(loopTime)) {
        alert('Invalid loop length');
        return;
    }

    const valueStr = prompt("Distance and direction? e.g. 100,3", "");
    if (!valueStr) {
        return;
    }
    const values = valueStr.split(",");
    if (values.length != 2) {
        return;
    }
    const distance = parseFloat(values[0]);
    const direction = parseFloat(values[1]);
    if (isNaN(distance) || isNaN(direction)) {
        return;
    }

    const interval = loopTime / 2;
    variableUtils.setInternalVariable("lastDir", direction);
    while (property.numKeys > 0) {
        property.removeKey(1);
    }

    let currPos = property.value;
    property.setValueAtTime(0, currPos);

    currPos[0] += distance * Math.sin(mathUtils.DEGREES_PER_RADIAN * direction * 30);
    currPos[1] -= distance * Math.cos(mathUtils.DEGREES_PER_RADIAN * direction * 30);
    property.setValueAtTime(interval, currPos);
    property.setValueAtTime(loopTime, property.keyValue(1));

    const easeIn = new KeyframeEase(0, 33.333);
    const easeOut = new KeyframeEase(0, 33.333);
    for (let i = 1; i <= property.numKeys; i++) {
        property.setTemporalEaseAtKey(i, [easeIn], [easeOut]);
        property.setSpatialAutoBezierAtKey(i, true);
    }
    if (property.expression == '') {
        property.expression = 'loopOut(); // ' + valueStr;
    }
}


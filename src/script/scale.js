import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'

export default function scale() {
    const selectedProperties = compUtils.getAllSelectedProperties();
    if (selectedProperties.length == 0) {
        return;
    }

    const scaleValue = parseFloat(prompt("Scale how much?", ""));
    if (isNaN(scaleValue)) {
        return;
    }

    for (let i = 0; i < selectedProperties.length; i++) {
        if (!selectedProperties[i].numKeys || selectedProperties[i].numKeys == 0) {
            continue;
        }

        if (selectedProperties[i].numKeys == 1) {
            let value = selectedProperties[i].keyValue(1);
            if (value.toString().indexOf(",") != -1) {
                value = mathUtils.scaleVector(value, scaleValue);
            } else {
                value *= scaleValue;
            }
            selectedProperties[i].setValueAtKey(1, value);
            continue;
        }

        const values = [];
        const isArray = selectedProperties[i].keyValue(1).toString().indexOf(",") != -1
        for (let j = 1; j <= selectedProperties[i].numKeys; j++) {
            const value = selectedProperties[i].keyValue(j);
            values.push(isArray ? value : [value]);
        }

        const avg = [];
        let count = 0;
        for (let k = 0; k < values[0].length; k++) {
            avg[k] = 0;
        }
        for (let j = 0; j < values.length; j++) {
            if (j == values.length - 1 && arrayEqual(values[j], values[0])) {
                continue;
            }
            for (let k = 0; k < values[0].length; k++) {
                avg[k] += values[j][k]
            }
            count++;
        }
        for (let k = 0; k < values[0].length; k++) {
            avg[k] /= count;
        }

        for (let j = 1; j <= selectedProperties[i].numKeys; j++) {
            const value = values[j - 1];
            for (let k = 0; k < value.length; k++) {
                value[k] = avg[k] + (value[k] - avg[k]) * scaleValue;
            }
            selectedProperties[i].setValueAtKey(j, isArray ? value : value[0]);
        }
    }
}

function arrayEqual(a1, a2) {
    if (a1.length != a2.length) {
        return false;
    }
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}


import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'
import * as variableUtils from '../utils/variableUtils'
import graphSpd from './graphSpd';

export default function round() {
    roundFn();
    graphSpd();
}

function roundFn() {
    const selectedProperties = compUtils.filterAnimatableProperties(compUtils.getAllSelectedProperties());
    if (selectedProperties.length == 0) {
        return;
    }

    let percentage = parseFloat(variableUtils.getVariable("roundPercent"));
    if (isNaN(percentage)) {
        return;
    }
    percentage /= 100;

    const flipHandles = variableUtils.getVariable("flipHandles");
    const lastDir = variableUtils.getVariable("lastDir");
    if (lastDir && (lastDir > 6)) {
        percentage = -percentage;
    }
    if (flipHandles) {
        percentage = -percentage;
    }

    for (let i = 0; i < selectedProperties.length; i++) {
        if (selectedProperties[i].numKeys != 3) {
            continue;
        }

        for (let j = 1; j <= selectedProperties[i].numKeys; j++) {
            const currPoint = selectedProperties[i].keyValue(j);
            let inTangent = [0, 0];
            let outTangent = [0, 0];
            if (j > 1) {
                const prevPoint = selectedProperties[i].keyValue(j - 1);
                let diffVector = [prevPoint[0] - currPoint[0], prevPoint[1] - currPoint[1]];
                diffVector = mathUtils.rotate90(diffVector, false);
                diffVector = mathUtils.scaleVector(diffVector, percentage);
                inTangent = diffVector;
            }
            if (j < selectedProperties[i].numKeys) {
                const nextPoint = selectedProperties[i].keyValue(j + 1);
                let diffVector = [nextPoint[0] - currPoint[0], nextPoint[1] - currPoint[1]];
                diffVector = mathUtils.rotate90(diffVector, true);
                diffVector = mathUtils.scaleVector(diffVector, percentage);
                outTangent = diffVector;
            }
            if (selectedProperties[i].propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
                inTangent.push(0);
                outTangent.push(0);
            }
            selectedProperties[i].setSpatialTangentsAtKey(j, inTangent, outTangent);
        }
    }
}


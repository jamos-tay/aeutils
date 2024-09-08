import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function shiftLoop() {
    const props = []
    const selectedProperties = compUtils.getAllSelectedProperties();
    for (let j = 0; j < selectedProperties.length; j++){
        if (selectedProperties[j].canSetExpression && selectedProperties[j].numKeys >= 1) {
            props.push(selectedProperties[j]);
        }
    }

    if (props.length == 0) {
        alert('Expected at least one selected property');
        return;
    }
    
    for (let i = 0; i < props.length; i++) {
        const keys = [];
        for (let j = 1; j <= props[i].numKeys; j++) {
            const keyProps = {
                value: [props[i].keyTime(j), props[i].keyValue(j)],
                interpolation: [props[i].keyInInterpolationType(j), props[i].keyOutInterpolationType(j)],
                ease: [props[i].keyInTemporalEase(j), props[i].keyOutTemporalEase(j)]
            }
            if (props[i].isSpatial) {
                keyProps.tangent = [props[i].keyInSpatialTangent(j), props[i].keyOutSpatialTangent(j)];
            }
            keys.push(keyProps);
        }
        const offset = Math.floor(keys[0].value[0] / variableUtils.getVariable("loopLength")) * variableUtils.getVariable("loopLength");
        if (offset > 0) {
            while (props[i].numKeys > 0) {
                props[i].removeKey(1);
            }
            for (let j = 0; j < keys.length; j++) {
                props[i].setValueAtTime(keys[j].value[0] - offset, keys[j].value[1]);
                props[i].setTemporalEaseAtKey(j + 1, keys[j].ease[0], keys[j].ease[1]);
                props[i].setInterpolationTypeAtKey(j + 1, keys[j].interpolation[0], keys[j].interpolation[1]);
                if (props[i].isSpatial) {
                    props[i].setSpatialTangentsAtKey(j + 1, keys[j].tangent[0], keys[j].tangent[1]);
                }
            }
        }
    }
}


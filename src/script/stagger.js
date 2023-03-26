import * as compUtils from '../utils/compUtils'

export default function stagger(responses, props) {
    responses = responses || [];
    if (!props || props.length == 0) {
        const selectedProperties = compUtils.getAllSelectedProperties();
        for (let j = 0; j < selectedProperties.length; j++){
            if (selectedProperties[j].canSetExpression && selectedProperties[j].numKeys >= 2) {
                props.push(selectedProperties[j]);
            }
        }
    }

    if (props.length == 0) {
        alert('Expected at least one selected property');
        return;
    }
    
    props = props.reverse();
    let offsetValue = parseInt(compUtils.promptWithAdd(responses, "Offset how many frames?", ""));
    if (isNaN(offsetValue)) {
        return;
    }
    offsetValue *= 1 / 30;
    
    let delay = 0;
    for (let i = 0; i < props.length; i++){
        const keys = [];
        for (let j = 1; j <= props[i].numKeys; j++) {
            keys.push([props[i].keyTime(j), props[i].keyValue(j)]);
        }
        const firstOffset = props[i].keyTime(1);
        while (props[i].numKeys > 0) {
            props[i].removeKey(1);
        }
        for (let j = 0; j < keys.length; j++) {
            const easeIn = new KeyframeEase(0, 33.333);
            const easeOut = new KeyframeEase(0, 33.333);
            props[i].setValueAtTime(keys[j][0] - firstOffset + delay, keys[j][1]);
            props[i].setTemporalEaseAtKey(j + 1, [easeIn], [easeOut]);
            if (props[i].isSpatial) {
                props[i].setSpatialAutoBezierAtKey(j + 1, true);
            }
        }
        delay += offsetValue;
    }
}

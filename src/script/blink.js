import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function blink() {
    const props = [];
    const selectedProperties = compUtils.getAllSelectedProperties();
    for (let j = 0; j < selectedProperties.length; j++){
        if (selectedProperties[j].numKeys == 2) {
            props.push(selectedProperties[j]);
        }
    }

    if (props.length == 0) {
        alert('Expected at least one selected property with exactly 2 keys.');
        return;
    }
    
    for (let i = 0; i < props.length; i++) {
        doBlink(props[i]);
    }
}

export function doBlink(prop) {
    const time = app.project.activeItem.time;
    const frame = compUtils.frameDuration();
    const keys = [];
    for (let j = 1; j <= prop.numKeys; j++) {
        keys.push(prop.keyValue(j));
    }
    while (prop.numKeys > 0) {
        prop.removeKey(1);
    }
    const easeIn = new KeyframeEase(0, 33.333);
    const easeOut = new KeyframeEase(0, 33.333);
    prop.setValueAtTime(time, keys[0]);
    prop.setValueAtTime(time + frame * 5, keys[1]);
    prop.setValueAtTime(time + frame * 10, keys[1]);
    prop.setValueAtTime(time + frame * 18, keys[0]);
    prop.setTemporalEaseAtKey(1, [easeIn], [easeOut]);
    prop.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
    prop.setTemporalEaseAtKey(3, [easeIn], [easeOut]);
    prop.setTemporalEaseAtKey(4, [easeIn], [easeOut]);
    prop.expression = `loopOutDuration("cycle", ${variableUtils.getVariable("loopLength")})`;
}


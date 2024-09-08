import * as compUtils from '../utils/compUtils'

export default function back10() {
    const selectedProperties = compUtils.getAllSelectedPuppetPins();
    const props = [];
    for (let j = 0; j < selectedProperties.length; j++){
        if (selectedProperties[j].property("Position").numKeys == 1) {
            props.push(selectedProperties[j]);
        }
    }

    if (props.length == 0) {
        alert('Expected at least one selected puppet pin with exactly one keyframe');
        return;
    }
    
    const offsetValue = 10 * compUtils.frameDuration();
    
    for (let i = 0; i < props.length; i++) {
        const pos = props[i].property("Position");
        pos.setValueAtTime(pos.keyTime(1) - offsetValue, pos.keyValue(1));
        pos.removeKey(2);
    }
}



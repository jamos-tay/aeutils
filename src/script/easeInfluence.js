import * as compUtils from '../utils/compUtils'

export default function easeInfluence() {
    const selectedProperties = compUtils.getAllSelectedProperties();
    
    const influence = parseFloat(prompt("Influence %?", ""));
    if (isNaN(influence)) {
        return;
    }

    const easeIn = new KeyframeEase(0, influence);
    const easeOut = new KeyframeEase(0, influence);
    for (let j = 0; j < selectedProperties.length; j++) {
        for (let i = 0; i < selectedProperties[j].numKeys; i++) {
            selectedProperties[j].setTemporalEaseAtKey(i + 1, [easeIn], [easeOut]);
        }
    }
}
    

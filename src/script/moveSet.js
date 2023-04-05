import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function moveSet() {
    const selectedProperties = compUtils.filterAnimatableProperties(compUtils.getAllSelectedProperties());
    if (selectedProperties.length != 1) {
        alert('Select exactly one animatable property');
        return;
    }
    const property = selectedProperties[0];

    const loopTime = parseFloat(variableUtils.getVariable("loopLength"));
    if (isNaN(loopTime)) {
        return;
    }

    const valueStr = prompt("Values? (10;20;5...)", "");
    if (!valueStr) {
        return;
    }
    let values = valueStr.split(";");
    if (values == null || values.length == 0) {
        return;
    }

    values = valueStr.split(";");
    for (let i = 0; i < values.length; i++) {
        if (values[i].indexOf(",") > -1) {
            values[i] = values[i].split(",");
            for (let k = 0; k < values[i].length; k++) {
                values[i][k] = parseFloat(values[i][k]);
            }
        }
        else {
            values[i] = parseFloat(values[i]);
        }
    }

    while (property.numKeys > 0) {
        property.removeKey(1);
    }

    const interval = loopTime / values.length;
    for (let i = 0; i < values.length; i++) {
        property.setValueAtTime(i * interval, values[i]);
    }
    property.setValueAtTime(loopTime, property.keyValue(1));

    const easeIn = new KeyframeEase(0, 33.333);
    const easeOut = new KeyframeEase(0, 33.333);
    let eases = [[easeIn], [easeOut]];
    if (property.propertyValueType == PropertyValueType.TwoD) {
        eases = [[easeIn, easeIn], [easeOut, easeOut]];
    } else if (property.propertyValueType == PropertyValueType.ThreeD) {
        eases = [[easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]];
    }
    for (let i = 0; i < property.numKeys; i++) {
        property.setTemporalEaseAtKey(i + 1, eases[0], eases[1]);
        if (property.propertyValueType == PropertyValueType.TwoD_SPATIAL || property.propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
            property.setSpatialAutoBezierAtKey(i + 1, true);
        }
    }
    property.expression = 'loopOut(); // ' + valueStr;
}


import * as compUtils from '../utils/compUtils'

export default function loopOut(responses) {
    const responseString = responses?.toString() || '';
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    for (let i = 0; i < selectedLayers.length; i++) {
        loopAllProperties(selectedLayers[i], responseString);
    }
    app.endUndoGroup();
}

function loopAllProperties(prop, responseString) {
    if (prop.propertyType == PropertyType.PROPERTY) {
        if (prop.canSetExpression && prop.numKeys >= 2 && (!prop.expressionEnabled || responseString)) {
            prop.expression = 'loopOut();' + (responseString ? ' // ' + responseString.toString() : '');
        }
    } else { // must be a group
        for (let i = 1; i <= prop.numProperties; i++) {
            loopAllProperties(prop.property(i), responseString);
        }
    }
}
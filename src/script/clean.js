import * as compUtils from '../utils/compUtils'

export default function clean() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    for (let i = 0; i < selectedLayers.length; i++) {
        cleanAllProperties(selectedLayers[i]);
    }
}

function cleanAllProperties(prop) {
    if (prop.propertyType == PropertyType.PROPERTY) {
        if (prop.numKeys == 1) {
            prop.removeKey(1);
        }
    } else { // must be a group
        for (let i = 1; i <= prop.numProperties; i++) {
            cleanAllProperties(prop.property(i));
        }
    }
}
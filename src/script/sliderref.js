import * as compUtils from '../utils/compUtils'

export default function skeleton() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length != 1) {
        alert("Expected one selected layer");
        return;
    }
    
    const selectedLayer = selectedLayers[0];
    
    const selectedProperties = compUtils.getSelectedProperties(selectedLayer);
    let property = null;
    let dimensions = 0;
    for (let j = 0; j < selectedProperties.length; j++){
        if (!selectedProperties[j].canVaryOverTime) {
            continue;
        }
        const propType = selectedProperties[j].propertyValueType;
        if (propType === PropertyValueType.ThreeD_SPATIAL || propType === PropertyValueType.ThreeD || 
            propType === PropertyValueType.TwoD_SPATIAL || propType === PropertyValueType.TwoD) {
            property = selectedProperties[j];
            dimensions = 2;
            break;

        }
        if (propType === PropertyValueType.OneD) {
            property = selectedProperties[j];
            dimensions = 1;
            break;
        }
    }

    if (!property) {
        alert("Select one property.");
        return;
    }
    
    const layer = compUtils.getParentLayer(property);
    const valueStrs = [];
    for (let i = 1; i <= dimensions; i++) {
        valueStrs.push(`thisComp.layer("${layer.name}").effect("${property.name} Slider${(dimensions == 1 ? `` : ` [${i}]`)}")("Slider")`);
    }
    const valueStr = dimensions == 1 ? valueStrs[0] :  `[${valueStrs.join(', ')}]`;

    if (property.expression) {
        if (property.expression.indexOf('loopOut()') > -1) {
            property.expression = property.expression.replace('loopOut()', `(loopOut() + ${valueStr})`);
        } else {
            alert('Cannot add slider value. Manually correct the expression.');
            property.expression = property.expression + `\r\n + ${valueStr};`;
        }
    } else {
        property.expression = 'loopOut() + ' + valueStr;
    }

    for (let i = 1; i <= dimensions; i++) {
        const slider = layer.property("Effects").addProperty("Slider Control");
        slider.property("Slider").setValueAtTime(0, 0);
        slider.name = property.name + ` Slider${(dimensions == 1 ? `` : ` [${i}]`)}`;
    }

}

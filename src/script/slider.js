import * as compUtils from '../utils/compUtils'

export default function slider() {
    const selectedProperties = compUtils.getAllSelectedProperties();
    
    const properties = [];
    for (let j = 0; j < selectedProperties.length; j++){
        if (selectedProperties[j].numKeys >= 2) {
            properties.push(selectedProperties[j]);
        }
    }
    if (properties.length === 0) {
        alert("Select at least one property with 2 keys.")
        return;
    }
    
    const layer = compUtils.getParentLayer(properties[0]);
    const name = properties[0].parentProperty.name;
    
    for (let j = 0; j < properties.length; j++){
        const property = properties[j];
        property.expression =
            `t = thisComp.layer("${layer.name}").effect("${name} Slider")("Slider");\r\n` +
            'v1 = thisProperty.key(1).value;\r\n' +
            'v2 = thisProperty.key(2).value;\r\n' +
            'v1 + (v2 - v1) * t;'
    }
    
    const slider = layer.property("Effects").addProperty("Slider Control");
    slider.property("Slider").setValueAtTime(0, 0);
    slider.name = name + " Slider";
}

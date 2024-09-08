import * as compUtils from '../utils/compUtils'

export default function slider() {
    const selectedProperties = compUtils.getAllSelectedProperties();
    
    const sliderProperties = [];
    const selectedLayerIds = {};

    for (let j = 0; j < selectedProperties.length; j++) {
        if (selectedProperties[j].matchName == 'ADBE Slider Control-0001') {
            sliderProperties.push(selectedProperties[j]);
            selectedLayerIds[compUtils.getParentLayer(selectedProperties[j]).index] = true;
        }
    }

    let controlLayer = null;
    let controlLayerIndex = -1;
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    for (let j = 0; j < selectedLayers.length; j++) {
        if (selectedLayerIds[selectedLayers[j].index]) {
            continue;
        }

        if (controlLayerIndex != -1) {
            alert('Found more than one selected layer with no slider property. Cannot determine controls layer.');
            return;
        }

        controlLayer = selectedLayers[j];
        controlLayerIndex = controlLayer.index;
    }
    
    if (!controlLayer) {
        alert('All layers have a slider property. Cannot determine controls layer.');
        return;
    }
    
        
    for (let j = 0; j < sliderProperties.length; j++){
        const property = sliderProperties[j];
        
        const slider = controlLayer.property("Effects").addProperty("Slider Control");
        for (let i = 1; i <= property.numKeys; i++){
            slider.property("Slider").setValueAtTime(property.keyTime(i), property.keyValue(i));
        }
        slider.name = compUtils.getParentLayer(property).name + ' - ' + property.parentProperty.name;
        slider.property("Slider").expression = property.expression;

        property.expression = `thisComp.layer("${controlLayer.name}").effect("${slider.name}")("Slider");`;
        
        while (property.numKeys > 0){
            property.removeKey(1);
        }
    }
}
    

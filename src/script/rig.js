import * as compUtils from '../utils/compUtils'

export default function rig() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length < 2) {
        alert("Expected at least 2 layers selected");
        return;
    }
    
    const childLayers = [];
    let parentLayer = null;
    let puppetProp = null;

    for (let i = 0; i < selectedLayers.length; i++){
        const selectedProperties = compUtils.getSelectedProperties(selectedLayers[i]);
        let isPuppet = false;
        for (let j = 0; j < selectedProperties.length; j++){
            if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                if (parentLayer != null) {
                    alert("Expected only one puppet layer");
                    return;
                }
                parentLayer = selectedLayers[i];
                puppetProp = selectedProperties[j];
                isPuppet = true;
            }
        }
        if (!isPuppet) {
            childLayers.push(selectedLayers[i]);
        }
    }

    if (childLayers.length == 0) {
        alert("No child layer(s) selected");
        return;
    }

    if (parentLayer == null) {
        alert("No parent layer selected");
        return;
    }

    for (let i = 0; i < childLayers.length; i++) {
        const targetLayer = childLayers[i];
        targetLayer.property("Transform").property("Position").expression = `thisComp.layer("${parentLayer.name}").effect("Puppet").arap.mesh("Mesh 1").deform("${puppetProp.name}").position`;
        targetLayer.property("Transform").property("Anchor Point").setValue(puppetProp.property("Position").value);
        targetLayer.parent = parentLayer;
    }
}

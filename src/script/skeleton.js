import * as compUtils from '../utils/compUtils'

export default function skeleton() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length != 1) {
        alert("Expected one selected layer");
        return;
    }
    
    const selectedLayer = selectedLayers[0];
    const puppetPins = compUtils.getSelectedPuppetPins(selectedLayer);

    for (let i = 0; i < puppetPins.length; i++){
        const pos = puppetPins[i].property("Position");
        const refName = `${selectedLayer.name} - ${puppetPins[i].name} Ref`;
        const solidLayer = comp.layers.addSolid([0, 0, 0], refName, selectedLayer.width, selectedLayer.height, 1);
        solidLayer.property("Opacity").setValue(0);
        solidLayer.property("Position").setValue(pos.value);
        solidLayer.property("Anchor Point").setValue(pos.value);
        solidLayer.parent = selectedLayer.parent;
        solidLayer.moveBefore(selectedLayer);
        pos.expression = `loopOut() + thisComp.layer("${refName}").transform.position - [${pos.value[0]}, ${pos.value[1]}];`;
    }

}

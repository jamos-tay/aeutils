import * as compUtils from '../utils/compUtils'

export default function loopComp() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length != 1) {
        alert("Expected one selected layer");
        return;
    }

    const startTime = parseFloat(prompt("Start?", ""));
    if (isNaN(startTime)) {
        return;
    }
    const endTime = parseFloat(prompt("End?", ""));
    if (isNaN(endTime)) {
        return;
    }

    const oldLayer = selectedLayers[0];
    const newLayer = oldLayer.duplicate();
    oldLayer.property("Opacity").setValueAtTime(startTime - 1, 0);
    oldLayer.property("Opacity").setValueAtTime(startTime, 100);
    oldLayer.property("Opacity").setValueAtTime(endTime - 1, 100);
    oldLayer.property("Opacity").setValueAtTime(endTime, 0);
    newLayer.property("Opacity").setValueAtTime(startTime - 1, 0);
    newLayer.property("Opacity").setValueAtTime(startTime, 100);
    newLayer.startTime = endTime - startTime;
    newLayer.name = newLayer.name + " Loop";

}

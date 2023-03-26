import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function loopEvo() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length != 1) {
        alert("Expected one selected layer");
        return;
    }
    
    const evoProperty = compUtils.findProperty(selectedLayers[0], "Evolution");
    const cycleProperty = compUtils.findProperty(selectedLayers[0], "Cycle Evolution");
    const revoProperty = compUtils.findProperty(selectedLayers[0], "Cycle (in Revolutions)");
    if (evoProperty == null || cycleProperty == null || revoProperty == null) {
        alert("Cannot find evolution properties");
        return;
    }
    
    const loopTime = parseFloat(variableUtils.getVariable("loopLength"));
    if (isNaN(loopTime)) {
        return;
    }
    const revolutions = parseInt(prompt("Revolutions?", ""));
    if (isNaN(revolutions)) {
        return;
    }

    evoProperty.setValueAtTime(0, 0);
    evoProperty.setValueAtTime(loopTime, 360 * revolutions);
    evoProperty.expression = 'loopOut();';
    cycleProperty.setValue(1);
    revoProperty.setValue(revolutions);
}

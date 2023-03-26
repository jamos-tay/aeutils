import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'

export default function bone() {
    boneFn(false);
}

function boneFn(isPolar) {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length != 1) {
        alert('Expected only one selected layer');
        return;
    }

    const puppetPins = compUtils.getSelectedPuppetPins(selectedLayers[0]);
    if (puppetPins.length != 2) {
        alert('Expected only two selected puppet points');
        return;
    }

    let childPoint = null;
    let parentPoint = null;
    if (compUtils.isChild(puppetPins[0].name)) {
        childPoint = puppetPins[0];
        parentPoint = puppetPins[1];
    }
    else {
        childPoint = puppetPins[1];
        parentPoint = puppetPins[0];
    }

    if (compUtils.isChild(parentPoint.name) || compUtils.isParent(childPoint.name)) {
        if (!confirm(`Is ${parentPoint.name} the parent?`)) {
            const tempPoint = childPoint;
            childPoint = parentPoint;
            parentPoint = tempPoint;
        }
    }

    let childPos = childPoint.property("Position").value;
    let parentPos = parentPoint.property("Position").value;

    if (isPolar) {
        childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
        parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];
        childPoint.property("Position").expression = `parentPos = effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoint.name}").position - transform.position;\r\n` +
            `childPos = [length(parentPos) * ${(childPos[0] / parentPos[0])}, Math.atan2(parentPos[1], parentPos[0])${mathUtils.formatNumber(childPos[1] - parentPos[1])}];\r\n` +
            '[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + transform.position';
    } else {
        childPoint.property("Position").expression = `p = effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoint.name}").position;\r\n` +
            `p2 = (effect("Puppet").arap.mesh("Mesh 1").deform("${childPoint.name}").position.numKeys > 0 ? loopOut() : ` +
            `effect("Puppet").arap.mesh("Mesh 1").deform("${childPoint.name}").position)\r\n` +
            `p + p2 - [${parentPos[0]},${parentPos[1]}]`;
    }
}

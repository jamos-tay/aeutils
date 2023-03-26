import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'

export default function chain() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    
    if (selectedLayers.length != 1) {
        alert('Expected only one selected layer');
        return;
    }

    const allPoints = compUtils.getSelectedPuppetPins(selectedLayers[0]);
    const childPoints = [];
    const parentPoints = [];
    for (let i = 0; i < allPoints.length; i++) {
        if (compUtils.isChild(allPoints[i].name)) {
            childPoints.push(allPoints[i]);
        } else {
            parentPoints.push(allPoints[i]);
        }
    }
    if (parentPoints.length != 2) {
        alert('Expected exactly two parent points');
        return;
    }

    for (let i = 0; i < childPoints.length; i++) {
        const childPoint = childPoints[i];
        const originPos = parentPoints[0].property("Position").value;
        let childPos = childPoint.property("Position").value;
        let parentPos = parentPoints[1].property("Position").value;
        childPos = [childPos[0] - originPos[0], childPos[1] - originPos[1]];
        parentPos = [parentPos[0] - originPos[0], parentPos[1] - originPos[1]];

        childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
        parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];

        childPoint.property("Position").expression = 
            `parentPos = effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoints[1].name}").position - effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoints[0].name}").position;\r\n` +
            `childPos = [length(parentPos) * ${(childPos[0] / parentPos[0])}, Math.atan2(parentPos[1], parentPos[0])${mathUtils.formatNumber(childPos[1] - parentPos[1])}];\r\n` +
            `[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoints[0].name}").position`;
    }
}

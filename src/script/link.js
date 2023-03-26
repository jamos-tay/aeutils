import * as compUtils from '../utils/compUtils'

export default function link() {
    const puppetPins = compUtils.getAllSelectedPuppetPins();
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
        if (!confirm(`Is ${compUtils.getParentLayer(parentPoint).name} - ${parentPoint.name} the parent?`)) {
            const tempPoint = childPoint;
            childPoint = parentPoint;
            parentPoint = tempPoint;
        }
    }

    linkPoints(parentPoint, childPoint);
}

export function linkPoints(parentPoint, childPoint) {
    const parentLayer = compUtils.getParentLayer(parentPoint);
    const childPosition = childPoint.property("Position").value;
    childPoint.property("Position").expression = `L = thisComp.layer("${parentLayer.name}");\r\n` +
        `fromComp(L.toComp(L.effect("Puppet").arap.mesh("Mesh 1").deform("${parentPoint.name}").position)) + ` +
        `(effect("Puppet").arap.mesh("Mesh 1").deform("${childPoint.name}").position.numKeys > 0 ? loopOut() : ` +
        `effect("Puppet").arap.mesh("Mesh 1").deform("${childPoint.name}").position) - [${childPosition[0]}, ${childPosition[1]}]`;
}


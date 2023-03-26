import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'
import { linkPoints } from './link';

export default function stitch() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    let childLayer = null;
    let parentLayer = null;

    if (selectedLayers.length != 2) {
        alert('Expected two selected layers');
        return;
    }

    if (selectedLayers[0].parent == selectedLayers[1]) {
        parentLayer = selectedLayers[1];
        childLayer = selectedLayers[0];
    } else if (selectedLayers[1].parent == selectedLayers[0]) {
        parentLayer = selectedLayers[0];
        childLayer = selectedLayers[1];
    }
    if (childLayer == null) {
        if (confirm("Is " + selectedLayers[0].name + " the parent?")) {
            parentLayer = selectedLayers[0];
            childLayer = selectedLayers[1];
        } else {
            parentLayer = selectedLayers[1];
            childLayer = selectedLayers[0];
        }
    }

    const childPoints = compUtils.getPuppetPoints(childLayer);
    const parentPoints = compUtils.getPuppetPoints(parentLayer);
    const threshold = 100;
    for (let i = 0; i < childPoints.length; i++) {
        let parentPoint = null;
        let closest = threshold;
        for (let j = 0; j < parentPoints.length; j++) {
            const d = mathUtils.distBetween(childPoints[i].property("Position").value, parentPoints[j].property("Position").value);
            if (d < closest) {
                parentPoint = parentPoints[j];
                closest = d;
            }
        }
        if (parentPoint != null) {
            linkPoints(parentPoint, childPoints[i]);
        }
    }
    childLayer.parent = parentLayer;
}

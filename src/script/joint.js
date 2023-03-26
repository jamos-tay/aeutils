import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'

const intersectMin = "function intersect(r,t,e,n,c,i){const s=r-n,a=t-c,o=s*s+a*a,u=o*o,f=(e*e-i*i)/(2*o),h=e*e-i*i,l=Math.sqrt(2*(e*e+i*i)/o-h*h/u-1),q=(r+n)/2+f*(n-r),v=l*(c-t)/2,w=(t+c)/2+f*(c-t),C=l*(r-n)/2;return[[q+v,w+C],[q-v,w-C]]}";

function selectPointTypeIndex(puppetPoints, pointType, pointName) {
    for (let i = 0; i < puppetPoints.length; i++) {
        if (puppetPoints[i].name == pointName) {
            return i;
        }
    }

    for (let i = 0; i < puppetPoints.length - 1; i++) {
        if (confirm(`Is ${puppetPoints[i].name} the ${pointType}?`)) {
            return i;
        }
    }
    return puppetPoints.length - 1;
}

export default function joint() {
    const comp = compUtils.getActiveComp();
    let puppetPoints = compUtils.getAllSelectedPuppetPins();

    if (puppetPoints.length != 3 && puppetPoints.length != 4) {
        alert('Expected either three or four selected puppet points');
        return;
    }

    let innerJointPoint;
    let selectIndex;
    const hasInnerJoint = puppetPoints.length == 4;
    if (hasInnerJoint) {
        selectIndex = selectPointTypeIndex(puppetPoints, 'inner joint', 'JI');
        innerJointPoint = puppetPoints[selectIndex];
        puppetPoints.splice(selectIndex, 1);
    }

    selectIndex = selectPointTypeIndex(puppetPoints, 'joint', 'J');
    const jointPoint = puppetPoints[selectIndex];
    const jointLayer = compUtils.getParentLayer(jointPoint);
    puppetPoints.splice(selectIndex, 1);

    selectIndex = selectPointTypeIndex(puppetPoints, 'controller', 'C');
    const controllerPoint = puppetPoints[selectIndex];
    const controllerLayer = compUtils.getParentLayer(controllerPoint);
    puppetPoints.splice(selectIndex, 1);

    selectIndex = selectPointTypeIndex(puppetPoints, 'anchor', 'A');
    const anchorPoint = puppetPoints[selectIndex];
    const anchorLayer = compUtils.getParentLayer(anchorPoint);

    if (controllerLayer.name !== anchorLayer.name) {
        controllerLayer.property("Transform").property("Position").expression = `thisComp.layer("${anchorLayer.name}").effect("Puppet").arap.mesh("Mesh 1").deform("${jointPoint.name}").position`;
        controllerLayer.property("Transform").property("Anchor Point").setValue(jointPoint.property("Position").value);
        controllerLayer.parent = jointLayer;
    }

    const anchorPos = anchorPoint.property("Position").value;
    const controllerPos = controllerPoint.property("Position").value;
    const jointPos = jointPoint.property("Position").value;

    const r1 = Math.sqrt(mathUtils.distBetween(anchorPos, jointPos));
    const r2 = Math.sqrt(mathUtils.distBetween(controllerPos, jointPos));
    const intersections = intersect(anchorPos[0], anchorPos[1], r1, controllerPos[0], controllerPos[1], r2);
    const intersectionIndex = (mathUtils.distBetween(intersections[0], jointPos) < mathUtils.distBetween(intersections[1], jointPos)) ? 0 : 1;

    const anchorRef = `thisComp.layer("${anchorLayer.name}").effect("Puppet").arap.mesh("Mesh 1").deform("${anchorPoint.name}").position`;
    if (controllerLayer.name === anchorLayer.name) {
        const controllerRef = `thisComp.layer("${compUtils.getParentLayer(controllerPoint).name}").effect("Puppet").arap.mesh("Mesh 1").deform("${controllerPoint.name}").position`;
        jointPoint.property("Position").expression =
            `${intersectMin}\r\n` +
            `intersect(${anchorRef}[0], ${anchorRef}[1], ${r1}, ${controllerRef}[0], ${controllerRef}[1], ${r2})[${intersectionIndex}];`;
    } else {
        const solidLayer = comp.layers.addSolid([0, 0, 0], `${controllerLayer.name} Controller`, controllerLayer.width, controllerLayer.height, 1);
        solidLayer.property("Opacity").setValue(0);
        solidLayer.property("Scale").setValue(controllerLayer.property("Scale").value);
        solidLayer.property("Rotation").setValue(controllerLayer.property("Rotation").value);
        solidLayer.property("Position").setValue(controllerPoint.property("Position").value);
        solidLayer.property("Anchor Point").setValue(controllerPoint.property("Position").value);
        solidLayer.moveBefore(jointLayer);
        solidLayer.parent = jointLayer;
        const controllerRef = `thisComp.layer("${solidLayer.name}").transform.position`;

        jointPoint.property("Position").expression =
            `${intersectMin}\r\n` +
            `intersect(${anchorRef}[0], ${anchorRef}[1], ${r1}, ${controllerRef}[0], ${controllerRef}[1], ${r2})[${intersectionIndex}]`;
        controllerPoint.property("Position").expression =
            `L = thisComp.layer("${solidLayer.name}");\r\n` +
            `fromComp(L.toComp(thisComp.layer("${solidLayer.name}").transform.anchorPoint))`;

        if (hasInnerJoint) {
            const innerJointPos = innerJointPoint?.property("Position").value;
            const controllerPoints = compUtils.getPuppetPoints(controllerLayer, controllerPoints);
            let closestPoint = null;
            let closest = 100;
            for (let i = 0; i < controllerPoints.length; i++) {
                const d = mathUtils.distBetween(controllerPoints[i].property("Position").value, innerJointPos);
                if (d < closest) {
                    closestPoint = controllerPoints[i];
                    closest = d;
                }
            }
            if (closestPoint != null) {
                closestPoint.property("Position").expression = `L = thisComp.layer("${jointLayer.name}");\r\n` +
                    `fromComp(L.toComp(L.effect("Puppet").arap.mesh("Mesh 1").deform("${innerJointPoint.name}").position))`;
            }
        }
    }
    if (hasInnerJoint) {
        innerJointPoint.property("Position").expression = `p = effect("Puppet").arap.mesh("Mesh 1").deform("${jointPoint.name}").position;\r\n` +
            `p2 = effect("Puppet").arap.mesh("Mesh 1").deform("${innerJointPoint.name}").position;\r\n` +
            `p + p2 - [${jointPos[0]}, ${jointPos[1]}]`;
    }
}

function intersect(x1, y1, r1, x2, y2, r2) {
    const centerdx = x1 - x2;
    const centerdy = y1 - y2;
    const R2 = centerdx * centerdx + centerdy * centerdy;
    const R4 = R2 * R2;
    const a = (r1 * r1 - r2 * r2) / (2 * R2);
    const r2r2 = (r1 * r1 - r2 * r2);
    const c = Math.sqrt(2 * (r1 * r1 + r2 * r2) / R2 - (r2r2 * r2r2) / R4 - 1);
    const fx = (x1 + x2) / 2 + a * (x2 - x1);
    const gx = c * (y2 - y1) / 2;
    const ix1 = fx + gx;
    const ix2 = fx - gx;
    const fy = (y1 + y2) / 2 + a * (y2 - y1);
    const gy = c * (x1 - x2) / 2;
    const iy1 = fy + gy;
    const iy2 = fy - gy;
    return [[ix1, iy1], [ix2, iy2]];
}

import * as compUtils from '../utils/compUtils'
import * as mathUtils from '../utils/mathUtils'
import * as variableUtils from '../utils/variableUtils'
import stagger from './stagger';
import loopOut from './loopOut';

export default function swing() {
    swingFn('default');
}

export function swingFn(mode) {
    const responses = [];
    const selectedLayers = compUtils.getSelectedLayers();
    if (selectedLayers.length != 1) {
        alert('Expected one selected layer');
        return;
    }

    let puppetPins = compUtils.getSelectedPuppetPins(selectedLayers[0]);
    if (puppetPins.length == 0) {
        alert('Expected at least one puppet pin');
        return;
    }
    puppetPins = puppetPins.reverse();

    const loopTime = parseFloat(variableUtils.getVariable("loopLength"));
    if (isNaN(loopTime)) {
        alert('Invalid loop length');
        return;
    }

    const deg = [];

    const swingDeg = compUtils.promptWithAdd(responses, "Rotate how many degrees?", "");
    if (!swingDeg) {
        return;
    }
    if (swingDeg.indexOf(',') != -1) {
        const values = swingDeg.split(",");
        if (values.length != 2) {
            alert('Input should be a number, or in format x,y (e.g. 100,3)');
            return;
        }
        deg[0] = parseFloat(values[0]) * mathUtils.DEGREES_PER_RADIAN;
        deg[1] = parseFloat(values[1]) * mathUtils.DEGREES_PER_RADIAN;
        if (isNaN(deg[0]) || isNaN(deg[1])) {
            return;
        }
    } else {
        deg[0] = parseFloat(swingDeg);
        if (isNaN(deg[0])) {
            return;
        }
        deg[0] *= mathUtils.DEGREES_PER_RADIAN;
        deg[1] = -deg[0]
    }

    let degPerPoint = 0;
    if (mode == 'rotate') {
        degPerPoint = parseFloat(compUtils.promptWithAdd(responses, "Rotate how many degrees per point?", ""));
        if (isNaN(degPerPoint)) {
            return;
        }
        degPerPoint *= mathUtils.DEGREES_PER_RADIAN;
    }

    const props = [];
    doSwing(selectedLayers, mode, puppetPins, deg, degPerPoint, loopTime, props);
    stagger(responses, props.reverse());
    loopOut(responses);
}

export function doSwing(selectedLayers, mode, puppetPins, deg, degPerPoint, loopTime, props) {
    let startAnchors = [selectedLayers[0].property("Position").value];
    let endAnchors = [selectedLayers[0].property("Position").value];
    if (mode == 'puppet') {
        startAnchors = [puppetPins[0].property("Position").value];
        endAnchors = [puppetPins[0].property("Position").value];
        puppetPins.shift();
    }

    for (let i = 0; i < puppetPins.length; i++) {
        while (puppetPins[i].property("Position").numKeys > 0) {
            puppetPins[i].property("Position").removeKey(1);
        }

        const puppetPos = puppetPins[i].property("Position").value;
        let startPos = puppetPos;
        let endPos = puppetPos;

        startPos = rotateAround(startPos, startAnchors[0], deg[0]);
        endPos = rotateAround(endPos, endAnchors[0], deg[1]);

        if (mode == 'rotate') {
            for (let j = 0; j < startAnchors.length; j++) {
                startPos = rotateAround(startPos, startAnchors[j], degPerPoint);
                endPos = rotateAround(endPos, endAnchors[j], -degPerPoint);
            }
        }

        let setSpatial = true;
        if (mode == 'toward') {
            setSpatial = false;
            startPos = rotateAround(startPos, puppetPos, Math.PI / 2);
            endPos = rotateAround(endPos, puppetPos, Math.PI / 2);
        }

        startAnchors.push(startPos);
        endAnchors.push(endPos);

        let inTangent;
        let outTangent;
        const easeIn = new KeyframeEase(0, 33.333);
        const easeOut = new KeyframeEase(0, 33.333);

        puppetPins[i].property("Position").setValueAtTime(loopTime * 0, startPos);
        puppetPins[i].property("Position").setTemporalEaseAtKey(1, [easeIn], [easeOut]);

        puppetPins[i].property("Position").setValueAtTime(loopTime * 0.5, endPos);
        puppetPins[i].property("Position").setTemporalEaseAtKey(2, [easeIn], [easeOut]);

        puppetPins[i].property("Position").setValueAtTime(loopTime * 1, startPos);
        puppetPins[i].property("Position").setTemporalEaseAtKey(3, [easeIn], [easeOut]);

        if (setSpatial) {
            inTangent = [startPos[0] - puppetPos[0], startPos[1] - puppetPos[1]];
            outTangent = [puppetPos[0] - startPos[0], puppetPos[1] - startPos[1]];
            puppetPins[i].property("Position").setSpatialTangentsAtKey(1, inTangent, outTangent);
            inTangent = [puppetPos[0] - endPos[0], puppetPos[1] - endPos[1]];
            outTangent = inTangent;
            puppetPins[i].property("Position").setSpatialTangentsAtKey(2, inTangent, outTangent);
            inTangent = [puppetPos[0] - startPos[0], puppetPos[1] - startPos[1]];
            outTangent = [startPos[0] - puppetPos[0], startPos[1] - puppetPos[1]];
            puppetPins[i].property("Position").setSpatialTangentsAtKey(3, inTangent, outTangent);
        }

        props.push(puppetPins[i].property("Position"));
    }
}

function rotateAround(pPos, aPos, deg) {
    const cPos = [pPos[0] - aPos[0], pPos[1] - aPos[1]];
    const rPos = [Math.sqrt(cPos[0] * cPos[0] + cPos[1] * cPos[1]), Math.atan2(cPos[1], cPos[0])];
    const nPos = [rPos[0], rPos[1] + deg];
    const ncPos = [nPos[0] * Math.cos(nPos[1]) + aPos[0], nPos[0] * Math.sin(nPos[1]) + aPos[1]];
    return ncPos;
}

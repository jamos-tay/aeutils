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
    if (mode == 'offset') {
        deg[0] = parseFloat(compUtils.promptWithAdd(responses, "Degree start?", ""));
        if (isNaN(deg[0])) {
            return;
        }
        deg[0] *= mathUtils.DEGREES_PER_RADIAN;
        deg[1] = parseFloat(compUtils.promptWithAdd(responses, "Degree end?", ""));
        if (isNaN(deg[1])) {
            return;
        }
        deg[1] *= mathUtils.DEGREES_PER_RADIAN;
    }
    else {
        deg[0] = parseFloat(compUtils.promptWithAdd(responses, "Rotate how many degrees?", ""));
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

    let startAnchors = [selectedLayers[0].property("Position").value];
    let endAnchors = [selectedLayers[0].property("Position").value];
    if (mode == 'puppet') {
        startAnchors = [puppetPins[0].property("Position").value];
        endAnchors = [puppetPins[0].property("Position").value];
        puppetPins.shift();
    }

    const props = [];
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

        if (mode == 'toward') {
            startPos = rotateAround(startPos, puppetPos, Math.PI / 2);
            endPos = rotateAround(endPos, puppetPos, Math.PI / 2);
        }

        startAnchors.push(startPos);
        endAnchors.push(endPos);

        puppetPins[i].property("Position").setValueAtTime(loopTime * 0, startPos);
        puppetPins[i].property("Position").setValueAtTime(loopTime * 0.5, endPos);
        puppetPins[i].property("Position").setValueAtTime(loopTime * 1, startPos);
        props.push(puppetPins[i].property("Position"));
    }
    stagger(responses, props.reverse());
    loopOut(responses);
}

function rotateAround(pPos, aPos, deg) {
    const cPos = [pPos[0] - aPos[0], pPos[1] - aPos[1]];
    const rPos = [Math.sqrt(cPos[0] * cPos[0] + cPos[1] * cPos[1]), Math.atan2(cPos[1], cPos[0])];
    const nPos = [rPos[0], rPos[1] + deg];
    const ncPos = [nPos[0] * Math.cos(nPos[1]) + aPos[0], nPos[0] * Math.sin(nPos[1]) + aPos[1]];
    return ncPos;
}

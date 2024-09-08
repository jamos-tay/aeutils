import * as compUtils from '../utils/compUtils';
import * as mathUtils from '../utils/mathUtils';
import * as variableUtils from '../utils/variableUtils';
import { doStagger } from './stagger';
import { doSwing } from './swing';
import loopOut from './loopOut';

export default function swingPuppetChain() {
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
    let degPerPoint = 0;
    deg[0] = parseFloat(compUtils.promptWithAdd(responses, "Rotate how many degrees?", ""));
    if (isNaN(deg[0])) {
        return;
    }
    deg[0] *= mathUtils.DEGREES_PER_RADIAN;
    deg[1] = -deg[0]

    let offsetValue = parseInt(compUtils.promptWithAdd(responses, "Offset how many frames?", ""));
    if (isNaN(offsetValue)) {
        return;
    }
    offsetValue *= compUtils.frameDuration();

    let baseOffsetValue = parseInt(compUtils.promptWithAdd(responses, "Offset how many frames per set?", ""));
    if (isNaN(baseOffsetValue)) {
        return;
    }
    baseOffsetValue *= compUtils.frameDuration();

    let firstKeyTime = -1;
    const puppetChains = [];
    let currentChain = [];
    for (let i = 0; i < puppetPins.length; i++) {
        if (puppetPins[i].position.numKeys == 0) {
            alert('Puppet pin should have at least one key');
            return;
        }

        if (firstKeyTime == -1) {
            firstKeyTime = puppetPins[i].position.keyTime(1);
        }

        if (firstKeyTime == puppetPins[i].position.keyTime(1)) {
            if (currentChain.length > 1) {
                puppetChains.push(currentChain);
            }
            currentChain = [puppetPins[i]];
        } else {
            currentChain.push(puppetPins[i]);
        }
    }

    if (currentChain.length > 1) {
        puppetChains.push(currentChain);
    }
    
    let baseOffset = 0;
    for (let i = 0; i < puppetChains.length; i++) {
        const props = [];
        doSwing(selectedLayers, "puppet", puppetChains[i], deg, degPerPoint, loopTime, props);
        doStagger(props, offsetValue, baseOffset);
        baseOffset += baseOffsetValue;
    }
    loopOut(responses);
}
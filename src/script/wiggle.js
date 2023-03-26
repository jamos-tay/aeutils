import * as compUtils from '../utils/compUtils'
import * as variableUtils from '../utils/variableUtils'

export default function wiggle() {
    const selectedProperties = compUtils.getAllSelectedProperties();

    const loopTime = parseFloat(variableUtils.getVariable("loopLength"));
    if (isNaN(loopTime)) {
        return;
    }
    const freq = parseInt(prompt("Frequency?", ""));
    if (isNaN(freq)) {
        return;
    }
    const amp = parseInt(prompt("Amplitude?", ""));
    if (isNaN(amp)) {
        return;
    }

    for (let i = 0; i < selectedProperties.length; i++) {
        selectedProperties[i].expression = `freq = ${freq};\r\n` +
            `amp = ${amp};\r\n` +
            `loopTime = ${loopTime};\r\n` +
            `t = time % loopTime;\r\n` +
            `wiggle1 = wiggle(freq, amp, 1, 0.5, t);\r\n` +
            `wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);\r\n` +
            `linear(t, 0,  loopTime, wiggle1, wiggle2)`
    }

}

import * as compUtils from '../utils/compUtils'

export default function anchor() {
    const puppetPins = compUtils.getAllSelectedPuppetPins();

    for (let i = 0; i < puppetPins.length; i++){
        const pos = puppetPins[i].property("Position");
        pos.expression = `fromComp([${pos.value[0]}, ${pos.value[1]}]) + ` +
            `(effect("Puppet").arap.mesh("Mesh 1").deform("${puppetPins[i].name}").position.numKeys > 0 ? loopOut() : ` +
            `effect("Puppet").arap.mesh("Mesh 1").deform("${puppetPins[i].name}").position) - [${pos.value[0]}, ${pos.value[1]}]`;
    }
}

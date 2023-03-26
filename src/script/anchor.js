import * as compUtils from '../utils/compUtils'

export default function anchor() {
    const comp = compUtils.getActiveComp();
    const puppetPins = compUtils.getAllSelectedPuppetPins();

    if (confirm("Movable anchor?")) {
        for (let i = 0; i < puppetPins.length; i++){
            const selectedLayer = compUtils.getParentLayer(puppetPins[i]);
            const pos = puppetPins[i].property("Position");
            const layerName = puppetPins[i].name;
            const solidLayer = comp.layers.addSolid([0, 0, 0], `${selectedLayer.name} - ${layerName} Anchor`, selectedLayer.width, selectedLayer.height, 1);
            solidLayer.property("Opacity").setValue(0);
            solidLayer.property("Position").setValue(pos.value);
            solidLayer.property("Anchor Point").setValue(pos.value);
            solidLayer.moveBefore(compUtils.getParentLayer(puppetPins[i]));
            pos.expression = `L = thisComp.layer("${layerName} Anchor")\r\n` +
                'fromComp(L.transform.position)\r\n';
        }
    }
    else 
    {
        for (let i = 0; i < puppetPins.length; i++){
            const pos = puppetPins[i].property("Position");
            pos.expression = `fromComp([${pos.value[0]}, ${pos.value[1]}]);`;
        }
    }
}

import * as compUtils from '../utils/compUtils'
import loopEvo from './loopEvo'

export default function addNoise() {
    const comp = compUtils.getActiveComp();
    const layer = comp.layers.addSolid([0, 0, 0], "Noise", comp.width, comp.height, 1);
    layer.name = "Noise";
    layer.property("Effects").addProperty("Fractal Noise");
    loopEvo();
}

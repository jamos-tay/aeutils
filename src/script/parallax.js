import * as compUtils from '../utils/compUtils';

export default function parallax() {
    const comp = compUtils.getActiveComp();
    const selectedLayers = compUtils.getSelectedLayers(comp);
    if (selectedLayers.length == 0) {
        return;
    }

    addParallaxLayer(comp, selectedLayers[0]);

    for (let i = 0; i < selectedLayers.length; i++){
        const slider = selectedLayers[i].property("Effects").addProperty("Slider Control");
        slider.name = "Parallax";
        slider.property("Slider").setValueAtTime(0, 0);
        selectedLayers[i].property("Transform").property("Position").expression = 
            't = effect("Parallax")("Slider");\r\n'+
            'p = transform.position;\r\n'+
            'theta = thisComp.layer("Parallax").effect("X")("Slider");\r\n'+
            'theta2 = thisComp.layer("Parallax").effect("Y")("Slider");\r\n'+
            '[p[0] + t * Math.tan(theta / 180 * Math.PI), p[1] + t * Math.tan(theta2 / 180 * Math.PI)]\r\n';
    }
}

function addParallaxLayer(comp, controllerLayer) {
    for (let i = 1; i <= comp.layers.length; i++){
        if (comp.layers[i].name == "Parallax") {
            return;
        }
    }
    const solidLayer = comp.layers.addSolid([0, 0, 0], "Parallax", controllerLayer.width, controllerLayer.height, 1);
    solidLayer.property("Opacity").setValue(0);
    const xSlider = solidLayer.property("Effects").addProperty("Slider Control");
    xSlider.property("Slider").setValueAtTime(0, 0);
    xSlider.name = "X";
    const ySlider = solidLayer.property("Effects").addProperty("Slider Control");
    ySlider.property("Slider").setValueAtTime(0, 0);
    ySlider.name = "Y";
}
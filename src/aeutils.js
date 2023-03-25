function utils(thisObj) {
    var variables = {};
    var internalVariables = {};
    /* Build UI  */
    function buildUI(thisObj) {
        var windowTitle = localize("$$$/AE/Script/Utils/Utils=Utils");
        var loopOutBtn = localize("$$$/AE/Script/Utils/LoopOut=Loop Out");
        var rigBtn = localize("$$$/AE/Script/Utils/Rig=Rig");
        var linkBtn = localize("$$$/AE/Script/Utils/Link=Link");
        var boneBtn = localize("$$$/AE/Script/Utils/Bone=Bone");
        var parallaxBtn = localize("$$$/AE/Script/Utils/Parallax=Parallax");
        var bonePolarBtn = localize("$$$/AE/Script/Utils/BonePolar=Bone (P)");
        var stitchBtn = localize("$$$/AE/Script/Utils/Stitch=Stitch");
        var swingTowardBtn = localize("$$$/AE/Script/Utils/Swing=Swing Tw");
        var swingBtn = localize("$$$/AE/Script/Utils/Swing=Swing");
        var swingOffsetBtn = localize("$$$/AE/Script/Utils/Swing=Swing Off");
        var swingRBtn = localize("$$$/AE/Script/Utils/SwingR=Swing R");
        var scaleBtn = localize("$$$/AE/Script/Utils/Scale=Scale");
        var staggerBtn = localize("$$$/AE/Script/Utils/Stagger=Stagger");
        var swingPPBtn = localize("$$$/AE/Script/Utils/SwingPP=Swing PP");
        var anchorBtn = localize("$$$/AE/Script/Utils/Anchor=Anchor");
        var clearExpBtn = localize("$$$/AE/Script/Utils/ClearExp=Clear Exp");
        var loopEvoBtn = localize("$$$/AE/Script/Utils/LoopEvo=Loop evo");
        var loopCompBtn = localize("$$$/AE/Script/Utils/LoopComp=Loop cmp");
        var addNoiseBtn = localize("$$$/AE/Script/Utils/LoopComp=Noise");
        var jointBtn = localize("$$$/AE/Script/Utils/Joint=Joint");
        // var moveBtn = localize("$$$/AE/Script/Utils/Move=Move Rel");
        var moveSetBtn = localize("$$$/AE/Script/Utils/MoveSet=Move Set");
        var createRefBtn = localize("$$$/AE/Script/Utils/CreateRef=Skele");
        // var moveDirBtn = localize("$$$/AE/Script/Utils/MoveDir=Move Dir");
        var moveAIOBtn = localize("$$$/AE/Script/Utils/MoveDir=Move AIO");
        var chainBtn = localize("$$$/AE/Script/Utils/Chain=Chain");
        var roundBtn = localize("$$$/AE/Script/Utils/Round=Round");
        var graphSpdBtn = localize("$$$/AE/Script/Utils/GraphSpd=Graph Spd");
        var joystickBtn = localize("$$$/AE/Script/Utils/Joystick=Joystick");
        var btnData = {
            "Rig": [
                {
                    "text" : loopOutBtn,
                    "click" : function(){
                        loopOut([]);
                    }
                },
                {
                    "text" : rigBtn,
                    "click" : function(){
                        rig();
                    }
                },
                {
                    "text" : linkBtn,
                    "click" : function(){
                        link();
                    }
                },
                {
                    "text" : boneBtn,
                    "click" : function(){
                        bone(false);
                    }
                },
                /*{
                    "text" : bonePolarBtn,
                    "click" : function(){
                        bone(true);
                    }
                },
                {
                    "text" : stitchBtn,
                    "click" : function(){
                        stitch();
                    }
                },*/
                {
                    "text" : anchorBtn,
                    "click" : function(){
                        anchor();
                    }
                },
                {
                    "text" : swingTowardBtn,
                    "click" : function(){
                        swing(false, false, true, false);
                    }
                },
                {
                    "text" : swingBtn,
                    "click" : function(){
                        swing(false, false, false, false);
                    }
                },
                {
                    "text" : swingOffsetBtn,
                    "click" : function(){
                        swing(false, true, false, false);
                    }
                },
                {
                    "text" : swingRBtn,
                    "click" : function(){
                        swing(true, false, false, false);
                    }
                },
                {
                    "text" : staggerBtn,
                    "click" : function(){
                        stagger([], []);
                    }
                },
                {
                    "text" : scaleBtn,
                    "click" : function(){
                        scale();
                    }
                },
                {
                    "text" : jointBtn,
                    "click" : function(){
                        joint();
                    }
                },
                {
                    "text" : moveAIOBtn,
                    "click" : function(){
                        moveDir();
                        round();
                        graphSpd();
                    }
                },
                /*
                {
                    "text" : graphSpdBtn,
                    "click" : function(){
                        graphSpd();
                    }
                },
                */
                {
                    "text" : moveSetBtn,
                    "click" : function(){
                        move(false);
                    }
                },
                {
                    "text" : swingPPBtn,
                    "click" : function(){
                        swing(false, false, false, true);
                    }
                },
                /*
                {
                    "text" : moveBtn,
                    "click" : function(){
                        move(true);
                    }
                },
                {
                    "text" : moveDirBtn,
                    "click" : function(){
                        moveDir();
                    }
                },
                */
            ],
            "Scripts": [
                {
                    "text" : chainBtn,
                    "click" : function(){
                        chain();
                    }
                },
                {
                    "text" : parallaxBtn,
                    "click" : function(){
                        parallax();
                    }
                },
                {
                    "text" : clearExpBtn,
                    "click" : function(){
                        clearExp();
                    }
                },
                {
                    "text" : roundBtn,
                    "click" : function(){
                        round();
                        graphSpd();
                    }
                },
                {
                    "text" : loopEvoBtn,
                    "click" : function(){
                        loopEvo();
                    }
                },
                {
                    "text" : loopCompBtn,
                    "click" : function(){
                        loopComp();
                    }
                },
                {
                    "text" : addNoiseBtn,
                    "click" : function(){
                        addNoise();
                    }
                },
                {
                    "text" : joystickBtn,
                    "click" : function(){
                        joystick();
                    }
                },
                {
                    "text" : createRefBtn,
                    "click" : function(){
                        createRef();
                    }
                },
            ]
        };
        
        var variableData = [
            {
                "text" : 'Loop',
                "variable": 'loopLength',
                "value" : '4'
            },
            {
                "text" : 'Speed %',
                "variable": 'speedPercent',
                "value" : '10'
            },
            {
                "text" : 'Round %',
                "variable": 'roundPercent',
                "value" : '10'
            },
            {
                "text" : 'Flip Handles',
                "variable": 'flipHandles',
                "value" : '0'
            },
        ];
        var win = (thisObj instanceof Panel)? thisObj : new Window('palette', windowTitle);
        win.spacing = 0;
        win.margins = 4;

        var tpanel = win.add ("tabbedpanel");

        for (const tab in btnData) {
            var btnTab = tpanel.add ("tab", undefined, tab);
            var rowGrp = btnTab.add("group");
            btnTab.alignChildren = "left";
            rowGrp.alignChildren = "left";
            rowGrp.orientation = "column";
            var btnGrps = [];
            var btns = [];
            for (var i = 0; i < btnData[tab].length; i++) {
                if (i % 3 == 0) {
                    var j = i / 3;
                    btnGrps[j] = rowGrp.add("group");
                    btnGrps[j].spacing = 4;
                    btnGrps[j].margins = 0;
                    btnGrps[j].orientation = "row";
                }
                btns[i] = btnGrps[btnGrps.length - 1].add("button", undefined, btnData[tab][i].text);
                btns[i].onClick = btnData[tab][i].click;
            }
        }

        var varTab = tpanel.add ("tab", undefined, "Variables");
        var varsGrp = varTab.add("group");
        varTab.alignChildren = "left";
        varsGrp.alignChildren = "left";
        varsGrp.orientation = "column";
        for (var i = 0; i < variableData.length; i++) {
            var varGrp = varsGrp.add('group');
            varGrp.spacing = 10;
            varGrp.orientation = "row";
            varGrp.add(`statictext {text: "${variableData[i].text}: ", characters: 6}`, undefined, "");
            variables[variableData[i].variable] = varGrp.add(`edittext {text: "${variableData[i].value}", characters: 5}`, undefined, "");
        }
        
        win.layout.layout(true);

        return win;
    }
    
    function getVariable(varName) {
        if (varName in variables)
            return variables[varName].text;
        if (varName in internalVariables)
            return internalVariables[varName];
        return undefined;
    }
    
    function setVariable(varName, val) {
        internalVariables[varName] = val;
    }

    function round() {
        try {
            var selectedProperties = filterSelectedProperties(getAllSelectedProperties());
            if (selectedProperties.length == 0) {
                return;
            }

            var percentage = parseFloat(getVariable("roundPercent"));
            if (isNaN(percentage)) {
                return;
            }
            percentage /= 100;

            var flipHandles = parseFloat(getVariable("flipHandles"));
            lastDir = getVariable("lastDir");
            if (lastDir && (lastDir > 6)) {
                percentage = -percentage;
            }
            if (flipHandles !== 0) {
                percentage = -percentage;
            }
            
            app.beginUndoGroup("Round");
            for (var i = 0; i < selectedProperties.length; i++) {
                if (selectedProperties[i].numKeys != 3) {
                    continue;
                }

                for (var j = 1; j <= selectedProperties[i].numKeys; j++) {
                    var currPoint = selectedProperties[i].keyValue(j);
                    var inTangent = [0, 0];
                    var outTangent = [0, 0];
                    if (j > 1) {
                        var prevPoint = selectedProperties[i].keyValue(j - 1);
                        var diffVector = [prevPoint[0] - currPoint[0], prevPoint[1] - currPoint[1]];
                        diffVector = rotate90(diffVector, false);
                        diffVector = scaleVec(diffVector, percentage);
                        inTangent = diffVector;
                    }
                    if (j < selectedProperties[i].numKeys) {
                        var nextPoint = selectedProperties[i].keyValue(j + 1);
                        var diffVector = [nextPoint[0] - currPoint[0], nextPoint[1] - currPoint[1]];
                        diffVector = rotate90(diffVector, true);
                        diffVector = scaleVec(diffVector, percentage);
                        outTangent = diffVector;
                    }
                    if (selectedProperties[i].propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
                        inTangent.push(0);
                        outTangent.push(0);
                    }
                    selectedProperties[i].setSpatialTangentsAtKey(j, inTangent, outTangent);
                }
            }

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }
    
    function rotate90(diff, clockwise) {
        return clockwise ? [diff[1], -diff[0]] : [-diff[1], diff[0]];
    }

    function scaleVec(vec, amt) {
        for (var i = 0; i < vec.length; i++) {
            vec[i] *= amt;
        }
        return vec;
    }

    function graphSpd() {
        try {
            var selectedProperties = filterSelectedProperties(getAllSelectedProperties());
            if (selectedProperties.length == 0) {
                return;
            }

            var speedPercent = parseFloat(getVariable("speedPercent"));
            if (isNaN(speedPercent)) {
                return;
            }

            app.beginUndoGroup("Graph Speed");
            for (var j = 0; j < selectedProperties.length; j++) {
                var totalDist = 0;
                for (var i = 1; i < selectedProperties[j].numKeys; i++) {
                    var currPoint = selectedProperties[j].keyValue(i);
                    var nextPoint = selectedProperties[j].keyValue(i + 1);
                    totalDist += Math.sqrt((currPoint[0] - nextPoint[0]) * (currPoint[0] - nextPoint[0]) + (currPoint[1] - nextPoint[1]) * (currPoint[1] - nextPoint[1]));
                }
                var avgSpeed = totalDist / (selectedProperties[j].keyTime(selectedProperties[j].numKeys) - selectedProperties[j].keyTime(1));
                var speed = avgSpeed * speedPercent / 100;

                var easeIn = new KeyframeEase(speed, 33.333);
                var easeOut = new KeyframeEase(speed, 33.333);
                for (var i = 0; i < selectedProperties[j].numKeys; i++) {
                    selectedProperties[j].setTemporalEaseAtKey(i + 1, [easeIn], [easeOut]);
                }
            }

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function move(relative) {
        try {
            var selectedProperties = filterSelectedProperties(getAllSelectedProperties());
            if (selectedProperties.length == 0) {
                return;
            }

            var loopTime = parseFloat(getVariable("loopLength"));
            if (isNaN(loopTime)) {
                return;
            }

            var varStr = `Loop length: ${getVariable("loopLength")}    Round: ${getVariable("roundPercent")}    Speed: ${getVariable("speedPercent")}`
            var valueStr = prompt(varStr + "\n\nValues? (10;20;5...)", "");
            if (!valueStr) {
                return;
            }
            var values = valueStr.split(";");
            if (values == null || values.length == 0) {
                return;
            }

            app.beginUndoGroup("Move");
            for (var j = 0; j < selectedProperties.length; j++) {
                values = valueStr.split(";");
                for (var i = 0; i < values.length; i++) {
                    if (values[i].indexOf(",") > -1) {
                        values[i] = values[i].split(",");
                        for (var k = 0; k < values[i].length; k++) {
                            values[i][k] = parseFloat(values[i][k]);
                        }
                    }
                    else {
                        values[i] = parseFloat(values[i]);
                    }
                }

                while (selectedProperties[j].numKeys > 0) {
                    selectedProperties[j].removeKey(1);
                }                

                if (relative) {
                    var interval = loopTime / (values.length + 1);
                    var currPos = selectedProperties[j].value;
                    selectedProperties[j].setValueAtTime(0, currPos);
                    for (var i = 0; i < values.length; i++){
                        if (isNaN(values[i])) {
                            for (var k = 0; k < values[i].length; k++) {
                                values[i][k] += currPos[k];
                            }
                        }
                        else {
                            values[i] += currPos;
                        }
                        selectedProperties[j].setValueAtTime((i + 1) * interval, values[i]);
                    }
                }
                else {
                    var interval = loopTime / values.length;
                    for (var i = 0; i < values.length; i++){
                        selectedProperties[j].setValueAtTime(i * interval, values[i]);
                    }
                }
                selectedProperties[j].setValueAtTime(loopTime, selectedProperties[j].keyValue(1));
                
                var easeIn = new KeyframeEase(0, 33.333);
                var easeOut = new KeyframeEase(0, 33.333);
                for (var i = 0; i < selectedProperties[j].numKeys; i++) {
                    selectedProperties[j].setTemporalEaseAtKey(i + 1, [easeIn], [easeOut]);
                    if (selectedProperties[j].propertyValueType == PropertyValueType.TwoD_SPATIAL || selectedProperties[j].propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
                        selectedProperties[j].setSpatialAutoBezierAtKey(i + 1, true);
                    }
                }
                selectedProperties[j].expression = 'loopOut(); // ' + valueStr;
            }

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function moveDir() {
        try {
            var dToR = 0.0174533;
            var selectedProperties = filterSelectedProperties(getAllSelectedProperties());
            if (selectedProperties.length == 0) {
                return;
            }

            var loopTime = parseFloat(getVariable("loopLength"));
            if (isNaN(loopTime)) {
                return;
            }

            var varStr = `Loop length: ${getVariable("loopLength")}    Round: ${getVariable("roundPercent")}    Speed: ${getVariable("speedPercent")}`
            var valueStr = prompt(varStr + "\n\nValues? (100,3;100,6...)", "");
            if (!valueStr) {
                return;
            }
            var values = valueStr.split(";");
            if (values == null || values.length == 0) {
                return;
            }

            app.beginUndoGroup("Move");
            var interval = loopTime / (values.length + 1);

            for (var j = 0; j < selectedProperties.length; j++) {
                values = valueStr.split(";");
                for (var i = 0; i < values.length; i++) {
                    values[i] = values[i].split(",");
                    for (var k = 0; k < values[i].length; k++) {
                        values[i][k] = parseFloat(values[i][k]);
                    }
                }

                setVariable("lastDir", values[0][1]);
                while (selectedProperties[j].numKeys > 0) {
                    selectedProperties[j].removeKey(1);
                }                

                var currPos = selectedProperties[j].value;
                selectedProperties[j].setValueAtTime(0, currPos);
                for (var i = 0; i < values.length; i++){
                    currPos[0] += values[i][0] * Math.sin(dToR * values[i][1] * 30);
                    currPos[1] -= values[i][0] * Math.cos(dToR * values[i][1] * 30);
                    selectedProperties[j].setValueAtTime((i + 1) * interval, currPos);
                }
                selectedProperties[j].setValueAtTime(loopTime, selectedProperties[j].keyValue(1));
                
                var easeIn = new KeyframeEase(0, 33.333);
                var easeOut = new KeyframeEase(0, 33.333);
                for (var i = 0; i < selectedProperties[j].numKeys; i++) {
                    selectedProperties[j].setTemporalEaseAtKey(i + 1, [easeIn], [easeOut]);
                    selectedProperties[j].setSpatialAutoBezierAtKey(i + 1, true);
                }
                if (selectedProperties[j].expression == '') {
                    selectedProperties[j].expression = 'loopOut(); // ' + valueStr;
                }
            }

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function deepEqual(a1, a2) {
        if (a1.length != a2.length) {
            return false;
        }
        for (var i = 0; i < a1.length; i++){
            if (a1[i] != a2[i]) {
                return false;
            }
        }
        return true;
    }
    
    function parallax() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length == 0) {
                return;
            }

            app.beginUndoGroup("Parallax");
            addParallaxLayer(comp, selectedLayers[0]);

            for (var i = 0; i < selectedLayers.length; i++){
                var slider = selectedLayers[i].property("Effects").addProperty("Slider Control");
                slider.name = "Parallax";
                slider.property("Slider").setValueAtTime(0, 0);
                selectedLayers[i].property("Transform").property("Position").expression = 
                    't = effect("Parallax")("Slider");\r\n'+
                    'p = transform.position;\r\n'+
                    'theta = thisComp.layer("Parallax").effect("X")("Slider");\r\n'+
                    'theta2 = thisComp.layer("Parallax").effect("Y")("Slider");\r\n'+
                    '[p[0] + t * Math.tan(theta / 180 * Math.PI), p[1] + t * Math.tan(theta2 / 180 * Math.PI)]\r\n';
            }
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function addParallaxLayer(comp, controllerLayer) {
        for (var i = 1; i <= comp.layers.length; i++){
            if (comp.layers[i].name == "Parallax") {
                return;
            }
        }
        solidLayer = comp.layers.addSolid([0, 0, 0], "Parallax", controllerLayer.width, controllerLayer.height, 1);
        solidLayer.property("Opacity").setValue(0);
        var xSlider = solidLayer.property("Effects").addProperty("Slider Control");
        xSlider.property("Slider").setValueAtTime(0, 0);
        xSlider.name = "X";
        var ySlider = solidLayer.property("Effects").addProperty("Slider Control");
        ySlider.property("Slider").setValueAtTime(0, 0);
        ySlider.name = "Y";
    }
    
    function joystick() {
        try {
            var selectedProperties = getAllSelectedProperties();
            
            var properties = [];
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].numKeys >= 2) {
                    properties.push(selectedProperties[j]);
                }
            }
            if (properties.length === 0) {
                alert("Select at least one property with 2 keys.")
                return;
            }
            
            var layer = getParentLayer(properties[0]);
            var name = properties[0].parentProperty.name;
            app.beginUndoGroup("Joystick");
            for (var j = 0; j < properties.length; j++){
                var property = properties[j];
                property.expression =
                    't = thisComp.layer("' + layer.name + '").effect("' + name + ' Slider")("Slider");\r\n' +
                    'v1 = thisProperty.key(1).value;\r\n' +
                    'v2 = thisProperty.key(2).value;\r\n' +
                    'v1 + (v2 - v1) * t;'
            }
            
            var slider = layer.property("Effects").addProperty("Slider Control");
            slider.property("Slider").setValueAtTime(0, 0);
            slider.name = name + " Slider";
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function addNoise() {
        var comp = getActiveComp();

        var layer = comp.layers.addSolid([0, 0, 0], "Noise", comp.width, comp.height, 1);
        layer.name = "Noise";
        layer.property("Effects").addProperty("Fractal Noise");
        loopEvo();
    }

    function scale() {
        try {
            var selectedProperties = getAllSelectedProperties();
            if (selectedProperties.length == 0) {
                return;
            }

            app.beginUndoGroup("Scale");
            var scaleValue = parseFloat(prompt("Scale how much?", ""));
            if (isNaN(scaleValue)) {
                return;
            }

            for (var i = 0; i < selectedProperties.length; i++){
                if (selectedProperties[i].numKeys == 0 || !selectedProperties[i].numKeys) {
                    continue;
                }
                if (selectedProperties[i].numKeys == 1) {
                    var value = selectedProperties[i].keyValue(1);
                    if (value.toString().indexOf(",") != -1) {
                        for (var j = 0; j < value.length; j++) {
                            value[j] *= scaleValue;
                        }
                    } else {
                        value *= scaleValue;
                    }
                    selectedProperties[i].setValueAtKey(1, value);
                    continue;
                }

                var values = [];
                var isArray =  selectedProperties[i].keyValue(1).toString().indexOf(",") != -1
                for (var j = 1; j <= selectedProperties[i].numKeys; j++){
                    var value = selectedProperties[i].keyValue(j);
                    values.push(isArray ? value : [value]);
                }

                var avg = [];
                var count = 0;
                for (var k = 0; k < values[0].length; k++){
                    avg[k] = 0;
                }
                for (var j = 0; j < values.length; j++){
                    if (j == values.length - 1 && deepEqual(values[j], values[0])) {
                        continue;
                    }
                    for (var k = 0; k < values[0].length; k++){
                        avg[k] += values[j][k]
                    }
                    count++;
                }
                for (var k = 0; k < values[0].length; k++){
                    avg[k] /= count;
                }
                
                for (var j = 1; j <= selectedProperties[i].numKeys; j++){
                    var value = values[j - 1];
                    for (var k = 0; k < value.length; k++){
                        value[k] = avg[k] + (value[k] - avg[k]) * scaleValue;
                    }
                    selectedProperties[i].setValueAtKey(j, isArray ? value : value[0]);
                }
            }
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function copyFL() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length == 0) {
                return;
            }
            var selectedProperties = getSelectedProperties(selectedLayers[0]);
            
            for (var i = 0; i < selectedProperties.length; i++){
                if (selectedProperties[i].numKeys >= 2) {
                    selectedProperties[i].setValueAtKey(selectedProperties[i].numKeys, selectedProperties[i].keyValue(1));
                }
            }
        } catch(err) {
            alert(err);
        }
    }

    function loopEvo() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length == 0) {
                return;
            }
            var evoProperty = findProperty(selectedLayers[0], "Evolution");
            var cycleProperty = findProperty(selectedLayers[0], "Cycle Evolution");
            var revoProperty = findProperty(selectedLayers[0], "Cycle (in Revolutions)");

            if (evoProperty == null || cycleProperty == null || revoProperty == null) {
                alert("Cannot find evolution properties");
                return;
            }
            
            var loopTime = parseFloat(getVariable("loopLength"));
            if (isNaN(loopTime)) {
                return;
            }
            var revolutions = parseInt(prompt("Revolutions?", ""));
            if (isNaN(revolutions)) {
                return;
            }

            app.beginUndoGroup("LoopEvo");
            evoProperty.setValueAtTime(0, 0);
            evoProperty.setValueAtTime(loopTime, 360 * revolutions);
            evoProperty.expression = 'loopOut();';
            cycleProperty.setValue(1);
            revoProperty.setValue(revolutions);
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function loopComp() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length != 1) {
                alert("Select one layer only")
                return;
            }

            var startTime = parseFloat(prompt("Start?", ""));
            if (isNaN(startTime)) {
                return;
            }
            var endTime = parseFloat(prompt("End?", ""));
            if (isNaN(endTime)) {
                return;
            }
            
            var oldLayer = selectedLayers[0];
            var newLayer = oldLayer.duplicate();
            oldLayer.property("Opacity").setValueAtTime(startTime - 1, 0);
            oldLayer.property("Opacity").setValueAtTime(startTime, 100);
            oldLayer.property("Opacity").setValueAtTime(endTime - 1, 100);
            oldLayer.property("Opacity").setValueAtTime(endTime, 0);
            newLayer.property("Opacity").setValueAtTime(startTime - 1, 0);
            newLayer.property("Opacity").setValueAtTime(startTime, 100);
            newLayer.startTime = endTime - startTime;
            newLayer.name = newLayer.name + " Loop";

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function clearExp() {
        try {
            var selectedProperties = getAllSelectedProperties()
            if (selectedProperties.length == 0) {
                return;
            }

            for (var i = 0; i < selectedProperties.length; i++){
                var prop = selectedProperties[i];
                if (prop.canSetExpression) {
                    prop.expression = '';
                }
            }
        } catch(err) {
            alert(err);
        }
    }

    function createRef() {
        try {
            app.beginUndoGroup("Create Ref");
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length == 0) {
                return;
            }
            
            var selectedLayer = selectedLayers[0];
            var selectedProperties = getSelectedProperties(selectedLayer);
            var puppetPins = [];
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    puppetPins.push(selectedProperties[j]);
                }
            }

            for (var i = 0; i < puppetPins.length; i++){
                var pos = puppetPins[i].property("Position");
                var refName = selectedLayer.name + " - " + puppetPins[i].name + " Ref";
                var solidLayer = comp.layers.addSolid([0, 0, 0], refName, selectedLayer.width, selectedLayer.height, 1);
                solidLayer.property("Opacity").setValue(0);
                solidLayer.property("Position").setValue(pos.value);
                solidLayer.property("Anchor Point").setValue(pos.value);
                solidLayer.parent = selectedLayer.parent;
                solidLayer.moveBefore(selectedLayer);
                pos.expression = 'loopOut() + thisComp.layer("' + refName + '").transform.position - [' + pos.value[0] + ', ' + pos.value[1] + '];';
            }

            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function anchor() {
        try {
            app.beginUndoGroup("Anchor");
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length == 0) {
                return;
            }
            
            var selectedLayer = selectedLayers[0];
            var selectedProperties = getSelectedProperties(selectedLayer);
            var puppetPins = [];
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    puppetPins.push(selectedProperties[j]);
                }
            }

            if (confirm("Movable anchor?")) {
                for (var i = 0; i < puppetPins.length; i++){
                    var pos = puppetPins[i].property("Position");
                    var layerName = puppetPins[i].name;
                    var solidLayer = comp.layers.addSolid([0, 0, 0], layerName + " Anchor", selectedLayer.width, selectedLayer.height, 1);
                    solidLayer.property("Opacity").setValue(0);
                    solidLayer.property("Position").setValue(pos.value);
                    solidLayer.property("Anchor Point").setValue(pos.value);
                    solidLayer.moveBefore(selectedLayer);
                    pos.expression = 'L = thisComp.layer("' + layerName + ' Anchor")\r\n' +
                        'fromComp(L.transform.position)\r\n';
                }
            }
            else 
            {
                for (var i = 0; i < puppetPins.length; i++){
                    var pos = puppetPins[i].property("Position");
                    pos.expression = 'fromComp([' + pos.value[0] + ', ' + pos.value[1] + ']);';
                }
            }
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function stagger(responses, props) {
        try {
            if (props.length == 0) {
                var comp = getActiveComp();
                var selectedLayers = getSelectedLayers(comp);
                
                for (var i = 0; i < selectedLayers.length; i++){
                    var selectedProperties = getSelectedProperties(selectedLayers[i]);
                    for (var j = 0; j < selectedProperties.length; j++){
                        if (selectedProperties[j].canSetExpression && selectedProperties[j].numKeys >= 2) {
                            props.push(selectedProperties[j]);
                        }
                    }
                }
            }

            if (props.length == 0) {
                alert('Expected at least one selected property');
                return;
            }
            
            /*
            if (!confirm("Is " + props[0].parentProperty.name + " - " + props[0].name + " the first?")) {
                props = props.reverse();
            }
            */
            props = props.reverse();

            var offsetValue = parseInt(promptWithAdd(responses, "Offset how many frames?", ""));
            if (isNaN(offsetValue)) {
                return;
            }
            offsetValue *= 1 / 30;
            
            app.beginUndoGroup("Stagger");
            delay = 0;
            for (var i = 0; i < props.length; i++){
                var keys = [];
                for (var j = 1; j <= props[i].numKeys; j++) {
                    keys.push([props[i].keyTime(j), props[i].keyValue(j)]);
                }
                var firstOffset = props[i].keyTime(1);
                while (props[i].numKeys > 0) {
                    props[i].removeKey(1);
                }
                for (var j = 0; j < keys.length; j++) {
                    var easeIn = new KeyframeEase(0, 33.333);
                    var easeOut = new KeyframeEase(0, 33.333);
                    props[i].setValueAtTime(keys[j][0] - firstOffset + delay, keys[j][1]);
                    props[i].setTemporalEaseAtKey(j + 1, [easeIn], [easeOut]);
                    if (props[i].isSpatial) {
                        props[i].setSpatialAutoBezierAtKey(j + 1, true);
                    }
                }
                delay += offsetValue;
            }
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function swing(rotateAroundPoint, offsetDeg, swingToward, ppAnchor) {
        try {
            var responses = [];
            var dToR = 0.0174533;
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            
            if (selectedLayers.length != 1) {
                alert('Expected one selected layer');
                return;
            }
            
            var selectedProperties = getSelectedProperties(selectedLayers[0]);
            var puppetPins = [];
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    puppetPins.push(selectedProperties[j]);
                }
            }

            if (puppetPins.length == 0) {
                alert('Expected at least one puppet pin');
                return;
            }
            puppetPins = puppetPins.reverse();
            
            var loopTime = parseFloat(getVariable("loopLength"));
            if (isNaN(loopTime)) {
                return;
            }

            var varStr = `Loop length: ${loopTime}\n\n`
            var deg = [];
            if (offsetDeg) {
                deg[0] = parseFloat(promptWithAdd(responses, varStr + "Degree start?", ""));
                if (isNaN(deg[0])) {
                    return;
                }
                deg[0] *= dToR;
                deg[1] = parseFloat(promptWithAdd(responses, "Degree end?", ""));
                if (isNaN(deg[1])) {
                    return;
                }
                deg[1] *= dToR;
            }
            else {
                deg[0] = parseFloat(promptWithAdd(responses, varStr + "Rotate how many degrees?", ""));
                if (isNaN(deg[0])) {
                    return;
                }
                deg[0] *= dToR;
                deg[1] = -deg[0]
            }

            var decay = 1;
            var degPerPoint = 0;
            if (rotateAroundPoint) {
                /*
                decay = parseFloat(promptWithAdd(responses, "Decay?", ""));
                if (!decay) {
                    return;
                }
                */

                degPerPoint = parseFloat(promptWithAdd(responses, "Rotate how many degrees per point?", ""));
                if (isNaN(degPerPoint)) {
                    return;
                }
                degPerPoint *= dToR;
            }

            var props = [];
            var anchors = [
                [selectedLayers[0].property("Position").value],
                [selectedLayers[0].property("Position").value]
            ];
            if (ppAnchor) {
                anchors = [
                    [puppetPins[0].property("Position").value],
                    [puppetPins[0].property("Position").value]
                ];
                puppetPins.shift();
            }
            app.beginUndoGroup("Swing");
            for (var i = 0; i < puppetPins.length; i++){
                while (puppetPins[i].property("Position").numKeys > 0) {
                    puppetPins[i].property("Position").removeKey(1);
                }

                var pPos = puppetPins[i].property("Position").value;
                var ncPos = [
                    pPos,
                    pPos
                ];

                for (var k = 0; k < ncPos.length; k++) {
                    ncPos[k] = rotateAround(ncPos[k], anchors[k][0], deg[k]);
                    
                    if (rotateAroundPoint) {
                        for (var j = 0; j < anchors[k].length; j++) {
                            ncPos[k] = rotateAround(ncPos[k], anchors[k][j], k == 0 ? degPerPoint : -degPerPoint);
                        }
                    }
                    
                    if (swingToward) {
                        ncPos[k] = rotateAround(ncPos[k], pPos, Math.PI / 2);
                    }

                    anchors[k].push(ncPos[k]);
                }


                puppetPins[i].property("Position").setValueAtTime(loopTime * 0, ncPos[0]);
                puppetPins[i].property("Position").setValueAtTime(loopTime * 0.5, ncPos[1]);
                puppetPins[i].property("Position").setValueAtTime(loopTime * 1, ncPos[0]);
                props.push(puppetPins[i].property("Position"));
            }
            app.endUndoGroup();
            stagger(responses, props.reverse());
            loopOut(responses);
        } catch(err) {
            alert(err);
        }
    }

    function rotateAround(pPos, aPos, deg) {
        var cPos = [pPos[0] - aPos[0], pPos[1] - aPos[1]];
        var rPos = [Math.sqrt(cPos[0] * cPos[0] + cPos[1] * cPos[1]), Math.atan2(cPos[1], cPos[0])];
        var nPos = [rPos[0], rPos[1] + deg];
        var ncPos = [nPos[0] * Math.cos(nPos[1]) + aPos[0], nPos[0] * Math.sin(nPos[1]) + aPos[1]];
        return ncPos;
    }

    function getPuppetPoints(prop, points) {
        if (prop.matchName == "ADBE FreePin3 PosPin Atom") {
            points.push(prop);
        }
        if (prop.propertyType != PropertyType.PROPERTY) {
            for (var i = 1; i <= prop.numProperties; i++){
                getPuppetPoints(prop.property(i), points);
            }
        }
    }

    function distBetween(pos1, pos2) {
        return (pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) + (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]); 
    }

    function stitch() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var childLayer = null;
            var parentLayer = null;
            
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

            app.beginUndoGroup("Stitch");
            var childPoints = [];
            var parentPoints = [];
            var threshold = 100;
            getPuppetPoints(childLayer, childPoints);
            getPuppetPoints(parentLayer, parentPoints);
            for (var i = 0; i < childPoints.length; i++){
                var parentPoint = null;
                var closest = threshold;
                for (var j = 0; j < parentPoints.length; j++){
                    var d = distBetween(childPoints[i].property("Position").value, parentPoints[j].property("Position").value);
                    if (d < closest) {
                        parentPoint = parentPoints[j];
                        closest = d;
                    }
                }
                if (parentPoint != null) {
                    childPoints[i].property("Position").expression = 'thisComp.layer("' + parentLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoint.name + '").position';
                }
            }
            childLayer.parent = parentLayer;
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function isParent(name) {
        return !isChild(name);
    }

    function isChild(name) {
        return name.indexOf('Puppet Pin') == 0 || name[0] == '-';
    }

    function joint() {
        ik();
    }

    function intersect(x1, y1, r1, x2, y2, r2) {
        var centerdx = x1 - x2;
        var centerdy = y1 - y2;
        var R2 = centerdx * centerdx + centerdy * centerdy;
        var R4 = R2*R2;
        var a = (r1*r1 - r2*r2) / (2 * R2);
        var r2r2 = (r1*r1 - r2*r2);
        var c = Math.sqrt(2 * (r1*r1 + r2*r2) / R2 - (r2r2 * r2r2) / R4 - 1);
        var fx = (x1+x2) / 2 + a * (x2 - x1);
        var gx = c * (y2 - y1) / 2;
        var ix1 = fx + gx;
        var ix2 = fx - gx;
        var fy = (y1+y2) / 2 + a * (y2 - y1);
        var gy = c * (x1 - x2) / 2;
        var iy1 = fy + gy;
        var iy2 = fy - gy;
        return [[ix1, iy1], [ix2, iy2]];
    }


    function ik() {
        try {
            var intersectMin = "function intersect(r,t,e,n,c,i){var s=r-n,a=t-c,o=s*s+a*a,u=o*o,f=(e*e-i*i)/(2*o),h=e*e-i*i,l=Math.sqrt(2*(e*e+i*i)/o-h*h/u-1),q=(r+n)/2+f*(n-r),v=l*(c-t)/2,w=(t+c)/2+f*(c-t),C=l*(r-n)/2;return[[q+v,w+C],[q-v,w-C]]}";
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var puppetPoints = [];

            for (var i = 0; i < selectedLayers.length; i++){
                var selectedProperties = getSelectedProperties(selectedLayers[i]);
                for (var j = 0; j < selectedProperties.length; j++){
                    if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                        puppetPoints.push(selectedProperties[j]);
                    }
                }
            }

            if (puppetPoints.length == 3) {
                ik3();
                return;
            }

            if (puppetPoints.length != 4) {
                alert('Expected only four selected puppet points');
                return;
            }

            var selectIndex = puppetPoints.length - 1;
            for (var i = 0; i < puppetPoints.length - 1; i++) {
                if (confirm("Is " + puppetPoints[i].name + " the inner joint?")) {
                    selectIndex = i;
                    break;
                }
            }
            var innerJointPoint = puppetPoints[selectIndex];
            puppetPoints.splice(selectIndex, 1);
            for (var i = 0; i < puppetPoints.length - 1; i++) {
                if (confirm("Is " + puppetPoints[i].name + " the joint?")) {
                    selectIndex = i;
                    break;
                }
            }
            var jointPoint = puppetPoints[selectIndex];
            puppetPoints.splice(selectIndex, 1);
            var controllerPoint = puppetPoints[0];
            var anchorPoint = puppetPoints[1];
            if (confirm("Is " + puppetPoints[0].name + " the anchor?")) {
                anchorPoint = puppetPoints[0];
                controllerPoint = puppetPoints[1];
            }

            app.beginUndoGroup("IK");
            var controllerLayer = getParentLayer(controllerPoint);
            var jointLayer =  getParentLayer(jointPoint);
            var anchorLayer = getParentLayer(anchorPoint);

            if (controllerLayer.name !== anchorLayer.name) {
                controllerLayer.property("Transform").property("Position").expression = 'thisComp.layer("' + anchorLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + jointPoint.name + '").position';
                controllerLayer.property("Transform").property("Anchor Point").setValue(jointPoint.property("Position").value);
                controllerLayer.parent = jointLayer;
            }

            var anchorPos = anchorPoint.property("Position").value;
            var controllerPos = controllerPoint.property("Position").value;
            var jointPos = jointPoint.property("Position").value;
            var innerJointPos = innerJointPoint.property("Position").value;

            var r1 = Math.sqrt(distBetween(anchorPos, jointPos));
            var r2 = Math.sqrt(distBetween(controllerPos, jointPos));
            var intersections = intersect(anchorPos[0], anchorPos[1], r1, controllerPos[0], controllerPos[1], r2);
            var intersectionIndex = (distBetween(intersections[0], jointPos) < distBetween(intersections[1], jointPos)) ? 0 : 1;

            var anchorRef = 'thisComp.layer("' + anchorLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + anchorPoint.name + '").position';
            if (controllerLayer.name === anchorLayer.name) {
                var controllerRef = 'thisComp.layer("' + getParentLayer(controllerPoint).name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + controllerPoint.name + '").position';
                jointPoint.property("Position").expression = 
                    intersectMin + '\r\n' +
                    'intersect(' + anchorRef + '[0], ' + anchorRef + '[1], ' + r1 + ', ' + controllerRef + '[0], ' + controllerRef + '[1], ' + r2 + ')[' + intersectionIndex + '];';
            } else {
                var solidLayer = comp.layers.addSolid([0, 0, 0], controllerLayer.name + " Controller", controllerLayer.width, controllerLayer.height, 1);
                solidLayer.property("Opacity").setValue(0);
                solidLayer.property("Scale").setValue(controllerLayer.property("Scale").value);
                solidLayer.property("Rotation").setValue(controllerLayer.property("Rotation").value);
                solidLayer.property("Position").setValue(controllerPoint.property("Position").value);
                solidLayer.property("Anchor Point").setValue(controllerPoint.property("Position").value);
                solidLayer.moveBefore(jointLayer);
                solidLayer.parent = jointLayer;
                var controllerRef = 'thisComp.layer("' + solidLayer.name + '").transform.position';

                jointPoint.property("Position").expression = 
                    intersectMin + '\r\n' +
                    'intersect(' + anchorRef + '[0], ' + anchorRef + '[1], ' + r1 + ', ' + controllerRef + '[0], ' + controllerRef + '[1], ' + r2 + ')[' + intersectionIndex + ']';
                controllerPoint.property("Position").expression =
                    'L = thisComp.layer("' + solidLayer.name + '");\r\n' + 
                    'fromComp(L.toComp(thisComp.layer("' + solidLayer.name + '").transform.anchorPoint))';

                var controllerPoints = [];
                getPuppetPoints(controllerLayer, controllerPoints);
                var closestPoint = null;
                var dist = 100;
                for (var i = 0; i < controllerPoints.length; i++){
                    var d = distBetween(controllerPoints[i].property("Position").value, innerJointPos);
                    if (d < dist) {
                        closestPoint = controllerPoints[i];
                        closest = d;
                    }
                }
                if (closestPoint != null) {
                    closestPoint.property("Position").expression = 'L = thisComp.layer("' + jointLayer.name + '");\r\n' +
                                                                   'fromComp(L.toComp(L.effect("Puppet").arap.mesh("Mesh 1").deform("' + innerJointPoint.name + '").position))';
                }
            }
            innerJointPoint.property("Position").expression = 'p = effect("Puppet").arap.mesh("Mesh 1").deform("' + jointPoint.name + '").position;\r\n' +
                'p2 = effect("Puppet").arap.mesh("Mesh 1").deform("' + innerJointPoint.name + '").position;\r\n' +  
                'p + p2 - [' + jointPos[0] + ', ' + jointPos[1] + ']';
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function ik3() {
        try {
            var intersectMin = "function intersect(r,t,e,n,c,i){var s=r-n,a=t-c,o=s*s+a*a,u=o*o,f=(e*e-i*i)/(2*o),h=e*e-i*i,l=Math.sqrt(2*(e*e+i*i)/o-h*h/u-1),q=(r+n)/2+f*(n-r),v=l*(c-t)/2,w=(t+c)/2+f*(c-t),C=l*(r-n)/2;return[[q+v,w+C],[q-v,w-C]]}";
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var puppetPoints = [];

            for (var i = 0; i < selectedLayers.length; i++){
                var selectedProperties = getSelectedProperties(selectedLayers[i]);
                for (var j = 0; j < selectedProperties.length; j++){
                    if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                        puppetPoints.push(selectedProperties[j]);
                    }
                }
            }

            if (puppetPoints.length != 3) {
                alert('Expected only three selected puppet points');
                return;
            }

            var selectIndex = puppetPoints.length - 1;
            for (var i = 0; i < puppetPoints.length - 1; i++) {
                if (confirm("Is " + puppetPoints[i].name + " the joint?")) {
                    selectIndex = i;
                    break;
                }
            }
            var jointPoint = puppetPoints[i];
            puppetPoints.splice(selectIndex, 1);
            var anchorPoint = puppetPoints[1];
            var controllerPoint = puppetPoints[0];
            if (confirm("Is " + puppetPoints[0].name + " the anchor?")) {
                anchorPoint = puppetPoints[0];
                controllerPoint = puppetPoints[1];
            }

            app.beginUndoGroup("IK");
            var controllerLayer = getParentLayer(controllerPoint);
            var jointLayer =  getParentLayer(jointPoint);
            var anchorLayer = getParentLayer(anchorPoint);
            
            if (controllerLayer.name !== anchorLayer.name) {
                controllerLayer.property("Transform").property("Position").expression = 'thisComp.layer("' + anchorLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + jointPoint.name + '").position';
                controllerLayer.property("Transform").property("Anchor Point").setValue(jointPoint.property("Position").value);
                controllerLayer.parent = jointLayer;
            }

            var anchorPos = anchorPoint.property("Position").value;
            var controllerPos = controllerPoint.property("Position").value;
            var jointPos = jointPoint.property("Position").value;
            var r1 = Math.sqrt(distBetween(anchorPos, jointPos));
            var r2 = Math.sqrt(distBetween(controllerPos, jointPos));
            var intersections = intersect(anchorPos[0], anchorPos[1], r1, controllerPos[0], controllerPos[1], r2);
            var intersectionIndex = (distBetween(intersections[0], jointPos) < distBetween(intersections[1], jointPos)) ? 0 : 1;

            var anchorRef = 'thisComp.layer("' + anchorLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + anchorPoint.name + '").position';
            if (controllerLayer.name === anchorLayer.name) {
                var controllerRef = 'thisComp.layer("' + getParentLayer(controllerPoint).name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + controllerPoint.name + '").position';
                jointPoint.property("Position").expression = 
                    intersectMin + '\r\n' +
                    'intersect(' + anchorRef + '[0], ' + anchorRef + '[1], ' + r1 + ', ' + controllerRef + '[0], ' + controllerRef + '[1], ' + r2 + ')[' + intersectionIndex + '];';
            } else {
                var solidLayer = comp.layers.addSolid([0, 0, 0], controllerLayer.name + " Controller", controllerLayer.width, controllerLayer.height, 1);
                solidLayer.property("Opacity").setValue(0);
                solidLayer.property("Scale").setValue(controllerLayer.property("Scale").value);
                solidLayer.property("Rotation").setValue(controllerLayer.property("Rotation").value);
                solidLayer.property("Position").setValue(controllerPoint.property("Position").value);
                solidLayer.property("Anchor Point").setValue(controllerPoint.property("Position").value);
                solidLayer.moveBefore(jointLayer);
                solidLayer.parent = jointLayer;
                var controllerRef = 'thisComp.layer("' + solidLayer.name + '").transform.position';

                jointPoint.property("Position").expression = 
                    intersectMin + '\r\n' +
                    'intersect(' + anchorRef + '[0], ' + anchorRef + '[1], ' + r1 + ', ' + controllerRef + '[0], ' + controllerRef + '[1], ' + r2 + ')[' + intersectionIndex + ']';
                controllerPoint.property("Position").expression =
                    'L = thisComp.layer("' + solidLayer.name + '");\r\n' + 
                    'fromComp(L.toComp(thisComp.layer("' + solidLayer.name + '").transform.anchorPoint))';
            }
            app.endUndoGroup();
        } catch(err) {
            alert(err);
        }
    }

    function getParentLayer(property) {
        var prop = property;
        while (prop.parentProperty != null) {
            prop = prop.parentProperty;
        }
        return prop;
    }

    /*
    function triangle() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var parentPoints = [];
            
            if (selectedLayers.length != 1) {
                alert('Expected only one selected layer');
                return;
            }

            var selectedProperties = getSelectedProperties(selectedLayers[0]);
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    parentPoints.push(selectedProperties[j]);
                }
            }

            if (parentPoints.length != 3) {
                alert('Expected only three selected puppet points');
                return;
            }

            var chlidIndex = parentPoints.length - 1;
            for (var i = 0; i < parentPoints.length - 1; i++) {
                if (confirm("Is " + parentPoints[i].name + " the child?")) {
                    chlidIndex = i;
                    break;
                }
            }
            var childPoint = parentPoints[i];
            parentPoints.splice(chlidIndex, 1);

            var originPos = parentPoints[0].property("Position").value;
            var childPos = childPoint.property("Position").value;
            var parentPos = parentPoints[1].property("Position").value;
            childPos = [childPos[0] - originPos[0], childPos[1] - originPos[1]];
            parentPos = [parentPos[0] - originPos[0], parentPos[1] - originPos[1]];

            childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
            parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];

            childPoint.property("Position").expression = 
                'parentPos = effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[1].name + '").position - effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[0].name + '").position;\r\n' + 
                'childPos = [length(parentPos) * ' + (childPos[0] / parentPos[0]) + ', Math.atan2(parentPos[1], parentPos[0])' + formatNumber(childPos[1] - parentPos[1]) + '];\r\n' +
                '[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[0].name + '").position';

        } catch(err) {
            alert(err);
        }
    }
    */

    function chain() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var allPoints = [];
            
            if (selectedLayers.length != 1) {
                alert('Expected only one selected layer');
                return;
            }

            var selectedProperties = getSelectedProperties(selectedLayers[0]);
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    allPoints.push(selectedProperties[j]);
                }
            }

            var childPoints = [];
            var parentPoints = [];
            for (var i = 0; i < allPoints.length; i++) {
                if (isChild(allPoints[i].name)) {
                    childPoints.push(allPoints[i]);
                } else {
                    parentPoints.push(allPoints[i]);
                }
            }
            alert(parentPoints.length);
            if (parentPoints.length != 2) {
                alert('Expected exactly two parent points');
                return;
            }

            for (var i = 0; i < childPoints.length; i++) {
                var childPoint = childPoints[i];
                var originPos = parentPoints[0].property("Position").value;
                var childPos = childPoint.property("Position").value;
                var parentPos = parentPoints[1].property("Position").value;
                childPos = [childPos[0] - originPos[0], childPos[1] - originPos[1]];
                parentPos = [parentPos[0] - originPos[0], parentPos[1] - originPos[1]];

                childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
                parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];

                childPoint.property("Position").expression = 
                    'parentPos = effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[1].name + '").position - effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[0].name + '").position;\r\n' + 
                    'childPos = [length(parentPos) * ' + (childPos[0] / parentPos[0]) + ', Math.atan2(parentPos[1], parentPos[0])' + formatNumber(childPos[1] - parentPos[1]) + '];\r\n' +
                    '[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoints[0].name + '").position';
            }
        } catch(err) {
            alert(err);
        }
    }

    function bone(isPolar) {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var childPoint = null;
            var parentPoint = null;
            var count = 0;
            
            if (selectedLayers.length != 1) {
                alert('Expected only one selected layer');
                return;
            }

            var selectedProperties = getSelectedProperties(selectedLayers[0]);
            for (var j = 0; j < selectedProperties.length; j++){
                if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                    count++;
                    if (isChild(selectedProperties[j].name)) {
                        if (childPoint == null) {
                            childPoint = selectedProperties[j];
                        } else {
                            parentPoint = selectedProperties[j];
                        }
                    } else {
                        if (parentPoint == null) {
                            parentPoint = selectedProperties[j];
                        } else {
                            childPoint = selectedProperties[j];
                        }
                    }
                }
            }

            if (count != 2) {
                alert('Expected only two selected puppet points');
                return;
            }
            if (childPoint == null || parentPoint == null) {
                alert('Something went wrong');
                return;
            }

            if (isChild(parentPoint.name) || isParent(childPoint.name)) {
                if (!confirm("Is " + parentPoint.name + " the parent?")) {
                    var tempPoint = childPoint;
                    childPoint = parentPoint;
                    parentPoint = tempPoint;
                }
            }

            var childPos = childPoint.property("Position").value;
            var parentPos = parentPoint.property("Position").value;

            if (isPolar) {
                childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
                parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];
                childPoint.property("Position").expression = 'parentPos = effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoint.name + '").position - transform.position;\r\n' + 
                                                             'childPos = [length(parentPos) * ' + (childPos[0] / parentPos[0]) + ', Math.atan2(parentPos[1], parentPos[0])' + formatNumber(childPos[1] - parentPos[1]) + '];\r\n' +
                                                             '[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + transform.position';
            } else {
                childPoint.property("Position").expression = 'p = effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoint.name + '").position;\r\n' +
                                                             'p2 = (effect("Puppet").arap.mesh("Mesh 1").deform("' + childPoint.name + '").position.numKeys > 0 ? loopOut() : ' + 
                                                             'effect("Puppet").arap.mesh("Mesh 1").deform("' + childPoint.name + '").position)\r\n' +
                                                            'p + p2 - [' + parentPos[0] + ', ' + parentPos[1] + ']';
            }
        } catch(err) {
            alert(err);
        }
    }

    function formatNumber(posNumber) {
        return posNumber > 0 ? (" + " + posNumber) : (" - " + Math.abs(posNumber));
    }

    function link() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            var childLayer = null;
            var childPoint = null;
            var parentLayer = null;
            var parentPoint = null;
            var count = 0;
            
            for (var i = 0; i < selectedLayers.length; i++){
                var selectedProperties = getSelectedProperties(selectedLayers[i]);
                for (var j = 0; j < selectedProperties.length; j++){
                    if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                        count++;
                        if (isChild(selectedProperties[j].name)) {
                            if (childPoint == null) {
                                childPoint = selectedProperties[j];
                                childLayer = selectedLayers[i];
                            } else {
                                parentPoint = selectedProperties[j];
                                parentLayer = selectedLayers[i];
                            }
                        } else {
                            if (parentPoint == null) {
                                parentPoint = selectedProperties[j];
                                parentLayer = selectedLayers[i];
                            } else {
                                childPoint = selectedProperties[j];
                                childLayer = selectedLayers[i];
                            }
                        }
                    }
                }
            }

            if (count != 2) {
                alert('Expected only two selected puppet points');
                return;
            }
            if (childLayer == null || childPoint == null || parentLayer == null || parentPoint == null) {
                alert('Something went wrong');
                return;
            }

            if (isChild(parentPoint.name) || isParent(childPoint.name)) {
                if (!confirm("Is " + parentLayer.name + " - " + parentPoint.name + " the parent?")) {
                    var tempPoint = childPoint;
                    var tempLayer = childLayer;
                    childPoint = parentPoint;
                    childLayer = parentLayer;
                    parentPoint = tempPoint;
                    parentLayer = tempLayer;
                }
            }

            var childPosition = childPoint.property("Position").value;
            childPoint.property("Position").expression = 'L = thisComp.layer("' + parentLayer.name + '");\r\n' +
                                                         'fromComp(L.toComp(L.effect("Puppet").arap.mesh("Mesh 1").deform("' + parentPoint.name + '").position)) + ' + 
                                                         '(effect("Puppet").arap.mesh("Mesh 1").deform("' + childPoint.name + '").position.numKeys > 0 ? loopOut() : ' + 
                                                         'effect("Puppet").arap.mesh("Mesh 1").deform("' + childPoint.name + '").position) - [' + childPosition[0] + ', ' + childPosition[1] + ']';
        } catch(err) {
            alert(err);
        }
    }

    function loopOut(responses) {
        app.beginUndoGroup("LoopOut");
        var responseString = responses.toString();
        var comp = getActiveComp();
        var selectedLayers = getSelectedLayers(comp);
        for (var i = 0; i < selectedLayers.length; i++){
            loopAllProperties(selectedLayers[i], responseString);
        }
        app.endUndoGroup();
    }

    function loopAllProperties(prop, responseString){
        if (prop.propertyType == PropertyType.PROPERTY){
            if (prop.canSetExpression && prop.numKeys >= 2 && (!prop.expressionEnabled || responseString)) {
                prop.expression = 'loopOut();' + (responseString ? ' // ' + responseString.toString() : '');
            }
        } else { // must be a group
            for (var i = 1; i <= prop.numProperties; i++){
                loopAllProperties(prop.property(i), responseString);
            }
        }
    }

    function findProperty(prop, name){
        if (prop.propertyType == PropertyType.PROPERTY){
            if (prop.name == name) {
                return prop;
            }
        } else { // must be a group
            for (var i = 1; i <= prop.numProperties; i++){
                var result = findProperty(prop.property(i), name);
                if (result != null) {
                    return result;
                }
            }
        }
        return null;
    }

    function rig() {
        try {
            var comp = getActiveComp();
            var selectedLayers = getSelectedLayers(comp);
            if (selectedLayers.length < 2) {
                alert("Expected at least 2 layers selected");
                return;
            }
            
            var targetLayers = [];
            var puppetLayer = null;
            var puppetProp = null;

            for (var i = 0; i < selectedLayers.length; i++){
                var selectedProperties = getSelectedProperties(selectedLayers[i]);
                var isPuppet = false;
                for (var j = 0; j < selectedProperties.length; j++){
                    if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
                        if (puppetLayer != null) {
                            alert("Expected only one puppet layer");
                            return;
                        }
                        puppetLayer = selectedLayers[i];
                        puppetProp = selectedProperties[j];
                        isPuppet = true;
                    }
                }
                if (!isPuppet) {
                    targetLayers.push(selectedLayers[i]);
                }
            }

            if (targetLayers.length == 0 || puppetLayer == null || puppetProp == null) {
                alert("Something went wrong");
                return;
            }

            for (var i = 0; i < targetLayers.length; i++) {
                var targetLayer = targetLayers[i];
                targetLayer.property("Transform").property("Position").expression = 'thisComp.layer("' + puppetLayer.name + '").effect("Puppet").arap.mesh("Mesh 1").deform("' + puppetProp.name + '").position';
                targetLayer.property("Transform").property("Anchor Point").setValue(puppetProp.property("Position").value);
                targetLayer.parent = puppetLayer;
            }
        } catch(err) {
            alert(err);
        }
    }

    // Show the Panel
    var w = buildUI(thisObj);
    if (w.toString() == "[object Panel]") {
        w;
    } else {
        w.show();
    }

    /* General functions */
    function promptWithAdd(arr, text, defaultValue) {
        var result = prompt(text, defaultValue);
        arr.push(result);
        return result;
    }

    function getActiveComp(){
        var theComp = app.project.activeItem;
        if (theComp == undefined){
            var errorMsg = localize("$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.");
            alert(errorMsg);
            return null
        }

        return theComp
    }

    function getSelectedLayers(targetComp){
        var targetLayers = targetComp.selectedLayers;
        return targetLayers
    }

    function getAllSelectedProperties() {
        var comp = getActiveComp();
        var selectedLayers = getSelectedLayers(comp);
        var selectedProperties = [];
        for (var i = 0; i < selectedLayers.length; i++){
            selectedProperties = selectedProperties.concat(getSelectedProperties(selectedLayers[i]));
        }
        return selectedProperties;
    }

    function getSelectedProperties(targetLayer){
        return targetLayer.selectedProperties;
    }

    function filterSelectedProperties(selectedProps){
        var props = [];
        for (var i = 0; i < selectedProps.length; i++) {
            if (selectedProps[i].canVaryOverTime) {
                props.push(selectedProps[i]);
            }
        }
        return props;
    }
}

export default utils;
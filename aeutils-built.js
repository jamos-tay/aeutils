var exportedAEUtils = function () {
  'use strict';

  var variables = {};
  var internalVariables = {};
  function getVariable(varName) {
    if (varName in variables) {
      if (variables[varName].type === 'checkbox') {
        return variables[varName].value;
      }
      return variables[varName].text;
    }
    if (varName in internalVariables) {
      return internalVariables[varName];
    }
    return undefined;
  }
  function setVariable(varName, val) {
    variables[varName] = val;
  }
  function setInternalVariable(varName, val) {
    internalVariables[varName] = val;
  }
  function sanitizeName(text) {
    return text.replace(/[^A-Za-z]/g, '');
  }
  function shouldComponentRenderOnNewline(type) {
    return type == "statictext" || type == "variable";
  }
  function buildUI(panel, config, scripts) {
    var windowTitle = localize("$$$/AE/Script/Utils/Utils=AEUtils");
    var win = panel instanceof Panel ? panel : new Window('palette', windowTitle);
    win.spacing = 0;
    win.margins = 4;
    var tpanel = win.add("tabbedpanel");
    for (var tabName in config) {
      var tab = tpanel.add("tab", undefined, tabName);
      tab.alignChildren = "left";
      var rowGroup = tab.add("group");
      rowGroup.alignChildren = "left";
      rowGroup.orientation = "column";
      var tabComponents = config[tabName];
      var rowIndex = 0;
      var currentRow = null;
      var _loop = function _loop() {
        var componentData = tabComponents[i];
        if (!currentRow || shouldComponentRenderOnNewline(componentData.type) || rowIndex % 3 == 0) {
          rowIndex = 0;
          currentRow = rowGroup.add("group");
          currentRow.spacing = 4;
          currentRow.margins = 0;
          currentRow.orientation = "row";
        }
        if (!shouldComponentRenderOnNewline(componentData.type)) {
          rowIndex += 1;
        }
        switch (componentData.type) {
          case "button":
            {
              var text = componentData.text;
              var button = currentRow.add("button", undefined, localize("$$$/AE/Script/Utils/".concat(sanitizeName(text), "=").concat(text)));
              button.helpTip = componentData.tooltip || '';
              button.onClick = function () {
                try {
                  app.beginUndoGroup(componentData.text);
                  scripts[componentData.script]();
                  app.endUndoGroup();
                } catch (ex) {
                  alert("Error: ".concat(ex));
                  app.endUndoGroup();
                }
              };
              break;
            }
          case "statictext":
            {
              currentRow.margins = [0, 8, 0, 0];
              currentRow.add("statictext {text: \"".concat(componentData.text, "\"}"), undefined, "");
              break;
            }
          case "variable":
            {
              currentRow.margins = [10, 0, 0, 0];
              currentRow.add("statictext {text: \"".concat(componentData.text, ": \", characters: 10}"), undefined, "");
              setVariable(componentData.variable, currentRow.add("edittext {text: \"".concat(componentData.value, "\", characters: 5}"), undefined, ""));
              break;
            }
          case "checkbox":
            {
              currentRow.margins = [10, 0, 0, 0];
              var checkbox = currentRow.add('checkbox', undefined, componentData.text);
              checkbox.value = componentData.value;
              setVariable(componentData.variable, checkbox);
              break;
            }
        }
      };
      for (var i = 0; i < tabComponents.length; i++) {
        _loop();
      }
    }
    win.layout.layout(true);
    return win;
  }
  var Rig = [{
    type: "button",
    text: "Loop Out",
    script: "loopOut",
    tooltip: "Sets loopOut() on all selected properties"
  }, {
    type: "button",
    text: "Rig",
    script: "rig",
    tooltip: "Rigs a layer to a puppet pin on another layer. Select a layer and a puppet pin."
  }, {
    type: "button",
    text: "Link",
    script: "link",
    tooltip: "Links a puppet pin (child) to another puppet pin's (parent) absolute position, ignoring all parenting. Select two puppet pins on different layers."
  }, {
    type: "button",
    text: "Pair Pin",
    script: "group",
    tooltip: "Pairs a puppet pin (child) to another puppet pin (parent) so the child pin moves with the parent. Select two puppet pins on the same layer."
  }, {
    type: "button",
    text: "Stagger",
    script: "stagger",
    tooltip: "Staggers the start time of animated properties so their first keyframe starts at 0, n, 2n, 3n... etc. frames. Select multiple properties with keyframes."
  }, {
    type: "button",
    text: "Anchor",
    script: "anchor",
    tooltip: "Anchors a puppet pin to its current position on the composition so it does not move. Select 1 or more puppet pins."
  }, {
    type: "button",
    text: "Joint",
    script: "joint",
    tooltip: "Sets up inverse kinematics on the selected puppet pins. Select 3 (Anchor, Joint, Controller) or 4 (Anchor, Joint, Inner Joint, Controller) puppet pins. Please see the user guide for more information."
  }, {
    type: "button",
    text: "Move Dir",
    script: "moveDirection",
    tooltip: "Creates a 2 keyframe loop that moves the selected item's position by a fixed amount of pixels, in a fixed direction (0 - 12, like a clock face). Select any Position property (layer Position or puppet pin Position)."
  }, {
    type: "button",
    text: "Move Set",
    script: "moveSet",
    tooltip: "Creates a 2 keyframe loop that animates the selected property's value between two given values (e.g. 10;20). Select any animatable property."
  }, {
    type: "statictext",
    text: "Swing"
  }, {
    type: "button",
    text: "Swing",
    script: "swing",
    tooltip: "Creates a 2 keyframe loop that rotates puppet pins back and forth around the layer's anchor point. The degree specifies how much to move and the stagger specifies the delay between each puppet pin's animation. Select any number of puppet pins on a layer. "
  }, {
    type: "button",
    text: "S. Toward",
    script: "swingToward",
    tooltip: "Same as swing, but the puppet pin moves toward and away from the anchor point instead of rotating around."
  }, {
    type: "button",
    text: "S. Offset",
    script: "swingOffset",
    tooltip: "Same as swing, but you can specify the start and end degrees. E.g. (0 to 12 instead of -6 to 6)."
  }, {
    type: "button",
    text: "S. Rotate",
    script: "swingRotate",
    tooltip: "Same as swing, but each puppet pin will be rotated around the previous puppet pin by a specified amount. Puppet pins are ordered from bottom to top by how they're displayed on the Timeline."
  }, {
    type: "button",
    text: "S. Puppet",
    script: "swingPuppet",
    tooltip: "Same as swing, but the puppet pins will be rotated around the first selected puppet pin (the bottom-most selected one in the Timeline)."
  }];
  var General = [{
    type: "button",
    text: "Scale",
    script: "scale",
    tooltip: "Scales the selected keyframes by a specified amount based on the range of values covered by the keyframes. (e.g. [Rotate between 90 - 110] (scale 2x) => [Rotate between 80 - 120]). Select all keyframes of a property."
  }, {
    type: "button",
    text: "Loop Cmp",
    script: "loopComp",
    tooltip: "Makes the current layer loop between a specified start and end time, adding a crossfade at the end which crossfades to the beginning. Select a layer (preferably a precomp with no keyframes)."
  }, {
    type: "button",
    text: "Loop Evo",
    script: "loopEvo",
    tooltip: "Attempts to loop the effects of some stock After Effects plugins (i.e. sets the Evolution, Cycle Evolution and Cycle (in Revolutions) properties). Select an effect on a layer such as Fractal Noise or Turbulent Displace."
  }, {
    type: "button",
    text: "Clear Exp",
    script: "clearExpression",
    tooltip: "Clears the current expression on the selected properties."
  }, {
    type: "button",
    text: "Add Noise",
    script: "addNoise",
    tooltip: "Adds a looping Fractal Noise layer."
  }, {
    type: "button",
    text: "Slider",
    script: "slider",
    tooltip: "Given a property (or multiple properties) that has 2 keyframes, a start and an end position, links it to a slider control so the property will move from start to end as the slider moves from 0 - 1. Select any number of properties with exactly two keyframes."
  }, {
    type: "button",
    text: "Wiggle",
    script: "wiggle",
    tooltip: "Adds a looping wiggle with the given frequency and amplitude. Select any number of properties."
  }, {
    type: "statictext",
    text: "Experimental"
  }, {
    type: "button",
    text: "Parallax",
    script: "parallax",
    tooltip: "Sets up fake parallax on 2D layers without using a camera. Select any number of layers. Use the X and Y properties on the new layer to control the camera, and the added slider on each layer denotes the distance from the camera. Probably don't use this."
  }, {
    type: "button",
    text: "Chain",
    script: "chain",
    tooltip: "Given two parent puppet pins positioned at two corners of a rectangle, chains all other puppet pins so their X and Y position stays relative to their position in the rectangle. Select any number of puppet pins, the two bottom-most puppet pins in the Timeline will be the parents."
  }, {
    type: "button",
    text: "Skeleton",
    script: "skeleton",
    tooltip: "Links each selected puppet pin's position to a new null object's position. Helpful for stacking position animations. Select any number of puppet pins on a single layer."
  }, {
    type: "button",
    text: "Stitch",
    script: "stitch",
    tooltip: "Stitches two layers together so each child layer's puppet pins are linked (same as Link button) to a puppet pin on the parent layer if they are close enough. Place puppet pins in the same locations on two layers, and select the two layers."
  }, {
    type: "button",
    text: "Round",
    script: "round",
    tooltip: "Attempts to round the corners of a position animation. The roundness is determined by the Round % variable in settings. Select any Position property's keyframes."
  }, {
    type: "button",
    text: "Graph Spd",
    script: "graphSpd",
    tooltip: "Easy ease always causes puppet pins to come to a stop at a keyframe. Bumps up the speed graph keyframes slightly so the puppet pin never has 0 speed. The minimum speed is determined by the Speed % variable in settings. Select any property's keyframes."
  }];
  var Settings = [{
    type: "statictext",
    text: "General"
  }, {
    type: "variable",
    text: "Loop",
    variable: "loopLength",
    value: "4"
  }, {
    type: "statictext",
    text: "Movement"
  }, {
    type: "variable",
    text: "Speed %",
    variable: "speedPercent",
    value: "10"
  }, {
    type: "variable",
    text: "Round %",
    variable: "roundPercent",
    value: "10"
  }, {
    type: "checkbox",
    text: "Flip Handles",
    variable: "flipHandles",
    value: false
  }];
  var config = {
    Rig: Rig,
    General: General,
    Settings: Settings
  };

  // Hacky polyfill for rollup glob plugin
  Object.freeze = function (obj) {
    return obj;
  };
  function getPuppetPoints(prop) {
    var points = [];
    getPuppetPointsRecursive(prop, points);
    return points;
  }
  function getPuppetPointsRecursive(prop, points) {
    if (prop.matchName == "ADBE FreePin3 PosPin Atom") {
      points.push(prop);
    }
    if (prop.propertyType != PropertyType.PROPERTY) {
      for (var i = 1; i <= prop.numProperties; i++) {
        getPuppetPointsRecursive(prop.property(i), points);
      }
    }
  }
  function findProperty(prop, name) {
    if (prop.propertyType == PropertyType.PROPERTY) {
      if (prop.name == name) {
        return prop;
      }
    } else {
      // must be a group
      for (var i = 1; i <= prop.numProperties; i++) {
        var result = findProperty(prop.property(i), name);
        if (result != null) {
          return result;
        }
      }
    }
    return null;
  }
  function promptWithAdd(arr, text, defaultValue) {
    var result = prompt(text, defaultValue);
    arr.push(result);
    return result;
  }
  function getActiveComp() {
    var comp = app.project.activeItem;
    if (comp == undefined) {
      alert('Please select a composition.');
      return null;
    }
    return comp;
  }
  function getSelectedLayers() {
    var comp = getActiveComp();
    var targetLayers = comp.selectedLayers;
    return targetLayers;
  }
  function getSelectedProperties(targetLayer) {
    return targetLayer.selectedProperties;
  }
  function getAllSelectedProperties() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    var selectedProperties = [];
    for (var i = 0; i < selectedLayers.length; i++) {
      selectedProperties = selectedProperties.concat(getSelectedProperties(selectedLayers[i]));
    }
    return selectedProperties;
  }
  function filterPuppetPins(props) {
    var puppetPins = [];
    for (var i = 0; i < props.length; i++) {
      if (props[i].matchName == "ADBE FreePin3 PosPin Atom") {
        puppetPins.push(props[i]);
      }
    }
    return puppetPins;
  }
  function getSelectedPuppetPins(targetLayer) {
    return filterPuppetPins(getSelectedProperties(targetLayer));
  }
  function getAllSelectedPuppetPins() {
    return filterPuppetPins(getAllSelectedProperties());
  }
  function filterAnimatableProperties(selectedProps) {
    var props = [];
    for (var i = 0; i < selectedProps.length; i++) {
      if (selectedProps[i].canVaryOverTime) {
        props.push(selectedProps[i]);
      }
    }
    return props;
  }
  function getParentLayer(property) {
    var prop = property;
    while (prop.parentProperty != null) {
      prop = prop.parentProperty;
    }
    return prop;
  }
  function isParent(name) {
    return !isChild(name);
  }
  function isChild(name) {
    return name.indexOf('Puppet Pin') == 0 || name[0] == '-';
  }
  function loopEvo() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert("Expected one selected layer");
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
    evoProperty.setValueAtTime(0, 0);
    evoProperty.setValueAtTime(loopTime, 360 * revolutions);
    evoProperty.expression = 'loopOut();';
    cycleProperty.setValue(1);
    revoProperty.setValue(revolutions);
  }
  function addNoise() {
    var comp = getActiveComp();
    var layer = comp.layers.addSolid([0, 0, 0], "Noise", comp.width, comp.height, 1);
    layer.name = "Noise";
    layer.property("Effects").addProperty("Fractal Noise");
    loopEvo();
  }
  function anchor() {
    var comp = getActiveComp();
    var puppetPins = getAllSelectedPuppetPins();
    if (confirm("Movable anchor?")) {
      for (var i = 0; i < puppetPins.length; i++) {
        var selectedLayer = getParentLayer(puppetPins[i]);
        var pos = puppetPins[i].property("Position");
        var layerName = puppetPins[i].name;
        var solidLayer = comp.layers.addSolid([0, 0, 0], "".concat(selectedLayer.name, " - ").concat(layerName, " Anchor"), selectedLayer.width, selectedLayer.height, 1);
        solidLayer.property("Opacity").setValue(0);
        solidLayer.property("Position").setValue(pos.value);
        solidLayer.property("Anchor Point").setValue(pos.value);
        solidLayer.moveBefore(getParentLayer(puppetPins[i]));
        pos.expression = "L = thisComp.layer(\"".concat(layerName, " Anchor\")\r\n") + 'fromComp(L.transform.position)\r\n';
      }
    } else {
      for (var _i = 0; _i < puppetPins.length; _i++) {
        var _pos = puppetPins[_i].property("Position");
        _pos.expression = "fromComp([".concat(_pos.value[0], ", ").concat(_pos.value[1], "]);");
      }
    }
  }
  var DEGREES_PER_RADIAN = 0.0174533;
  function distBetween(pos1, pos2) {
    return (pos1[0] - pos2[0]) * (pos1[0] - pos2[0]) + (pos1[1] - pos2[1]) * (pos1[1] - pos2[1]);
  }
  function rotate90(diff, clockwise) {
    return clockwise ? [diff[1], -diff[0]] : [-diff[1], diff[0]];
  }
  function scaleVector(vec, amt) {
    for (var i = 0; i < vec.length; i++) {
      vec[i] *= amt;
    }
    return vec;
  }
  function formatNumber(posNumber) {
    return posNumber > 0 ? " + " + posNumber : " - " + Math.abs(posNumber);
  }
  function bone() {
    boneFn(false);
  }
  function boneFn(isPolar) {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert('Expected only one selected layer');
      return;
    }
    var puppetPins = getSelectedPuppetPins(selectedLayers[0]);
    if (puppetPins.length != 2) {
      alert('Expected only two selected puppet points');
      return;
    }
    var childPoint = null;
    var parentPoint = null;
    if (isChild(puppetPins[0].name)) {
      childPoint = puppetPins[0];
      parentPoint = puppetPins[1];
    } else {
      childPoint = puppetPins[1];
      parentPoint = puppetPins[0];
    }
    if (isChild(parentPoint.name) || isParent(childPoint.name)) {
      if (!confirm("Is ".concat(parentPoint.name, " the parent?"))) {
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
      childPoint.property("Position").expression = "parentPos = effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(parentPoint.name, "\").position - transform.position;\r\n") + "childPos = [length(parentPos) * ".concat(childPos[0] / parentPos[0], ", Math.atan2(parentPos[1], parentPos[0])").concat(formatNumber(childPos[1] - parentPos[1]), "];\r\n") + '[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + transform.position';
    } else {
      childPoint.property("Position").expression = "p = effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(parentPoint.name, "\").position;\r\n") + "p2 = (effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(childPoint.name, "\").position.numKeys > 0 ? loopOut() : ") + "effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(childPoint.name, "\").position)\r\n") + "p + p2 - [".concat(parentPos[0], ",").concat(parentPos[1], "]");
    }
  }
  function chain() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert('Expected only one selected layer');
      return;
    }
    var allPoints = getSelectedPuppetPins(selectedLayers[0]).reverse();
    if (allPoints.length < 3) {
      alert('Expected at least 3 selected puppet pins');
      return;
    }
    var parentPoints = [allPoints[0], allPoints[1]];
    allPoints.splice(0, 2);
    var childPoints = allPoints;
    for (var i = 0; i < childPoints.length; i++) {
      var childPoint = childPoints[i];
      var originPos = parentPoints[0].property("Position").value;
      var childPos = childPoint.property("Position").value;
      var parentPos = parentPoints[1].property("Position").value;
      childPos = [childPos[0] - originPos[0], childPos[1] - originPos[1]];
      parentPos = [parentPos[0] - originPos[0], parentPos[1] - originPos[1]];
      childPos = [Math.sqrt(childPos[0] * childPos[0] + childPos[1] * childPos[1]), Math.atan2(childPos[1], childPos[0])];
      parentPos = [Math.sqrt(parentPos[0] * parentPos[0] + parentPos[1] * parentPos[1]), Math.atan2(parentPos[1], parentPos[0])];
      childPoint.property("Position").expression = "parentPos = effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(parentPoints[1].name, "\").position - effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"").concat(parentPoints[0].name, "\").position;\r\n") + "childPos = [length(parentPos) * ".concat(childPos[0] / parentPos[0], ", Math.atan2(parentPos[1], parentPos[0])").concat(formatNumber(childPos[1] - parentPos[1]), "];\r\n") + "[childPos[0] * Math.cos(childPos[1]), childPos[0] * Math.sin(childPos[1])] + effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(parentPoints[0].name, "\").position");
    }
  }
  function clearExpression() {
    var selectedProperties = getAllSelectedProperties();
    for (var i = 0; i < selectedProperties.length; i++) {
      var prop = selectedProperties[i];
      if (prop.canSetExpression) {
        prop.expression = '';
      }
    }
  }
  function graphSpd() {
    var selectedProperties = filterAnimatableProperties(getAllSelectedProperties());
    if (selectedProperties.length == 0) {
      return;
    }
    var speedPercent = parseFloat(getVariable("speedPercent"));
    if (isNaN(speedPercent)) {
      return;
    }
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
      for (var _i2 = 0; _i2 < selectedProperties[j].numKeys; _i2++) {
        selectedProperties[j].setTemporalEaseAtKey(_i2 + 1, [easeIn], [easeOut]);
      }
    }
  }
  var intersectMin = "function intersect(r,t,e,n,c,i){const s=r-n,a=t-c,o=s*s+a*a,u=o*o,f=(e*e-i*i)/(2*o),h=e*e-i*i,l=Math.sqrt(2*(e*e+i*i)/o-h*h/u-1),q=(r+n)/2+f*(n-r),v=l*(c-t)/2,w=(t+c)/2+f*(c-t),C=l*(r-n)/2;return[[q+v,w+C],[q-v,w-C]]}";
  function selectPointTypeIndex(puppetPoints, pointType, pointName) {
    for (var i = 0; i < puppetPoints.length; i++) {
      if (puppetPoints[i].name == pointName) {
        return i;
      }
    }
    for (var _i3 = 0; _i3 < puppetPoints.length - 1; _i3++) {
      if (confirm("Is ".concat(puppetPoints[_i3].name, " the ").concat(pointType, "?"))) {
        return _i3;
      }
    }
    return puppetPoints.length - 1;
  }
  function joint() {
    var comp = getActiveComp();
    var puppetPoints = getAllSelectedPuppetPins();
    if (puppetPoints.length != 3 && puppetPoints.length != 4) {
      alert('Expected either three or four selected puppet points');
      return;
    }
    var innerJointPoint;
    var selectIndex;
    var hasInnerJoint = puppetPoints.length == 4;
    if (hasInnerJoint) {
      selectIndex = selectPointTypeIndex(puppetPoints, 'inner joint', 'JI');
      innerJointPoint = puppetPoints[selectIndex];
      puppetPoints.splice(selectIndex, 1);
    }
    selectIndex = selectPointTypeIndex(puppetPoints, 'joint', 'J');
    var jointPoint = puppetPoints[selectIndex];
    var jointLayer = getParentLayer(jointPoint);
    puppetPoints.splice(selectIndex, 1);
    selectIndex = selectPointTypeIndex(puppetPoints, 'controller', 'C');
    var controllerPoint = puppetPoints[selectIndex];
    var controllerLayer = getParentLayer(controllerPoint);
    puppetPoints.splice(selectIndex, 1);
    selectIndex = selectPointTypeIndex(puppetPoints, 'anchor', 'A');
    var anchorPoint = puppetPoints[selectIndex];
    var anchorLayer = getParentLayer(anchorPoint);
    if (controllerLayer.name !== anchorLayer.name) {
      controllerLayer.property("Transform").property("Position").expression = "thisComp.layer(\"".concat(anchorLayer.name, "\").effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"").concat(jointPoint.name, "\").position");
      controllerLayer.property("Transform").property("Anchor Point").setValue(jointPoint.property("Position").value);
      controllerLayer.parent = jointLayer;
    }
    var anchorPos = anchorPoint.property("Position").value;
    var controllerPos = controllerPoint.property("Position").value;
    var jointPos = jointPoint.property("Position").value;
    var r1 = Math.sqrt(distBetween(anchorPos, jointPos));
    var r2 = Math.sqrt(distBetween(controllerPos, jointPos));
    var intersections = intersect(anchorPos[0], anchorPos[1], r1, controllerPos[0], controllerPos[1], r2);
    var intersectionIndex = distBetween(intersections[0], jointPos) < distBetween(intersections[1], jointPos) ? 0 : 1;
    var anchorRef = "thisComp.layer(\"".concat(anchorLayer.name, "\").effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"").concat(anchorPoint.name, "\").position");
    if (controllerLayer.name === anchorLayer.name) {
      var controllerRef = "thisComp.layer(\"".concat(getParentLayer(controllerPoint).name, "\").effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"").concat(controllerPoint.name, "\").position");
      jointPoint.property("Position").expression = "".concat(intersectMin, "\r\n") + "intersect(".concat(anchorRef, "[0], ").concat(anchorRef, "[1], ").concat(r1, ", ").concat(controllerRef, "[0], ").concat(controllerRef, "[1], ").concat(r2, ")[").concat(intersectionIndex, "];");
    } else {
      var solidLayer = comp.layers.addSolid([0, 0, 0], "".concat(controllerLayer.name, " Controller"), controllerLayer.width, controllerLayer.height, 1);
      solidLayer.property("Opacity").setValue(0);
      solidLayer.property("Scale").setValue(controllerLayer.property("Scale").value);
      solidLayer.property("Rotation").setValue(controllerLayer.property("Rotation").value);
      solidLayer.property("Position").setValue(controllerPoint.property("Position").value);
      solidLayer.property("Anchor Point").setValue(controllerPoint.property("Position").value);
      solidLayer.moveBefore(jointLayer);
      solidLayer.parent = jointLayer;
      var _controllerRef = "thisComp.layer(\"".concat(solidLayer.name, "\").transform.position");
      jointPoint.property("Position").expression = "".concat(intersectMin, "\r\n") + "intersect(".concat(anchorRef, "[0], ").concat(anchorRef, "[1], ").concat(r1, ", ").concat(_controllerRef, "[0], ").concat(_controllerRef, "[1], ").concat(r2, ")[").concat(intersectionIndex, "]");
      controllerPoint.property("Position").expression = "L = thisComp.layer(\"".concat(solidLayer.name, "\");\r\n") + "fromComp(L.toComp(thisComp.layer(\"".concat(solidLayer.name, "\").transform.anchorPoint))");
      if (hasInnerJoint) {
        var _innerJointPoint;
        var innerJointPos = (_innerJointPoint = innerJointPoint) === null || _innerJointPoint === void 0 ? void 0 : _innerJointPoint.property("Position").value;
        var controllerPoints = getPuppetPoints(controllerLayer);
        var closestPoint = null;
        var closest = 100;
        for (var i = 0; i < controllerPoints.length; i++) {
          var d = distBetween(controllerPoints[i].property("Position").value, innerJointPos);
          if (d < closest) {
            closestPoint = controllerPoints[i];
            closest = d;
          }
        }
        if (closestPoint != null) {
          closestPoint.property("Position").expression = "L = thisComp.layer(\"".concat(jointLayer.name, "\");\r\n") + "fromComp(L.toComp(L.effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(innerJointPoint.name, "\").position))");
        }
      }
    }
    if (hasInnerJoint) {
      innerJointPoint.property("Position").expression = "p = effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(jointPoint.name, "\").position;\r\n") + "p2 = effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(innerJointPoint.name, "\").position;\r\n") + "p + p2 - [".concat(jointPos[0], ", ").concat(jointPos[1], "]");
    }
  }
  function intersect(x1, y1, r1, x2, y2, r2) {
    var centerdx = x1 - x2;
    var centerdy = y1 - y2;
    var R2 = centerdx * centerdx + centerdy * centerdy;
    var R4 = R2 * R2;
    var a = (r1 * r1 - r2 * r2) / (2 * R2);
    var r2r2 = r1 * r1 - r2 * r2;
    var c = Math.sqrt(2 * (r1 * r1 + r2 * r2) / R2 - r2r2 * r2r2 / R4 - 1);
    var fx = (x1 + x2) / 2 + a * (x2 - x1);
    var gx = c * (y2 - y1) / 2;
    var ix1 = fx + gx;
    var ix2 = fx - gx;
    var fy = (y1 + y2) / 2 + a * (y2 - y1);
    var gy = c * (x1 - x2) / 2;
    var iy1 = fy + gy;
    var iy2 = fy - gy;
    return [[ix1, iy1], [ix2, iy2]];
  }
  function link() {
    var puppetPins = getAllSelectedPuppetPins();
    if (puppetPins.length != 2) {
      alert('Expected only two selected puppet points');
      return;
    }
    var childPoint = null;
    var parentPoint = null;
    if (isChild(puppetPins[0].name)) {
      childPoint = puppetPins[0];
      parentPoint = puppetPins[1];
    } else {
      childPoint = puppetPins[1];
      parentPoint = puppetPins[0];
    }
    if (isChild(parentPoint.name) || isParent(childPoint.name)) {
      if (!confirm("Is ".concat(getParentLayer(parentPoint).name, " - ").concat(parentPoint.name, " the parent?"))) {
        var tempPoint = childPoint;
        childPoint = parentPoint;
        parentPoint = tempPoint;
      }
    }
    linkPoints(parentPoint, childPoint);
  }
  function linkPoints(parentPoint, childPoint) {
    var parentLayer = getParentLayer(parentPoint);
    var childPosition = childPoint.property("Position").value;
    childPoint.property("Position").expression = "L = thisComp.layer(\"".concat(parentLayer.name, "\");\r\n") + "fromComp(L.toComp(L.effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(parentPoint.name, "\").position)) + ") + "(effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(childPoint.name, "\").position.numKeys > 0 ? loopOut() : ") + "effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"".concat(childPoint.name, "\").position) - [").concat(childPosition[0], ", ").concat(childPosition[1], "]");
  }
  function loopComp() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert("Expected one selected layer");
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
  }
  function loopOut(responses) {
    var responseString = (responses === null || responses === void 0 ? void 0 : responses.toString()) || '';
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    for (var i = 0; i < selectedLayers.length; i++) {
      loopAllProperties(selectedLayers[i], responseString);
    }
    app.endUndoGroup();
  }
  function loopAllProperties(prop, responseString) {
    if (prop.propertyType == PropertyType.PROPERTY) {
      if (prop.canSetExpression && prop.numKeys >= 2 && (!prop.expressionEnabled || responseString)) {
        prop.expression = 'loopOut();' + (responseString ? ' // ' + responseString.toString() : '');
      }
    } else {
      // must be a group
      for (var i = 1; i <= prop.numProperties; i++) {
        loopAllProperties(prop.property(i), responseString);
      }
    }
  }
  function round() {
    roundFn();
    graphSpd();
  }
  function roundFn() {
    var selectedProperties = filterAnimatableProperties(getAllSelectedProperties());
    if (selectedProperties.length == 0) {
      return;
    }
    var percentage = parseFloat(getVariable("roundPercent"));
    if (isNaN(percentage)) {
      return;
    }
    percentage /= 100;
    var flipHandles = getVariable("flipHandles");
    var lastDir = getVariable("lastDir");
    if (lastDir && lastDir > 6) {
      percentage = -percentage;
    }
    if (flipHandles) {
      percentage = -percentage;
    }
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
          diffVector = scaleVector(diffVector, percentage);
          inTangent = diffVector;
        }
        if (j < selectedProperties[i].numKeys) {
          var nextPoint = selectedProperties[i].keyValue(j + 1);
          var _diffVector = [nextPoint[0] - currPoint[0], nextPoint[1] - currPoint[1]];
          _diffVector = rotate90(_diffVector, true);
          _diffVector = scaleVector(_diffVector, percentage);
          outTangent = _diffVector;
        }
        if (selectedProperties[i].propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
          inTangent.push(0);
          outTangent.push(0);
        }
        selectedProperties[i].setSpatialTangentsAtKey(j, inTangent, outTangent);
      }
    }
  }
  function moveDirection() {
    move();
    round();
    graphSpd();
  }
  function move() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert('Expected only one selected layer');
      return;
    }
    var property = findProperty(selectedLayers[0], "Position");
    if (!property) {
      alert('Select a Position property');
      return;
    }
    var loopTime = parseFloat(getVariable("loopLength"));
    if (isNaN(loopTime)) {
      alert('Invalid loop length');
      return;
    }
    var valueStr = prompt("Distance and direction? e.g. 100,3", "");
    if (!valueStr) {
      return;
    }
    var values = valueStr.split(",");
    if (values.length != 2) {
      return;
    }
    var distance = parseFloat(values[0]);
    var direction = parseFloat(values[1]);
    if (isNaN(distance) || isNaN(direction)) {
      return;
    }
    var interval = loopTime / 2;
    setInternalVariable("lastDir", direction);
    while (property.numKeys > 0) {
      property.removeKey(1);
    }
    var currPos = property.value;
    property.setValueAtTime(0, currPos);
    currPos[0] += distance * Math.sin(DEGREES_PER_RADIAN * direction * 30);
    currPos[1] -= distance * Math.cos(DEGREES_PER_RADIAN * direction * 30);
    property.setValueAtTime(interval, currPos);
    property.setValueAtTime(loopTime, property.keyValue(1));
    var easeIn = new KeyframeEase(0, 33.333);
    var easeOut = new KeyframeEase(0, 33.333);
    for (var i = 1; i <= property.numKeys; i++) {
      property.setTemporalEaseAtKey(i, [easeIn], [easeOut]);
      property.setSpatialAutoBezierAtKey(i, true);
    }
    if (property.expression == '') {
      property.expression = 'loopOut(); // ' + valueStr;
    }
  }
  function moveSet() {
    var selectedProperties = filterAnimatableProperties(getAllSelectedProperties());
    if (selectedProperties.length != 1) {
      alert('Select exactly one animatable property');
      return;
    }
    var property = selectedProperties[0];
    var loopTime = parseFloat(getVariable("loopLength"));
    if (isNaN(loopTime)) {
      return;
    }
    var valueStr = prompt("Values? (10;20;5...)", "");
    if (!valueStr) {
      return;
    }
    var values = valueStr.split(";");
    if (values == null || values.length == 0) {
      return;
    }
    values = valueStr.split(";");
    for (var i = 0; i < values.length; i++) {
      if (values[i].indexOf(",") > -1) {
        values[i] = values[i].split(",");
        for (var k = 0; k < values[i].length; k++) {
          values[i][k] = parseFloat(values[i][k]);
        }
      } else {
        values[i] = parseFloat(values[i]);
      }
    }
    while (property.numKeys > 0) {
      property.removeKey(1);
    }
    var interval = loopTime / values.length;
    for (var _i4 = 0; _i4 < values.length; _i4++) {
      property.setValueAtTime(_i4 * interval, values[_i4]);
    }
    property.setValueAtTime(loopTime, property.keyValue(1));
    var easeIn = new KeyframeEase(0, 33.333);
    var easeOut = new KeyframeEase(0, 33.333);
    for (var _i5 = 0; _i5 < property.numKeys; _i5++) {
      property.setTemporalEaseAtKey(_i5 + 1, [easeIn], [easeOut]);
      if (property.propertyValueType == PropertyValueType.TwoD_SPATIAL || property.propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
        property.setSpatialAutoBezierAtKey(_i5 + 1, true);
      }
    }
    property.expression = 'loopOut(); // ' + valueStr;
  }
  function parallax() {
    var comp = getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length == 0) {
      return;
    }
    addParallaxLayer(comp, selectedLayers[0]);
    for (var i = 0; i < selectedLayers.length; i++) {
      var _slider = selectedLayers[i].property("Effects").addProperty("Slider Control");
      _slider.name = "Parallax";
      _slider.property("Slider").setValueAtTime(0, 0);
      selectedLayers[i].property("Transform").property("Position").expression = 't = effect("Parallax")("Slider");\r\n' + 'p = transform.position;\r\n' + 'theta = thisComp.layer("Parallax").effect("X")("Slider");\r\n' + 'theta2 = thisComp.layer("Parallax").effect("Y")("Slider");\r\n' + '[p[0] + t * Math.tan(theta / 180 * Math.PI), p[1] + t * Math.tan(theta2 / 180 * Math.PI)]\r\n';
    }
  }
  function addParallaxLayer(comp, controllerLayer) {
    for (var i = 1; i <= comp.layers.length; i++) {
      if (comp.layers[i].name == "Parallax") {
        return;
      }
    }
    var solidLayer = comp.layers.addSolid([0, 0, 0], "Parallax", controllerLayer.width, controllerLayer.height, 1);
    solidLayer.property("Opacity").setValue(0);
    var xSlider = solidLayer.property("Effects").addProperty("Slider Control");
    xSlider.property("Slider").setValueAtTime(0, 0);
    xSlider.name = "X";
    var ySlider = solidLayer.property("Effects").addProperty("Slider Control");
    ySlider.property("Slider").setValueAtTime(0, 0);
    ySlider.name = "Y";
  }
  function rig() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length < 2) {
      alert("Expected at least 2 layers selected");
      return;
    }
    var childLayers = [];
    var parentLayer = null;
    var puppetProp = null;
    for (var i = 0; i < selectedLayers.length; i++) {
      var selectedProperties = getSelectedProperties(selectedLayers[i]);
      var isPuppet = false;
      for (var j = 0; j < selectedProperties.length; j++) {
        if (selectedProperties[j].matchName == "ADBE FreePin3 PosPin Atom") {
          if (parentLayer != null) {
            alert("Expected only one puppet layer");
            return;
          }
          parentLayer = selectedLayers[i];
          puppetProp = selectedProperties[j];
          isPuppet = true;
        }
      }
      if (!isPuppet) {
        childLayers.push(selectedLayers[i]);
      }
    }
    if (childLayers.length == 0) {
      alert("No child layer(s) selected");
      return;
    }
    if (parentLayer == null) {
      alert("No parent layer selected");
      return;
    }
    for (var _i6 = 0; _i6 < childLayers.length; _i6++) {
      var targetLayer = childLayers[_i6];
      targetLayer.property("Transform").property("Position").expression = "thisComp.layer(\"".concat(parentLayer.name, "\").effect(\"Puppet\").arap.mesh(\"Mesh 1\").deform(\"").concat(puppetProp.name, "\").position");
      targetLayer.property("Transform").property("Anchor Point").setValue(puppetProp.property("Position").value);
      targetLayer.parent = parentLayer;
    }
  }
  function scale() {
    var selectedProperties = getAllSelectedProperties();
    if (selectedProperties.length == 0) {
      return;
    }
    var scaleValue = parseFloat(prompt("Scale how much?", ""));
    if (isNaN(scaleValue)) {
      return;
    }
    for (var i = 0; i < selectedProperties.length; i++) {
      if (!selectedProperties[i].numKeys || selectedProperties[i].numKeys == 0) {
        continue;
      }
      if (selectedProperties[i].numKeys == 1) {
        var value = selectedProperties[i].keyValue(1);
        if (value.toString().indexOf(",") != -1) {
          value = scaleVector(value, scaleValue);
        } else {
          value *= scaleValue;
        }
        selectedProperties[i].setValueAtKey(1, value);
        continue;
      }
      var values = [];
      var isArray = selectedProperties[i].keyValue(1).toString().indexOf(",") != -1;
      for (var j = 1; j <= selectedProperties[i].numKeys; j++) {
        var _value = selectedProperties[i].keyValue(j);
        values.push(isArray ? _value : [_value]);
      }
      var avg = [];
      var count = 0;
      for (var k = 0; k < values[0].length; k++) {
        avg[k] = 0;
      }
      for (var _j = 0; _j < values.length; _j++) {
        if (_j == values.length - 1 && arrayEqual(values[_j], values[0])) {
          continue;
        }
        for (var _k = 0; _k < values[0].length; _k++) {
          avg[_k] += values[_j][_k];
        }
        count++;
      }
      for (var _k2 = 0; _k2 < values[0].length; _k2++) {
        avg[_k2] /= count;
      }
      for (var _j2 = 1; _j2 <= selectedProperties[i].numKeys; _j2++) {
        var _value2 = values[_j2 - 1];
        for (var _k3 = 0; _k3 < _value2.length; _k3++) {
          _value2[_k3] = avg[_k3] + (_value2[_k3] - avg[_k3]) * scaleValue;
        }
        selectedProperties[i].setValueAtKey(_j2, isArray ? _value2 : _value2[0]);
      }
    }
  }
  function arrayEqual(a1, a2) {
    if (a1.length != a2.length) {
      return false;
    }
    for (var i = 0; i < a1.length; i++) {
      if (a1[i] != a2[i]) {
        return false;
      }
    }
    return true;
  }
  function skeleton() {
    var comp = getActiveComp();
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert("Expected one selected layer");
      return;
    }
    var selectedLayer = selectedLayers[0];
    var puppetPins = getSelectedPuppetPins(selectedLayer);
    for (var i = 0; i < puppetPins.length; i++) {
      var pos = puppetPins[i].property("Position");
      var refName = "".concat(selectedLayer.name, " - ").concat(puppetPins[i].name, " Ref");
      var solidLayer = comp.layers.addSolid([0, 0, 0], refName, selectedLayer.width, selectedLayer.height, 1);
      solidLayer.property("Opacity").setValue(0);
      solidLayer.property("Position").setValue(pos.value);
      solidLayer.property("Anchor Point").setValue(pos.value);
      solidLayer.parent = selectedLayer.parent;
      solidLayer.moveBefore(selectedLayer);
      pos.expression = "loopOut() + thisComp.layer(\"".concat(refName, "\").transform.position - [").concat(pos.value[0], ", ").concat(pos.value[1], "];");
    }
  }
  function slider() {
    var selectedProperties = getAllSelectedProperties();
    var properties = [];
    for (var j = 0; j < selectedProperties.length; j++) {
      if (selectedProperties[j].numKeys >= 2) {
        properties.push(selectedProperties[j]);
      }
    }
    if (properties.length === 0) {
      alert("Select at least one property with 2 keys.");
      return;
    }
    var layer = getParentLayer(properties[0]);
    var name = properties[0].parentProperty.name;
    for (var _j3 = 0; _j3 < properties.length; _j3++) {
      var property = properties[_j3];
      property.expression = "t = thisComp.layer(\"".concat(layer.name, "\").effect(\"").concat(name, " Slider\")(\"Slider\");\r\n") + 'v1 = thisProperty.key(1).value;\r\n' + 'v2 = thisProperty.key(2).value;\r\n' + 'v1 + (v2 - v1) * t;';
    }
    var slider = layer.property("Effects").addProperty("Slider Control");
    slider.property("Slider").setValueAtTime(0, 0);
    slider.name = name + " Slider";
  }
  function stagger(responses, props) {
    responses = responses || [];
    if (!props || props.length == 0) {
      var selectedProperties = getAllSelectedProperties();
      for (var j = 0; j < selectedProperties.length; j++) {
        if (selectedProperties[j].canSetExpression && selectedProperties[j].numKeys >= 2) {
          props.push(selectedProperties[j]);
        }
      }
    }
    if (props.length == 0) {
      alert('Expected at least one selected property');
      return;
    }
    props = props.reverse();
    var offsetValue = parseInt(promptWithAdd(responses, "Offset how many frames?", ""));
    if (isNaN(offsetValue)) {
      return;
    }
    offsetValue *= 1 / 30;
    var delay = 0;
    for (var i = 0; i < props.length; i++) {
      var keys = [];
      for (var _j4 = 1; _j4 <= props[i].numKeys; _j4++) {
        keys.push([props[i].keyTime(_j4), props[i].keyValue(_j4)]);
      }
      var firstOffset = props[i].keyTime(1);
      while (props[i].numKeys > 0) {
        props[i].removeKey(1);
      }
      for (var _j5 = 0; _j5 < keys.length; _j5++) {
        var easeIn = new KeyframeEase(0, 33.333);
        var easeOut = new KeyframeEase(0, 33.333);
        props[i].setValueAtTime(keys[_j5][0] - firstOffset + delay, keys[_j5][1]);
        props[i].setTemporalEaseAtKey(_j5 + 1, [easeIn], [easeOut]);
        if (props[i].isSpatial) {
          props[i].setSpatialAutoBezierAtKey(_j5 + 1, true);
        }
      }
      delay += offsetValue;
    }
  }
  function stitch() {
    getActiveComp();
    var selectedLayers = getSelectedLayers();
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
    var childPoints = getPuppetPoints(childLayer);
    var parentPoints = getPuppetPoints(parentLayer);
    var threshold = 100;
    for (var i = 0; i < childPoints.length; i++) {
      var parentPoint = null;
      var closest = threshold;
      for (var j = 0; j < parentPoints.length; j++) {
        var d = distBetween(childPoints[i].property("Position").value, parentPoints[j].property("Position").value);
        if (d < closest) {
          parentPoint = parentPoints[j];
          closest = d;
        }
      }
      if (parentPoint != null) {
        linkPoints(parentPoint, childPoints[i]);
      }
    }
    childLayer.parent = parentLayer;
  }
  function swing() {
    swingFn('default');
  }
  function swingFn(mode) {
    var responses = [];
    var selectedLayers = getSelectedLayers();
    if (selectedLayers.length != 1) {
      alert('Expected one selected layer');
      return;
    }
    var puppetPins = getSelectedPuppetPins(selectedLayers[0]);
    if (puppetPins.length == 0) {
      alert('Expected at least one puppet pin');
      return;
    }
    puppetPins = puppetPins.reverse();
    var loopTime = parseFloat(getVariable("loopLength"));
    if (isNaN(loopTime)) {
      alert('Invalid loop length');
      return;
    }
    var deg = [];
    if (mode == 'offset') {
      deg[0] = parseFloat(promptWithAdd(responses, "Degree start?", ""));
      if (isNaN(deg[0])) {
        return;
      }
      deg[0] *= DEGREES_PER_RADIAN;
      deg[1] = parseFloat(promptWithAdd(responses, "Degree end?", ""));
      if (isNaN(deg[1])) {
        return;
      }
      deg[1] *= DEGREES_PER_RADIAN;
    } else {
      deg[0] = parseFloat(promptWithAdd(responses, "Rotate how many degrees?", ""));
      if (isNaN(deg[0])) {
        return;
      }
      deg[0] *= DEGREES_PER_RADIAN;
      deg[1] = -deg[0];
    }
    var degPerPoint = 0;
    if (mode == 'rotate') {
      degPerPoint = parseFloat(promptWithAdd(responses, "Rotate how many degrees per point?", ""));
      if (isNaN(degPerPoint)) {
        return;
      }
      degPerPoint *= DEGREES_PER_RADIAN;
    }
    var startAnchors = [selectedLayers[0].property("Position").value];
    var endAnchors = [selectedLayers[0].property("Position").value];
    if (mode == 'puppet') {
      startAnchors = [puppetPins[0].property("Position").value];
      endAnchors = [puppetPins[0].property("Position").value];
      puppetPins.shift();
    }
    var props = [];
    for (var i = 0; i < puppetPins.length; i++) {
      while (puppetPins[i].property("Position").numKeys > 0) {
        puppetPins[i].property("Position").removeKey(1);
      }
      var puppetPos = puppetPins[i].property("Position").value;
      var startPos = puppetPos;
      var endPos = puppetPos;
      startPos = rotateAround(startPos, startAnchors[0], deg[0]);
      endPos = rotateAround(endPos, endAnchors[0], deg[1]);
      if (mode == 'rotate') {
        for (var j = 0; j < startAnchors.length; j++) {
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
    var cPos = [pPos[0] - aPos[0], pPos[1] - aPos[1]];
    var rPos = [Math.sqrt(cPos[0] * cPos[0] + cPos[1] * cPos[1]), Math.atan2(cPos[1], cPos[0])];
    var nPos = [rPos[0], rPos[1] + deg];
    var ncPos = [nPos[0] * Math.cos(nPos[1]) + aPos[0], nPos[0] * Math.sin(nPos[1]) + aPos[1]];
    return ncPos;
  }
  function swingOffset() {
    swingFn('offset');
  }
  function swingPuppet() {
    swingFn('puppet');
  }
  function swingRotate() {
    swingFn('rotate');
  }
  function swingToward() {
    swingFn('toward');
  }
  function wiggle() {
    var selectedProperties = getAllSelectedProperties();
    var loopTime = parseFloat(getVariable("loopLength"));
    if (isNaN(loopTime)) {
      return;
    }
    var freq = parseInt(prompt("Frequency?", ""));
    if (isNaN(freq)) {
      return;
    }
    var amp = parseInt(prompt("Amplitude?", ""));
    if (isNaN(amp)) {
      return;
    }
    for (var i = 0; i < selectedProperties.length; i++) {
      selectedProperties[i].expression = "freq = ".concat(freq, ";\r\n") + "amp = ".concat(amp, ";\r\n") + "loopTime = ".concat(loopTime, ";\r\n") + "t = time % loopTime;\r\n" + "wiggle1 = wiggle(freq, amp, 1, 0.5, t);\r\n" + "wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);\r\n" + "linear(t, 0,  loopTime, wiggle1, wiggle2)";
    }
  }
  var scripts = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addNoise: addNoise,
    anchor: anchor,
    bone: bone,
    chain: chain,
    clearExpression: clearExpression,
    graphSpd: graphSpd,
    joint: joint,
    link: link,
    loopComp: loopComp,
    loopEvo: loopEvo,
    loopOut: loopOut,
    moveDirection: moveDirection,
    moveSet: moveSet,
    parallax: parallax,
    rig: rig,
    round: round,
    scale: scale,
    skeleton: skeleton,
    slider: slider,
    stagger: stagger,
    stitch: stitch,
    swing: swing,
    swingOffset: swingOffset,
    swingPuppet: swingPuppet,
    swingRotate: swingRotate,
    swingToward: swingToward,
    wiggle: wiggle,
    linkPoints: linkPoints,
    swingFn: swingFn
  });
  function aeutils(panel) {
    var w = buildUI(panel, config, scripts);
    if (w.toString() == "[object Panel]") ;else {
      w.show();
    }
  }
  return aeutils;
}();
exportedAEUtils(this);
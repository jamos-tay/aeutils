// Hacky polyfill for rollup glob plugin
Object.freeze = function (obj) {
    return obj;
};


export function getPuppetPoints(prop) {
    const points = [];
    getPuppetPointsRecursive(prop, points);
    return points;
}

function getPuppetPointsRecursive(prop, points) {
    if (prop.matchName == "ADBE FreePin3 PosPin Atom") {
        points.push(prop);
    }
    if (prop.propertyType != PropertyType.PROPERTY) {
        for (let i = 1; i <= prop.numProperties; i++) {
            getPuppetPointsRecursive(prop.property(i), points);
        }
    }
}

export function findProperty(prop, name) {
    if (prop.propertyType == PropertyType.PROPERTY) {
        if (prop.name == name) {
            return prop;
        }
    } else { // must be a group
        for (let i = 1; i <= prop.numProperties; i++) {
            const result = findProperty(prop.property(i), name);
            if (result != null) {
                return result;
            }
        }
    }
    return null;
}

export function promptWithAdd(arr, text, defaultValue) {
    const result = prompt(text, defaultValue);
    arr.push(result);
    return result;
}

export function getActiveComp() {
    const comp = app.project.activeItem;
    if (comp == undefined) {
        alert('Please select a composition.');
        return null;
    }

    return comp;
}

export function getSelectedLayers() {
    const comp = getActiveComp();
    const targetLayers = comp.selectedLayers;
    return targetLayers
}

export function getSelectedProperties(targetLayer) {
    return targetLayer.selectedProperties;
}

export function getAllSelectedProperties() {
    const comp = getActiveComp();
    const selectedLayers = getSelectedLayers(comp);
    let selectedProperties = [];
    for (let i = 0; i < selectedLayers.length; i++) {
        selectedProperties = selectedProperties.concat(getSelectedProperties(selectedLayers[i]));
    }
    return selectedProperties;
}

function filterPuppetPins(props) {
    const puppetPins = [];
    for (let i = 0; i < props.length; i++){
        if (props[i].matchName == "ADBE FreePin3 PosPin Atom") {
            puppetPins.push(props[i]);
        }
    }
    return puppetPins;
}

export function getSelectedPuppetPins(targetLayer) {
    return filterPuppetPins(getSelectedProperties(targetLayer));
}

export function getAllSelectedPuppetPins() {
    return filterPuppetPins(getAllSelectedProperties());
}

export function filterAnimatableProperties(selectedProps) {
    const props = [];
    for (let i = 0; i < selectedProps.length; i++) {
        if (selectedProps[i].canVaryOverTime) {
            props.push(selectedProps[i]);
        }
    }
    return props;
}

export function getParentLayer(property) {
    let prop = property;
    while (prop.parentProperty != null) {
        prop = prop.parentProperty;
    }
    return prop;
}

export function isParent(name) {
    return !isChild(name);
}

export function isChild(name) {
    return name.indexOf('Puppet Pin') == 0 || name[0] == '-';
}
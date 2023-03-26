
const variables = {};
const internalVariables = {};

export function getVariable(varName) {
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

export function setVariable(varName, val) {
    variables[varName] = val;
}

export function setInternalVariable(varName, val) {
    internalVariables[varName] = val;
}

import * as variableUtils from './utils/variableUtils'

function sanitizeName(text) {
    return text.replace(/[^A-Za-z]/g, '');
}

function shouldComponentRenderOnNewline(type) {
    return type == "statictext" || type == "variable";
}

function buildUI(panel, config, scripts) {
    const windowTitle = localize("$$$/AE/Script/Utils/Utils=AEUtils");

    const win = (panel instanceof Panel) ? panel : new Window('palette', windowTitle);
    win.spacing = 0;
    win.margins = 4;

    const tpanel = win.add("tabbedpanel");

    for (const tabName in config) {
        const tab = tpanel.add("tab", undefined, tabName);
        tab.alignChildren = "left";
        const rowGroup = tab.add("group");
        rowGroup.alignChildren = "left";
        rowGroup.orientation = "column";
        const tabComponents = config[tabName];
        let rowIndex = 0;
        let currentRow = null;
        for (let i = 0; i < tabComponents.length; i++) {
            const componentData = tabComponents[i];

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
                case "button": {
                    const text = componentData.text;
                    const button = currentRow.add("button", undefined, localize(`$$$/AE/Script/Utils/${sanitizeName(text)}=${text}`));
                    button.helpTip = componentData.tooltip || '';
                    button.onClick = () => {
                        try {
                            app.beginUndoGroup(componentData.text);
                            scripts[componentData.script]();
                            app.endUndoGroup();
                        }
                        catch (ex) {
                            alert(`Error: ${ex}`);
                            app.endUndoGroup();
                        }
                    }
                    break;
                }
                case "statictext": {
                    currentRow.margins = [0, 8, 0, 0];
                    currentRow.add(`statictext {text: "${componentData.text}"}`, undefined, "");
                    break;
                }
                case "variable": {
                    currentRow.margins = [10, 0, 0, 0];
                    currentRow.add(`statictext {text: "${componentData.text}: ", characters: 10}`, undefined, "");
                    variableUtils.setVariable(componentData.variable, currentRow.add(`edittext {text: "${componentData.value}", characters: 5}`, undefined, ""));
                    break;
                }
                case "checkbox": {
                    currentRow.margins = [10, 0, 0, 0];
                    const checkbox = currentRow.add('checkbox', undefined, componentData.text);
                    checkbox.value = componentData.value;
                    variableUtils.setVariable(componentData.variable, checkbox);
                    break;
                }
            }
        }
    }

    win.layout.layout(true);

    return win;
}


export default buildUI;
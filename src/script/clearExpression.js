import * as compUtils from '../utils/compUtils'

export default function clearExpression() {
    const selectedProperties = compUtils.getAllSelectedProperties();

    for (let i = 0; i < selectedProperties.length; i++) {
        const prop = selectedProperties[i];
        if (prop.canSetExpression) {
            prop.expression = '';
        }
    }
}

import buildUI from './ui';
import config from './config.json';
import * as scripts from './script/*.js';

export default function aeutils(panel) {
    const w = buildUI(panel, config, scripts);
    if (w.toString() == "[object Panel]") {
        w;
    } else {
        w.show();
    }
}
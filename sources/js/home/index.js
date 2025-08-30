import { setupThemeSwitcher } from './theme.js';
import { setupCodyBox } from './runCode.js';
import { setupLangSwitcher} from './lang.js'

document.addEventListener('DOMContentLoaded', () => {

    setupThemeSwitcher();
    setupCodyBox();
    setupLangSwitcher();


}); //-- END INDEX.JS
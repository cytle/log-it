import normalLogHandler from './normalLogHandler';
import chromeLogHandler from './chromeLogHandler';

const levels = ['info', 'warn', 'error'];

const isChrome = typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

const version = 'v1.0.0';

if (isChrome) {
    /* eslint no-console: 'off' */
    console.log(
        `\n%c   二维火  %c  〉debug.js 〉${version}   \n\n`,
        'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
        'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
        'background: rgb(75, 158, 100); padding:5px 0;',
    );
} else {
    /* eslint no-console: 'off' */
    console.log(`二维火 debug.js ${version}`);
}

let logHandler = isChrome
    ? chromeLogHandler
    : normalLogHandler;

/**
 * 设置logger handler
 * @param {Function} handler log handler
 */
export function setLogHandler(handler) {
    logHandler = handler;
}

const createLogger = (path, level) =>
    (...args) => logHandler(path, level, ...args);

export default function debug(path) {
    const log = createLogger(path, 'log');

    for (let i = levels.length - 1; i >= 0; i--) {
        const level = levels[i];
        log[level] = createLogger(path, level);
    }

    log.assert = (isTrue, ...args) => {
        if (isTrue) {
            log(...args);
        }
    };

    return log;
}

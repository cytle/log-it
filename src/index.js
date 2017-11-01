import normalLogHandler from './normalLogHandler';
import chromeLogHandler from './chromeLogHandler';

const isChrome = typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

const version = 'v1.0.1';

if (isChrome) {
    /* eslint no-console: 'off' */
    console.log(
        '\n%c   二维火  %c  〉debug.js 〉%s   \n\n',
        'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
        'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
        version,
    );
} else {
    /* eslint no-console: 'off' */
    console.log('二维火 debug.js %s', version);
}

let logHandler = isChrome
    ? chromeLogHandler
    : normalLogHandler;

/**
 * 设置logger handler
 * @param {Function} handler log handler
 */
function setLogHandler(handler) {
    logHandler = handler;
}

const createLogger = (path, level) =>
    (...args) => logHandler(path, level, ...args);

const levels = ['log', 'info', 'warn', 'error'];


export {
    normalLogHandler,
    chromeLogHandler,
};

export default function debug(path) {
    const logger = createLogger(path, 'log');

    for (let i = levels.length - 1; i >= 0; i--) {
        const level = levels[i];
        logger[level] = createLogger(path, level);
    }

    logger.assert = (isTrue, ...args) => {
        if (isTrue) {
            logger.log(...args);
        }
    };

    return logger;
}


debug.isChrome = isChrome;
debug.version = version;
debug.setLogHandler = setLogHandler;

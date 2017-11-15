import normalLogHandler from './normalLogHandler';
import chromeLogHandler from './chromeLogHandler';

const isChrome = typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

const version = 'v1.0.2';

if (isChrome) {
    /* eslint no-console: 'off' */
    console.log(
        '\n%c   二维火  %c  〉log-it.js 〉%s   \n\n',
        'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
        'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
        version,
    );
} else {
    /* eslint no-console: 'off' */
    console.log('二维火 log-it.js %s', version);
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

const createLogger = (path, level) => (...args) => {
    try {
        logHandler(path, level, ...args);
    } catch (e) {
        console.error(e);
    }
};

const levels = ['log', 'info', 'warn', 'error'];

export {
    normalLogHandler,
    chromeLogHandler,
};

export default function logIt(path) {
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


logIt.isChrome = isChrome;
logIt.version = version;
logIt.setLogHandler = setLogHandler;

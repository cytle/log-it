import originDebug from 'debug';

const levels = ['info', 'warn', 'error'];

let loggerCreator = originDebug;

if (typeof window !== 'undefined') {
    const version = 'v1.0.0';

    if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        /* eslint no-console: 'off' */
        window.console.log(
            `\n%c   二维火  %c  〉debug.js 〉${version}   \n\n`,
            'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
            'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
            'background: rgb(75, 158, 100); padding:5px 0;',
        );
    } else if (window.console) {
        /* eslint no-console: 'off' */
        window.console.log(`二维火 debug.js ${version}`);
    }
}

/**
 * 设置logger factory
 * @param {Function} factory 创建logger工厂
 */
export function setLoggerFactory(factory) {
    loggerCreator = factory;
}

export default function debug(path) {
    const logger = loggerCreator(path);
    const log = logger.bind(undefined, 'log');

    for (let i = levels.length - 1; i >= 0; i--) {
        const level = levels[i];
        log[level] = logger.bind(undefined, level);
    }

    log.assert = (isTrue, ...args) => {
        if (isTrue) {
            log(...args);
        }
    };

    return log;
}

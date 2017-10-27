import originDebug from 'debug';

const levels = ['info', 'warn', 'error'];

export default function debug(path) {
    const log = originDebug(path);
    for (let i = levels.length - 1; i >= 0; i--) {
        const level = levels[i];
        log[level] = log.bind(undefined, level);
    }
    return log.bind(undefined, 'log');
}

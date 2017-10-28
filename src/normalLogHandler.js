export default function normalLogHandler(path, level, ...args) {
    level = console[level] ? level : 'log';
    /* eslint no-console: 'off' */
    if (level === 'log') {
        console[level](path, ...args);
    } else {
        console[level]('[%s]', level, path, ...args);
    }
}

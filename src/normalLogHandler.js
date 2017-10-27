export default function normalLogHandler(path, level, ...args) {
    level = console[level] ? level : 'log';
    /* eslint no-console: 'off' */
    console[level]('[%s]', path, ...args);
}

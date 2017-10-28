import debug from '../src';
import createStorageLogHandler from '../src/createStorageLogHandler';
import chromeLogHandler from '../src/chromeLogHandler';
import normalLogHandler from '../src/normalLogHandler';

const storageLogHandler = createStorageLogHandler({
    set: (key, payload) => localStorage.setItem(key, JSON.stringify(payload)),
    get: key => localStorage.getItem(key),
});
const logHandler = debug.isChrome ? chromeLogHandler : normalLogHandler;

debug.setLogHandler((...args) => {
    logHandler(...args);
    storageLogHandler(...args);
});

const logger = debug('demo/index');

const levels = ['log', 'info', 'warn', 'error'];
const messages = [
    'message',
    { message: 'object message' },
    ['array message'],
    new Error('error message'),
    logger,
];

levels.forEach(level => messages.forEach(message => logger[level](message)));

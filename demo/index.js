import debug from '../src';
import createStorageLogHandler from '../src/createStorageLogHandler';
import chromeLogHandler from '../src/chromeLogHandler';
import normalLogHandler from '../src/normalLogHandler';

const storageLogHandler = createStorageLogHandler({
    set: (key, payload) => localStorage.setItem(key, JSON.stringify(payload)),
    get: key => JSON.parse(localStorage.getItem(key) || '[]'),
});
const logHandler = debug.isChrome ? chromeLogHandler : normalLogHandler;

debug.setLogHandler((...args) => {
    logHandler(...args);
    storageLogHandler(...args);
});

for (let i = 0; i < 3; i++) {
    const logger = debug(`demo/index/${i}`);

    const levels = ['log', 'info', 'warn', 'error'];
    const messages = [
        'message',
        { message: 'object message' },
        ['array message'],
        new Error('error message'),
    ];

    levels.forEach(level => messages.forEach(message => logger[level](message)));
}

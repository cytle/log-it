# debug

debug 日志

## Usage

```js
import debug from '@2dfire/debug';
import createStorageLogHandler from '@2dfire/debug/createStorageLogHandler';
import chromeLogHandler from '@2dfire/debug/chromeLogHandler';
import normalLogHandler from '@2dfire/debug/normalLogHandler';

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
```

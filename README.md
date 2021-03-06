# log-it

记录日志

![屏幕快照](./images/屏幕快照.png)

## Usage

```js
import logIt from 'log_it';
import createStorageLogHandler from 'log_it/createStorageLogHandler';
import chromeLogHandler from 'log_it/chromeLogHandler';
import normalLogHandler from 'log_it/normalLogHandler';

const storageLogHandler = createStorageLogHandler({
    set: (key, payload) => localStorage.setItem(key, JSON.stringify(payload)),
    get: key => JSON.parse(localStorage.getItem(key) || '[]'),
});
const logHandler = logIt.isChrome ? chromeLogHandler : normalLogHandler;

logIt.setLogHandler((...args) => {
    logHandler(...args);
    storageLogHandler(...args);
});

for (let i = 0; i < 3; i++) {
    const logger = logIt(`demo/index/${i}`);

    const levels = ['log', 'info', 'warn', 'error'];
    const messages = [
        'message',
        { message: 'object message' },
        ['array message'],
        new Error('error message'),
    ];

    levels.forEach(level => messages.forEach(message => logger[level](message)));
}
```

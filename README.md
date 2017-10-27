# debug

debug 日志

## Usage

```js
const debug = require('@2dfire/debug');

const log = debug('app');

// log[.level](<message>)
log('normal message');
log.info('info message');
log.warn('warn message');
log.error('error message');
```

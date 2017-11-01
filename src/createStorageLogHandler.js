const storageKey = 'view_logs';

let logs = [];
let timeoutIndex;
let MAX_LENGTH = 1000;

export function getLogs() {
    return logs;
}

export default function createStorageLogHandler(storage, options = {}) {
    if (options.MAX_LENGTH) {
        MAX_LENGTH = options.MAX_LENGTH;
    }

    try {
        logs = storage.get(storageKey) || [];
    } catch (e) {
        logs = [];
        setTimeout(() => {
            /* eslint no-console: 'off' */
            console.error(e);
        }, 0);
    }

    return function storageLogHandler(path, level, ...args) {
        const time = +new Date();
        // TODO 优化
        const payload = JSON.stringify(args);
        logs.unshift(`${time}: ${payload}`);

        clearTimeout(timeoutIndex);
        timeoutIndex = setTimeout(() => {
            if (logs.length > MAX_LENGTH) {
                logs.splice(MAX_LENGTH - 100);
            }
            storage.set(storageKey, logs);
        }, 5000);
    };
}

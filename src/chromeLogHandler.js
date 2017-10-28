const logStyles = {
    log: {
        path: 'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
        message: 'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
    },
};

const randomStyles = {};

function randomStylesByPath(path) {
    if (!(path in randomStyles)) {
        randomStyles[path] = {
            path: 'padding:5px 0; color: #990;',
            message: 'color: rgb(75, 158, 100);',
        };
    }
    return randomStyles[path];
}

export default function chromeLogHandler(path, level, ...args) {
    const styles = level in logStyles
        ? logStyles[level]
        : randomStylesByPath(path);

    /* eslint no-console: 'off' */
    if (args.length === 1 && typeof args[0] === 'string') {
        console.log(
            '%c %s %c %s',
            styles.path,
            path,
            styles.message,
            args[0],
        );
    } else {
        console.log(
            '%c %s',
            styles.path,
            path,
            ...args,
        );
    }
}

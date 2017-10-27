const logStyles = {
    log: {
        path: 'background: rgb(75, 158, 100); padding:5px 0; color: #030307;',
        message: 'color: rgb(75, 158, 100); background: #030307; padding:5px 0;',
    },
};

const colors = {};

function randomStyleByPath(path) {
    if (!(path in colors)) {
        colors[path] = {
            path: 'padding:5px 0; color: #990;',
            message: 'color: rgb(75, 158, 100);',
        };
    }
    return colors[path];
}

export default function chromeLogHandler(path, level, ...args) {
    const styles = level in logStyles
        ? logStyles[level]
        : randomStyleByPath(path);

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

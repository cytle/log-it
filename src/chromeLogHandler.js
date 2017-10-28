const levelStyles = {
    info: ['green'],
    warn: ['orange'],
    error: ['red'],
};

const messageBlockStyles = {};

function randomMessageBlockStylesByPath(path) {
    if (!(path in messageBlockStyles)) {
        messageBlockStyles[path] = styleBlock(['#990']);
    }
    return messageBlockStyles[path];
}

function styleBlock([fontColor, background]) {
    return background
        ? `color: ${fontColor}; background: ${background}`
        : `color: ${fontColor}`;
}
export default function chromeLogHandler(path, level, ...args) {
    const blocks = [];
    if (level in levelStyles) {
        blocks.push(styleBlock(levelStyles[level]), `[${level}] `);
    }

    blocks.push(randomMessageBlockStylesByPath(path), path);

    /* eslint no-console: 'off' */
    console.log('%c%s'.repeat(blocks.length / 2), ...blocks, ...args);
}

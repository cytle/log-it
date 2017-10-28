import debug from '../src';

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

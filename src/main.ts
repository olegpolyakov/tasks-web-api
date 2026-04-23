import Server from '@olegpolyakov/server';
import TasksDb from '@olegpolyakov/tasks/db';

import type Context from './context.ts';
import Router from './router.ts';

const {
    HOST = 'localhost',
    PORT = 3000,
    SESSION_SECRET = 'tasks-session-secret',
    DB_CONNECTION_STRING = ''
} = process.env;

const tasksDb = TasksDb(DB_CONNECTION_STRING, { debug: true });

await tasksDb.connect();

const context: Context = {
    models: tasksDb.models
};

Server({
    host: HOST,
    port: PORT,
    json: true,
    cors: true,
    session: {
        secret: SESSION_SECRET
    }
})
    .use('/api', Router(context))
    .start(() => {
        console.info(`Server is running on ${HOST}:${PORT}`);
    });
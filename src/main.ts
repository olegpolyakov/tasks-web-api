import Server from '@olegpoliakov/server';
import TasksDb from '@olegpoliakov/tasks-db';

import api from './api.ts';
import type Context from './context.ts';

const {
    HOST = 'localhost',
    PORT = 3000
} = process.env;

const db = TasksDb({ debug: true });

await db.connect();

const context: Context = {
    db,
    models: db.models
};

Server()
    .use(api(context))
    .listen(PORT, () => {
        console.log(`Server is running on ${HOST}:${PORT}`);
    });
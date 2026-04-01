import cors from 'cors';
import express from 'express';

import type Context from '@/context.ts';

import projects from './controllers/projects.ts';
import tags from './controllers/tags.ts';
import tasks from './controllers/tasks.ts';

export default (context: Context) => {
    const api = express();

    api.use(express.json());
    api.use(cors({
        origin: '*'
    }));

    api.use('/api/projects', projects(context));
    api.use('/api/tags', tags(context));
    api.use('/api/tasks', tasks(context));

    return api;
};
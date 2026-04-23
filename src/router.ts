import { Router } from 'express';

import lists from './controllers/lists.ts';
import settings from './controllers/settings.ts';
import tags from './controllers/tags.ts';
import tasks from './controllers/tasks.ts';
import type Context from './context.ts';

export default (context: Context) => {
    const router = Router();

    router.use('/lists', lists(context));
    router.use('/settings', settings(context));
    router.use('/tags', tags(context));
    router.use('/tasks', tasks(context));

    return router;
};
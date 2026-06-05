import { Router } from 'express';

import settings from '@olegpolyakov/backend/features/settings';

import tags from './features/tags.ts';
import tasks from './features/tasks.ts';
import type Context from './context.ts';

export default (context: Context) => {
    const router = Router();

    router.use('/settings', settings(context));
    router.use('/tags', tags(context));
    router.use('/tasks', tasks(context));

    return router;
};
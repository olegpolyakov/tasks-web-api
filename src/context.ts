import type { Models } from '@olegpolyakov/db';
import { Schemas as TaskSchemas } from '@olegpolyakov/tasks/db';

export type Context = {
    models: Models<TaskSchemas>;
};

export default Context;
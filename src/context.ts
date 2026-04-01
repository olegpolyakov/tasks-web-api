import type { Db, Models } from '@olegpoliakov/db';
import { Schemas } from '@olegpoliakov/tasks-db';

type Context = {
    db: Db<Schemas>;
    models: Models<Schemas>;
};

export default Context;
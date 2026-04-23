import { Router } from 'express';

import type Context from '@/context.ts';

export default ({
    models: { List, Task }
}: Context) => {
    const router = Router();

    router.param('id', async (req, res, next, id) => {
        const list = await List.findById(id, { _id: true });

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        next();
    });

    router.get('/', async (req, res) => {
        const lists = await List.find();

        res.status(200).json(lists);
    });

    router.get('/:id', async (req, res) => {
        const list = await List.findById(req.params.id);

        res.status(200).json(list);
    });

    router.post('/', async (req, res) => {
        const { name, icon, description } = req.body;

        const list = await List.create({
            name,
            icon,
            description
        });

        res.status(201).json(list);
    });

    router.put('/:id', async (req, res) => {
        const { name, icon, description } = req.body;

        const list = await List.findByIdAndUpdate(req.params.id, {
            name,
            icon,
            description
        }, { new: true });

        res.status(200).json(list);
    });

    router.delete('/:id', async (req, res) => {
        const list = await List.findByIdAndDelete(req.params.id);

        if (req.body.deleteTasks) {
            await Task.deleteMany({ _id: { $in: list!.taskIds } });
        }

        res.status(204).send({ id: req.params.id });
    });

    return router;
};
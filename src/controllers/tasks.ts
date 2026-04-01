import { Router } from 'express';

import type Context from '@/context.ts';

export default ({
    models: { Task }
}: Context) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const { title, projectIds, tagIds } = req.body;

        const task = await Task.create({
            title,
            completed: false,
            projectIds,
            tagIds
        });

        res.status(201).json(task);
    });

    router.get('/', async (req, res) => {
        const tasks = await Task.find().populate('tags');

        res.status(200).json(tasks);
    });

    router.put('/:id', async (req, res) => {
        const { title, content, completed, dueDate, priority, tagIds, projectIds } = req.body;

        const task = await Task.findByIdAndUpdate(req.params.id, {
            title,
            completed,
            content,
            dueDate,
            priority,
            tagIds,
            projectIds
        }, { new: true }).populate('tags');

        res.status(200).json(task);
    });

    router.patch('/:id', async (req, res) => {
        const { completed } = req.body;

        const task = await Task.findByIdAndUpdate(req.params.id, {
            completed
        }, { new: true }).populate('tags');

        res.status(200).json(task);
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;

        await Task.findByIdAndDelete(id);

        res.status(204).send({ id });
    });

    return router;
};
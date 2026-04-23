import { Router } from 'express';

import type Context from '@/context.ts';

export default ({
    models: { Settings }
}: Context) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const settings = await Settings.findOne() ?? new Settings();

        res.status(200).json(settings);
    });

    router.get('/:id', async (req, res) => {
        const settings = await Settings.findById(req.params.id);

        res.status(200).json(settings);
    });

    router.put('/:id', async (req, res) => {
        const settings = await Settings.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true,
            upsert: true
        });

        res.status(200).json(settings);
    });

    return router;
};

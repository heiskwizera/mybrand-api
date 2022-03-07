import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Running on index');
})

export const home = router;

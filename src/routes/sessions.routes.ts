import { Router } from 'express';

import SessionService from '../services/SessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const sessionService = new SessionService();

    const { user, token } = await sessionService.execute({ email, password });

    return res.json({ user, token });
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;

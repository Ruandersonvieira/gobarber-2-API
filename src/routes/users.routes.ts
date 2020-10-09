import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      return res.json(user);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  },
);

export default usersRouter;

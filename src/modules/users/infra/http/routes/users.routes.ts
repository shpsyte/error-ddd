import Router from 'express';
import multer from 'multer';
import UserServices from '@modules/users/services/CreateUserServices';
import uploadConfig from '@config/upload';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatar';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';

import { container } from 'tsyringe';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = container.resolve(UserServices);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);
    const {
      file: { filename },
      user: { id },
    } = req;

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFileName: filename,
    });
    delete user.password;
    return res.json(user);
  }
);

export default usersRoutes;

import Router from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateService';
import { container } from 'tsyringe';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  delete user.password;
  return res.json({ user, token });
});

export default sessionRouter;

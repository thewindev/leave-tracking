import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import leaveCtrl from '../controllers/leave-request.controller';
import expressJwt from 'express-jwt';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

router.route('/:userId/leaves')
  .get(expressJwt({ secret: config.jwtSecret }), leaveCtrl.getForUser)

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;

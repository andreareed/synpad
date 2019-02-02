const Boom = require('boom');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const service = require('../user/user-service');
const saltRounds = 12;

module.exports = {
  async registerUserHandler(request) {
    const { email, password, first_name, last_name } = request.payload;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await service.registerUser({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    user.token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '36h',
    });
    return user;
  },

  async updateUserHandler(request) {
    const { user } = request.params;
    const { email, password, newPassword, first_name, last_name } = request.payload;

    if (newPassword) {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return Boom.badData('Current password is incorrect');
      }
      request.payload.password = await bcrypt.hash(newPassword, saltRounds);
    }
    delete request.payload.password;
    delete request.payload.newPassword;
    delete request.payload.confirmPassword;

    return service.patchUser(user.id, request.payload);
  },
};

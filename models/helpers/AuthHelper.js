const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { User } = require('..');
const {
  usersRoles,
  defaultStatus,
} = require('../../config/options');

const { Op } = sequelize;

const hasRole = (user, roles) => {
  if (roles && roles.length) {
    return [usersRoles.SUPER_ADMIN].includes(user.role)
      ? true
      : roles.indexOf(user.role) > -1;
  }
  return false;
};

const verifyJwt = async (token, roles, force) => {
  const secretOrKey = process.env.JWT_SECRET_KEY;
  return await jwt.verify(token, secretOrKey, async (err, jwtPayload) => {
    if (err) {
      return {
        status: resCode.HTTP_UNAUTHORIZED,
        errorMessage: errorMessage.UNAUTHORIZED_ACCESS,
        errorType: errorTypes.UNAUTHORIZED_ACCESS,
      };
    }
    if (jwtPayload && jwtPayload.id) {
      const existingUser = await User.findOne({
        where: {
          id: jwtPayload.id,
        },
        attributes: [
          'id',
          'name',
          'email',
          'role',
          'createdAt',
          'updatedAt',
        ]
      });


      if (existingUser && hasRole(existingUser, roles)) {
        return { status: 200, user: existingUser };
      }
      return {
        status: 401,
        errorMessage: "Unauthorized access",
        errorType: "UnauthorizedAccess",
      };
    }
    if (!force) {
      return { status: resCode.HTTP_OK };
    }
    return {
      status: resCode.HTTP_FORBIDDEN,
      errorMessage: errorMessage.FORBIDDEN,
      errorType: errorTypes.FORBIDDEN,
    };
  });
};
exports.verifyJwt = verifyJwt;
exports.authenticateJWT = function (roles = [usersRoles.getAllRolesAsArray()], force = true) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return verifyJwt(token, roles, force).then((checkAuth) => {
        if (checkAuth.status === 200) {
          req.authenticated = true;
          req.user = checkAuth.user;
          next();
        } else {
          return res
            .status(checkAuth.status)
            .json({
              status: checkAuth.status,
              errorMessage: checkAuth.errorMessage,
              errorType: checkAuth.errorType
            });
        }
      });
    }
    return res
      .status(401)
      .json({
        status: 401,
        errorMessage: "Unauthorized access",
        errorType: "UnauthorizedAccess"
      });
  };
};

// exports.skillVerification = function () {
//   const secretOrKey = process.env.JWT_SECRET_KEY;
//   return function (req, res, next) {
//     const { code } = req.query;
//     return jwt.verify(code, secretOrKey, async (err, jwtPayload) => {
//       if (err) {
//         return res
//           .status(resCode.HTTP_UNAUTHORIZED)
//           .json(
//             genRes(
//               resCode.HTTP_UNAUTHORIZED,
//               errorMessage.UNAUTHORIZED_ACCESS,
//               errorTypes.UNAUTHORIZED_ACCESS
//             )
//           );
//       }
//       if (jwtPayload && jwtPayload.id) {
//         req.body.skill = jwtPayload;
//         next();
//       } else {
//         return res
//           .status(resCode.HTTP_UNAUTHORIZED)
//           .json(
//             genRes(
//               resCode.HTTP_UNAUTHORIZED,
//               errorMessage.UNAUTHORIZED_ACCESS,
//               errorTypes.UNAUTHORIZED_ACCESS
//             )
//           );
//       }
//     });
//   };
// };

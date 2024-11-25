const options = {
  jwtTokenExpiry: '7d',
  defaultStatus: {
    ON_BOARDED: 'on_boarded',
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BLOCKED: 'blocked',
    UNBLOCKED: 'unblocked',
    DELETED: 'deleted',
    REJECTED: 'rejected',
    COMPLETED: 'completed',
    getDefaultStatusArray: () => [
      options.defaultStatus.ON_BOARDED,
      options.defaultStatus.PENDING,
      options.defaultStatus.ACTIVE,
      options.defaultStatus.INACTIVE,
      options.defaultStatus.BLOCKED,
      options.defaultStatus.UNBLOCKED,
      options.defaultStatus.DELETED,
      options.defaultStatus.REJECTED,
      options.defaultStatus.COMPLETED,
    ],
  },
  usersRoles: {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
    getAllRolesAsArray: () => [
      options.usersRoles.ADMIN,
      options.usersRoles.DOCTOR,
      options.usersRoles.PATIENT,
    ],
    getUserRolesAsArray: () => [
      options.usersRoles.ADMIN,
      options.usersRoles.DOCTOR,
      options.usersRoles.PATIENT,
    ],
  },

};

module.exports = options;

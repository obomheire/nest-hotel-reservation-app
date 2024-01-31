export const mongooseSchemaConfig = {
  id: true,
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  toJSON: {
    virtuals: true,
    transform: (_: any, ret: any) => {
      // TODO: delete all fields not required on the frontend
      delete ret._id;
      delete ret.password;
      // delete ret.confirmPassword;
      delete ret.salt;
      delete ret.visible;
      // delete ret.updatedAt;
      delete ret.refreshToken;
      // delete ret.addressCoordinates;
      delete ret.code;
      delete ret.secretQuestions;
      delete ret.otp;
      delete ret.otpExpiry;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_: any, ret: any) => {
      delete ret._id;
      delete ret.password;
      // delete ret.confirmPassword;
      delete ret.salt;
      delete ret.visible;
      // delete ret.addressCoordinates;
      // delete ret.updatedAt;
      delete ret.refreshToken;
      delete ret.code;
      delete ret.secretQuestions;
      delete ret.otp;
      delete ret.otpExpiry;
      return ret;
    },
  },
};

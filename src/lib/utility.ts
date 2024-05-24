import { Types } from 'mongoose';
import { RoleEnum } from 'src/users/dto/user.dto';

export const getQueryWithRespectToAdmin = (req: any) => {
  return req.user.role !== RoleEnum.ADMIN
    ? { userId: new Types.ObjectId(req.user._id) }
    : {};
};

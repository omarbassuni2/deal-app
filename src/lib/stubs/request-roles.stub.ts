import { Types } from 'mongoose';
import { RoleEnum, StatusEnum } from 'src/users/dto/user.dto';
const user = {
  _id: new Types.ObjectId('6650f0ee4e1bca0ba93b5a72'),
  name: 'omar',
  password: '$2b$10$WEXPK3mOYMCEIyY9ILRgaO4nxr2tbkeXAJOUZKvV3JIPnm51o2HOm',
  phone: '1',
  role: RoleEnum.ADMIN,
  status: StatusEnum.ACTIVE,
  createdAt: new Date('2024-05-24T19:56:30.880Z'),
  updatedAt: new Date('2024-05-24T19:56:30.880Z'),
  __v: 0,
};
export const stubAdmin = () => {
  return { user };
};

export const stubClient = () => {
  return {
    user: {
      ...user,
      phone: '11',
      role: RoleEnum.CLIENT,
    },
  };
};

export const stubAgent = () => {
  return {
    user: {
      ...user,
      phone: '11',
      role: RoleEnum.AGENT,
    },
  };
};

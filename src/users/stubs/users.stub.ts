import { RoleEnum, StatusEnum } from '../dto/user.dto';

export const stubValidUserSignUp = () => {
  return {
    name: 'name',
    password: 'password',
    phone: '01111110707',
    role: RoleEnum.CLIENT,
    status: StatusEnum.ACTIVE,
  };
};

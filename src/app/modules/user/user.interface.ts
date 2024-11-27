export type TUser = {
  _id: string;
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

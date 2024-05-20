/**
 * The LoggedInUser type is used to represent the logged in user
 */
export type LoggedInUserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  iat: number;
  exp: number;
};


export class userEntity {
  id?: string;
  email: string;
  name: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
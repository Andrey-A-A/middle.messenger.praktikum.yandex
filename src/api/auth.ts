import  HTTP  from '../core/HTTP';

export type UserRequestData = {
  login: string;
  displayName: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
};

type LoginRequestData = {
  login: string;
  password: string;
};

export type SignUpResponseDTO = {
  id: string;
}

export const authAPI = {

  signUp: (data: UserRequestData) => HTTP.post('/auth/signup', {data: data}),
  
  login: (data: LoginRequestData) =>
    HTTP.post('/auth/signin', {data: data}),

  me: () => HTTP.get('/auth/user'),

  logout: () => HTTP.post('/auth/logout', {}),
};

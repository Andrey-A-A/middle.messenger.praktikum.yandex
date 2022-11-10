import  HTTP  from '../core/HTTP';

export type ChatUpRequest = {
  title: string
}

export type AddUserRequest = {
  users: number[],
  chatId: number,
}

export type DeleteUserRequest = {
  users: number[],
  chatId: number,
}

export type GetTokenRequest = {
  chatId: number,
  
}

export const chatsAPI = {

  chatsList: () => HTTP.get('/chats'),
  chatsUp: (body: ChatUpRequest) => HTTP.post('/chats', {data: body}),
  addUser: (body: AddUserRequest) => HTTP.put('/chats/users', {data: body}),
  deleteUser: (body: DeleteUserRequest) => HTTP.delete('/chats/users', {data: body}),
  getToken: (chatId: number) => HTTP.post(`/chats/token/${chatId}`, {}),
}


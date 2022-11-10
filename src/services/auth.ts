import { authAPI } from '../api/auth';
import { userAPI, passwordAPI } from '../api/changeAuth';
import { chatsAPI } from '../api/chats';
import { UserDTO, ChatDTO, ChatsDTO } from '../api/types';
import type { Dispatch } from '../core/Store';
import { transformUser, apiHasError } from '../utils';
import { transformChat } from '../utils/apiTransformers'
import type {UserRequestData, SignUpResponseDTO} from '../api/auth'


type LoginPayload = {
  login: string;
  password: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/login');
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (
  dispatch: Dispatch<AppState>,
  action: UserRequestData,
) => {
  dispatch({ isLoading: true });

  const response: any = await authAPI.signUp(action);
  
  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, loginFormError: null });
  window.router.go('/login');
}

export const passwordUp = async (
  dispatch: Dispatch<AppState>,
  action: UserRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await passwordAPI.passwordUp(action);
  console.log('response', response);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, loginFormError: null });
  window.router.go('/settings');
}

export const userUp = async (
  dispatch: Dispatch<AppState>,
  action: UserRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.userUp(action);
  
  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, loginFormError: null });
  window.router.go('/settings');
}

export const avatarUp = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.userUp(action);
  

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false, loginFormError: null });
  window.router.go('/settings');
}

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
    
  dispatch({ isLoading: true });

  const loginResponse = await authAPI.login(action);
  
  if (apiHasError(loginResponse)) {
    dispatch({ isLoading: false, loginFormError: loginResponse.reason });
    return;
  }
  console.log('ок');

  const meResp: any = await authAPI.me();
  const responseUser = meResp.response;

  if (apiHasError(meResp)) {
    console.log('Не смогли получить пользователя');
    dispatch({ isLoading: false, loginFormError: meResp.reason });
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  const chatsResp: any = await chatsAPI.chatsList();
  const responseChats = chatsResp.response as ChatsDTO;
  console.log('responseChats=', responseChats);
  
    if (apiHasError(chatsResp)) {
    console.log('Не смогли получить список чатов');
    dispatch({ isLoading: false, loginFormError: chatsResp.reason });
    dispatch(logout);
    return;
  }
  
  const chatsTransformed = responseChats.map((chat: ChatDTO) => {
    return transformChat(chat);
  });
  dispatch({ isLoading: false, loginFormError: null });
  dispatch({ chats: chatsTransformed as Chats});

  window.router.go('/messenger');
};





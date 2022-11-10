declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    chats: Chats | null;
    socket: any;
    messages: any;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number,
    title: string,
    avatar: string | null,
    createdBy: number,
    unreadCount: number,
    lastMessage: string | null
  }

  

  export type Chats = Chat[]

  export type Messages = Message[]
  export interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }

}

export {};

declare module "*.svg";
declare module "*.png" {
  const value: any;
  export = value;
};
declare module "*.scss";
declare module "*.css";
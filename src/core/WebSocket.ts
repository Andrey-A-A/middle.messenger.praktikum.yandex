import { Dispatch, Store } from '../core/Store';
import { chatsAPI } from '../api/chats';
import { TokenDTO } from '../api/types';
import { apiHasError } from '../utils';
import { dateTransformer } from '../utils/apiTransformers';
import process from 'process';


type MessageChatData = {
  id?: number,
  user_id?: number,
  chat_id?: number,
  type?: string,
  time: string,
  file?: any | null,
  is_read?: boolean,
  content: string
};

export const renderChatPage = (data: any, state: AppState): void => {
  
  console.log('data=', data, 'state=', state);
  
  if (data.type === 'pong') {
    console.log('Игнорируем pong');
    return
  }
  const messages: MessageChatData[] = data as MessageChatData[];
  if (messages.length === 0) {
    console.log('В этом чате нет сообщений');
  }
  const selectedChatId = Number(localStorage.getItem('selectedChatId'))

    
  if (selectedChatId) {
    state.chats?.forEach((chat) => {
      if (chat.id === selectedChatId) {
        const titleTop = document.querySelector('.top-nickname') as HTMLElement;
        titleTop.innerHTML = chat.title
        if (chat.avatar) {
          const avatarTop = document.querySelector('.top-avatar') as HTMLImageElement;
          const image = `${process.env.API_ENDPOINT}/resources/${chat.avatar}`
          avatarTop.src = image;
        }
      } 
    });
  }
  const chatMessageСontainer = document.querySelectorAll('.message') 
  
  for (let i = messages.length-1; i >= 0 ; i--) {
   
    const divRow = document.createElement('div');
    divRow.className = "myMessage__row";
    

    if (messages[i].user_id === state.user?.id) {
      const divText = document.createElement('div');
      divText.className = 'message__content-text';
      divText.innerHTML = messages[i].content;

      const divTime = document.createElement('div');
      divTime.className = 'message__content-time';
      divTime.innerHTML = dateTransformer(messages[i].time);

      const divMessageContent = document.createElement('div');
      divMessageContent.className = "message__content-my";
      divMessageContent.innerHTML = divText.outerHTML;
      divMessageContent.innerHTML += divTime.outerHTML;

      const divRow = document.createElement('div');
      divRow.className = "message__row-my";
      divRow.innerHTML = divMessageContent.outerHTML;
      chatMessageСontainer[0].append(divRow)

    } else {
      const divText = document.createElement('div');
      divText.className = 'message__content-text';
      divText.innerHTML = messages[i].content;

      const divTime = document.createElement('div');
      divTime.className = 'message__content-time';
      divTime.innerHTML = dateTransformer(messages[i].time);


      const divHisMessageContent = document.createElement('div');
      divHisMessageContent.className = "message__content-his";
      divHisMessageContent.innerHTML = divText.outerHTML;
      divHisMessageContent.innerHTML += divTime.outerHTML;

      const divAnswer = document.createElement('div');
      divAnswer.className = 'message__answer';

      const divRow = document.createElement('div');
      divRow.className = "message__row-his";
      divRow.innerHTML = divHisMessageContent.outerHTML;
      chatMessageСontainer[0].append(divRow)

    }
  } 
  
} 

export const createConnection = async (
  dispatch: any,
  state: AppState,
  action: number,
  ) => {
  try {
    const getTokenResponse: any = await chatsAPI.getToken(action);
    
    const responseToken = getTokenResponse.response;
    
    if (apiHasError(getTokenResponse)) {
      console.log('Не смогли получить токен', getTokenResponse.reason);
      return;
    } 

    const userID = state.user?.id;
    
    const socket = new WebSocket(
      `${process.env.WS_ENDPOINT}/chats/${userID}/${action}/${responseToken.token}`
    );

    socket.addEventListener("open", () => {
      console.log('происходит событие open');
      
      dispatch({ socket });

      socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener("message", (event) => {
      
      const data = JSON.parse(event.data);
      console.log('получены данные', data);
      if (data.type === 'message') {
        console.log('пришло одно сообщение', data.content);
        
        renderChatPage([data], state)
        return
      }
      if (data.type !== 'pong' && data.type !== 'user connected') {
        
        localStorage.setItem('messages', JSON.stringify(data));
      }
      if (data.type === 'user connected') {
        console.log('присоединился пользователь');
        return
      }
      
      renderChatPage(data, state)

    });

    socket.addEventListener("error", (event: Event) => {
      console.log("Ошибка", event);
    });


    socket.addEventListener("pong", (event: Event) => {
      console.log("получили pong", event);
    });

    setInterval(() => {
      socket.send(JSON.stringify({ type: "ping" }));
    }, 30000);
  }
  catch (err) {
    console.error(err);
  }
};

export const sendMessage = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) => {
  if (!state.socket) {
    console.log('Сокет пустой');
    return;
  }
  state.socket.send(
    JSON.stringify({
      content: action,
      type: "message",
    })
  );
  state.socket.send(
    JSON.stringify({
      content: "0",
      type: "get old",
    })
  );

  setInterval(() => {
    state.socket.close(JSON.stringify({ type: "message" }));
  }, 130000);
};



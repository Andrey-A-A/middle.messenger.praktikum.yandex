import Block from '../../core/Block';
import { withUser, withStore, withRouter } from '../../utils';
import { withChats } from '../../utils/withChats';
import { CoreRouter } from '../../core';
import { Store } from '../../core/Store';
import { addUser, chatsUp, deleteUser, getChatsList } from '../../services/chatsService';
import { createConnection, sendMessage, renderChatPage } from '../../core/WebSocket';
import {ChatItem} from '../../components/ChatItem/chatItem';
import Input from '../../components/input';
import Chat from '../../components/chat'
import registerComponent from '../../core/registerComponent'
import Button from '../../components/Button';
import Link from '../../components/Link';
import ErrorComponent from '../../components/error';
import { validateForm, ValidateType } from '../../helpers/validateRegForm';
import avatar from '../../assets/img/avatar.png';
import clip from '../../assets/img/clip.svg'


registerComponent(Input);
registerComponent(Chat);
registerComponent(ChatItem);
registerComponent(Button);
registerComponent(Link);
registerComponent(ErrorComponent);

type ChatsPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  user: User | null;
  chats: Chats | null;
  onLogout?: () => void;
  onLinkSettings?: (e: Event) => void;
  onLinkSignUp?: (e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onInput?: (e: Event) => void;
  onFocus?: () => void;
  onSubmit?: () => void;
  onAddChats?: () => void;
};

export class ChatsPage extends Block {

  static componentName = 'ChatsPage';
  
  constructor(props: ChatsPageProps) {
    window.store
    super(props)
    this.setProps({
      store: this.props.store,
    
      onBlur: (e: FocusEvent): void => {
        const inputEl = e.target as HTMLInputElement;
        const error = validateForm([{ type: ValidateType.Message, value: inputEl.value }]);
        this.refs.errorRef.setProps({ text: error });
      },
      onInput: (e: Event): void => {
        
        const inputEl = e.target as HTMLInputElement;
        const type = ValidateType[inputEl.name as keyof typeof ValidateType];
        const errorMessage = validateForm([{ type: type, value: inputEl.value }]);
        
        let el;
        if (type === ValidateType.Message) {
          el = this.refs.messageInputRef;
        }
        el?.refs?.errorRef?.setProps({ text: errorMessage });
      },
      onFocus: (): void => console.log('focus'),
      onSubmit: (): void => {
        
        const messageEl = this.element?.querySelector('input[name="Message"]') as HTMLInputElement;

        const errorMessage = validateForm([
          { type: ValidateType.Message, value: messageEl.value }
        ]);

        if (errorMessage) {
          this.setProps({
            error: errorMessage,
            messageValue: messageEl.value,
          });
        } else {
          this.setProps({
            error: '',
            messageValue: messageEl.value
          });
          console.log('Сообщение отправлено');
          
          this.props.store.dispatch(sendMessage, messageEl.value);
        }
      },
      onLinkSettings: (e: Event): void => {
        
        e.preventDefault;
        
        if (this.props.store.getState().user) {
          this.props.router.go('/settings');
        } else {
          this.props.router.go('/login');
        }
      },
      onLinkSignUp: (e: Event): void => {
        e.preventDefault;
        window.router.go('/sign-up');
      },
      onAddChats: (e: Event): void => {
        e.preventDefault;
        const title = prompt("Введите название чата");
        if (title) {
          const chatUpRequest = { title: title }
          this.props.store.dispatch(chatsUp, chatUpRequest);} else return;
        console.log('this.props.chats=', this.props.chats)
      },
      onChatClick: (e: Event): any => {
        e.preventDefault;
                        
        const parent = ( <HTMLElement>e.target ).closest('.chats__list');
        
        for (let i = 0; i < this.props.chats.length; i++) {
          if (this.props.chats[i].id === Number(parent?.getAttribute('data-id') )) {
            localStorage.setItem('selectedChatId', this.props.chats[i].id);
            this.props.store.dispatch(createConnection, this.props.chats[i].id);
          } 
        }
      },
      onAddUser: (): void => {
        const userId = prompt("Введите id пользователя");
        const chatId = prompt("Введите id чата");
        if (userId && chatId ) {
          const addUserRequest = {users: [userId], chatId: chatId};
          this.props.store.dispatch(addUser, addUserRequest);
        } else {alert('Некорректно введены данные')}
      },
      onDeleteUser: (): void => {
        const userId = prompt("Введите id пользователя");
        const chatId = prompt("Введите id чата");
        if (userId && chatId ) {
          const deleteUserRequest = {users: [userId], chatId: chatId};
          this.props.store.dispatch(deleteUser, deleteUserRequest);
        } else {alert('Некорректно введены данные')}
      }
    }); 
    
  }
  

  componentDidMount(props: ChatsPageProps) {
    super.componentDidMount(props);
    
    this.props.store.dispatch(getChatsList);
    console.log('this.props.store=', this.props.store);
    if (localStorage.messages) {
      const messagesObj = JSON.parse(localStorage.messages)
      renderChatPage(messagesObj, window.store.state) ;
    } else {
      console.log('сообщений в стейте пока нет'); 
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    window.store;
  }

  render() {
    return `
    <main class='main'>
    <div class='chats'>
      <div class='chats__left'>
        <div class='chats__profile-link'>
        {{#Link href="/sign-up" onClick=onLinkSignUp}}
        <svg class="reg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path d="M700.7,321.8c0-24.6-19.9-44.5-44.5-44.5H255.3c-24.6,0-44.5,19.9-44.5,44.5s19.9,44.5,44.5,44.5h400.9C680.8,366.4,700.7,346.4,700.7,321.8L700.7,321.8z M255.3,455.2c-24.6,0-44.5,19.9-44.5,44.5v0.2c0,24.6,19.9,44.5,44.5,44.5h267.3c24.6,0,44.5-19.9,44.5-44.5v-0.2c0-24.6-19.9-44.5-44.5-44.5H255.3L255.3,455.2z M277.5,900.9H233c-61.5,0-111.4-49.9-111.4-111.4V210.5c0-61.5,49.9-111.4,111.4-111.4h445.5c61.5,0,111.4,49.9,111.4,111.4v111.4c0,24.6,19.9,44.5,44.5,44.5c24.6,0,44.5-19.9,44.5-44.5V188.2C878.9,89.8,799.1,10,700.7,10h-490C112.3,10,32.5,89.8,32.5,188.2v623.6c0,98.4,79.8,178.2,178.2,178.2h66.8c24.6,0,44.5-19.9,44.5-44.5C322.1,920.8,302.1,900.9,277.5,900.9L277.5,900.9z M928.8,493.9c-51.6-51.8-135.2-51.8-186.8,0L453.5,778.8l0.3,0.3c-9.6,8.1-15.8,20.1-15.8,33.7v132.8c0,24.4,19.7,44.3,44,44.3l0,0h132.1c16.2,0,30.2-8.9,37.8-21.9l0.2,0.2l276.7-286.3C980.4,629.8,980.4,545.7,928.8,493.9L928.8,493.9z M866.5,619L594.4,901.2H526v-69.5l278.2-275.3c17.2-17.3,45.1-17.3,62.3,0C883.7,573.7,883.7,601.8,866.5,619L866.5,619z M388.9,633.6H255.3c-24.6,0-44.5,19.9-44.5,44.5c0,24.6,19.9,44.6,44.5,44.6h133.6c24.6,0,44.5-19.9,44.5-44.6C433.4,653.6,413.5,633.6,388.9,633.6L388.9,633.6z"/></g>
</svg>
        {{/Link}}
        <a href="/">
          <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" stroke-width="4" clip-rule="evenodd" d="M5.07692 5.92648C5.07692 4.38908 6.33971 3.14278 7.89744 3.14278H12C12.4248 3.14278 12.7692 3.48268 12.7692 3.90197C12.7692 4.32126 12.4248 4.66116 12 4.66116H7.89744C7.18938 4.66116 6.61539 5.22766 6.61539 5.92648V6.93873C6.61539 7.35802 6.27099 7.69792 5.84615 7.69792C5.42132 7.69792 5.07692 7.35802 5.07692 6.93873V5.92648ZM5.84615 16.3021C6.27099 16.3021 6.61539 16.642 6.61539 17.0613V18.0735C6.61539 18.7723 7.18938 19.3388 7.89744 19.3388H12C12.4248 19.3388 12.7692 19.6788 12.7692 20.098C12.7692 20.5173 12.4248 20.8572 12 20.8572H7.89744C6.33971 20.8572 5.07692 19.6109 5.07692 18.0735V17.0613C5.07692 16.642 5.42132 16.3021 5.84615 16.3021Z" />
<path fill-rule="evenodd" stroke-width="4" clip-rule="evenodd" d="M12.7692 4.78618C12.7692 3.90491 13.6592 3.29355 14.4966 3.59962L19.6248 5.47416C20.1277 5.658 20.4615 6.13139 20.4615 6.66071V17.3393C20.4615 17.8686 20.1277 18.342 19.6248 18.5258L14.4966 20.4004C13.6592 20.7065 12.7692 20.0951 12.7692 19.2138V4.78618ZM15.0309 2.17576C13.1887 1.5024 11.2308 2.84738 11.2308 4.78618V19.2138C11.2308 21.1526 13.1887 22.4976 15.0309 21.8242L20.1591 19.9497C21.2656 19.5452 22 18.5038 22 17.3393V6.66071C22 5.4962 21.2656 4.45475 20.1591 4.0503L15.0309 2.17576Z" />
<path fill-rule="evenodd" stroke-width="4" clip-rule="evenodd" d="M6.32787 9.43867C6.62827 9.14218 7.11532 9.14218 7.41572 9.43867L9.46701 11.4632C9.76741 11.7597 9.76741 12.2403 9.46701 12.5368L7.41572 14.5613C7.11532 14.8578 6.62827 14.8578 6.32787 14.5613C6.02746 14.2649 6.02746 13.7842 6.32787 13.4877L7.06599 12.7592H2.76923C2.3444 12.7592 2 12.4193 2 12C2 11.5807 2.3444 11.2408 2.76923 11.2408H7.06599L6.32787 10.5123C6.02746 10.2158 6.02746 9.73515 6.32787 9.43867Z" />
</svg>
        </a>
        {{#Link href="/messenger" textContent="Профиль >>" onClick=onLinkSettings}}{{/Link}}
        </div>
        <div class='search'>
          <form class='container'>
            <input type='text' maxlength='12' placeholder='Поиск чатов' class='searchbar' />
            <button class='button' type='submit' class='search-button'>
            </button>
          </form>
        </div>
        <div class='chats__left-link'>
          {{#Link path="javascript:void(0)" textContent="Добавить чаты >>" onClick=onAddChats}}{{/Link}}
          {{#Link path="javascript:void(0)" textContent="Добавить пользователя >>" onClick=onAddUser}}{{/Link}}
          {{#Link path="javascript:void(0)" textContent="Удалить пользователя >>" onClick=onDeleteUser}}{{/Link}}
        </div>
        <div class="selected-chat">
          {{#each chats}}
            {{{ChatItem id=this.id avatar=this.avatar onClick=../onChatClick title=this.title  time="12.00" unreadCount=this.unreadCount id=this.id}}}
          {{/each}}
        </div>
      </div>
      <div class='chats__right'>
        <div class='right__top'>
          <div class='right__top-left'>
            <div class='right__top-avatar'>
              <img class='top-avatar' src='${avatar}' alt='avatar' width="45" height="45"/>
            </div>
            <div class='right__top-nickname'>
              <p class='top-nickname'>Выберите чат, чтобы начать общение</p>
            </div>
          </div>
          
          <div id='blackout'>
            <div id='modal'>
              <a class='btn' href='#confirmation'>Удалить чат</a>
              <a class='btn' href='#' id='close'>Закрыть окно</a>
            </div>
          </div>
          <div id='confirmation'>
            <div id='modal-confirm'>
              <a class='btn' href='/pages/chats'>Подтвердите!</a>
              <a class='btn' href='#' id='close'>Закрыть окно</a>
            </div>
          </div>
        </div>
        <div class='message'>
        
        </div>
        
        <div class='sending'>
          <form class='example-1' enctype='multipart/form-data'>
            <label class='label'>
              <img src='${clip}' alt='' />
            </label>
            <div class="example-1__wrap">
            {{{Input
              ref="messageInputRef"
              type="text"
              placeholder="Сообщение"
              name="Message"
              class="sending__message"
              onInput=onInput
              onFocus=onFocus
              onBlur=onBlur
            }}}
            {{{Error ref="errorRef" text=error}}}
            </div>
            {{{Button textContent="отправить" className="sending__button" onClick=onSubmit}}}
          </form>
          </div>
      </div>

    </div>
    </main>
    `
  }
}

export default withRouter(withStore(withUser(withChats(ChatsPage))));

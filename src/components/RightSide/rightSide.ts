import Block from '../../core/Block';
import avatar from '../../assets/img/avatar.png';
import clip from '../../assets/img/clip.svg'
import {urlAPI} from '../../index';

type RightSideProps = {
  onClick?: () => void;
  avatar1?: string | null;
  title1?: string;
  lastMessage1?: string | null;
  time1?: string;
  unreadCount1?: number;
  id?: number;
  href?: string;
} 

export class RightSide extends Block {
  static componentName = 'RightSide';

  constructor({ onClick, ...props}: RightSideProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
    <div class='chats__right'>
      <div class='right__top'>
        <div class='right__top-left'>
          <div class='right__top-avatar'>
            {{#if avatar}}
              <img class='top-avatar' src="${urlAPI}/resources/{{avatar1}}" width="45" height="45" alt="avatar"/>
            {{else}}
              <img class='top-avatar' src='${avatar}' alt='avatar' width="45" height="45"/>
            {{/if}} 
          </div>
          <div class='right__top-nickname'>
            <p class='top-nickname'>{{title}}</p>
          </div>
        </div>
        <a href='#blackout' class='right__top-dots'>
          <?xml version="1.0" ?><svg enable-background="new 0 0 40 40" id="Слой_1" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g><g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g><g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g><g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g><g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>
        </a>
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
      <div class='chats__right-date'>{{time1}}</div>
      <div class='message'>
        <div class='message__content'>
          <div class='message__content-text'>
            {{#if lastMessage1}}
              {{lastMessage1}}
            {{else}}
              В этом чате пока нет сообщений
            {{/if}}
          </div>
          <div class='message__content-time'>{{time1}}</div>
        </div>
        <div class='message__answer'>
          <div class='message__answer-text'>
            Хорошо!
          </div>
          <div class='message__answer-time'>12.00</div>
        </div>
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
    `
  }
}

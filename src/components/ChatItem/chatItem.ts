import Block from '../../core/Block';
import avatar from '../../assets/img/avatar.png';
import {urlAPI} from '../../index';


type ChatItemProps = {
  onClick?: () => void;
  avatar?: string | null;
  title: string;
  lastMessage: string | null;
  time: string;
  unreadCount: number;
  id?: number;
  href?: string;
} 
export class ChatItem extends Block {
  static componentName = 'ChatItem';

  constructor({ onClick, ...props}: ChatItemProps) {
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
    <div class='chats__list active' data-id='{{id}}'>
      <div class='chats__list-avatar'>
      {{#if avatar}}
        <img src="${urlAPI}/resources/{{avatar}}" width="45" height="45" alt="avatar"/>
      {{else}}
        <img src="${avatar}" width="45" height="45" alt="avatar"/>
      {{/if}}
      </div>
      <div class='chats__list-content'>
        <div class='chats__list-nickname'>{{title}}</div>
        <div class='chats__list-text'>{{lastMessage}}</div>
      </div>
      <div class='chats__list-activity'>
        <time class='chats__list-time'>{{time}}</time>
        <div class='chats__list-number'>
          <div>{{unreadCount}}</div>
        </div>
      </div>
    </div>
    `;
  }
}
// require('babel-core/register');
import Block from '../../core/Block';
import {withUser, withStore, withRouter } from '../../utils';
import { CoreRouter } from '../../core';
import { Store } from '../../core/Store';
import { passwordUp } from '../../services/auth';
import Input from '../../components/input';
import Data from '../../components/data';
import registerComponent from '../../core/registerComponent';
import Button from '../../components/Button';
import ErrorComponent from '../../components/error';
import { validateForm, ValidateType } from '../../helpers/validateRegForm';
import avatar from '../../assets/img/avatar.png';
import clip from '../../assets/img/clip.svg';
import send from '../../assets/img/send.svg'

registerComponent(Input);
registerComponent(Data);
registerComponent(Button);
registerComponent(ErrorComponent);


export class ChangingPasswordPage extends Block {

  static componentName = 'ChangingPasswordPage';

  constructor() {
    super()

    this.setProps({
      store: window.store,
      onInput: (e: Event): void => {
        
        const inputEl = e.target as HTMLInputElement;
              
        const type = ValidateType[inputEl.name as keyof typeof ValidateType];
                
        const errorMessage = validateForm([{ type: type, value: inputEl.value }]);
                
        let el;
        if (type === ValidateType.Password) {
          el = this.refs.passwordInputRef;
        } else if (type === ValidateType.ReplayPassword) {
          el = this.refs.replayPasswordInputRef;
        } else if (type === ValidateType.OldPassword) {
          el = this.refs.oldPasswordInputRef;
        }
        
        el?.refs.errorRef.setProps({ text: errorMessage });
      },
      onFocus: (): void => console.log('focus'),
      onBlur: (): void => console.log('blur'),
      onSubmit: (): void => {

        const oldPasswordEl = this.element?.querySelector('input[name="OldPassword"]') as HTMLInputElement;
        const passowrdEl = this.element?.querySelector(
          'input[name="Password"]',
        ) as HTMLInputElement;
        const replayPasswordEl = this.element?.querySelector('input[name="ReplayPassword"]') as HTMLInputElement;
        
        const errorMessageOldPassword = validateForm([
          { type: ValidateType.OldPassword, value: oldPasswordEl.value }
        ]);

        const errorMessagePassword = validateForm([
          { type: ValidateType.Password, value: passowrdEl.value }
        ]);

        const errorMessageReplayPassword = validateForm([
          { type: ValidateType.ReplayPassword, value: replayPasswordEl.value }
        ]);

        

        
        if (errorMessageOldPassword || errorMessagePassword || errorMessageReplayPassword ) {
          console.log('Ошибка ввода данных');
          
          if (errorMessageOldPassword) {
            this.refs.oldPasswordInputRef.refs.errorRef.setProps({ text: errorMessageOldPassword });
          }
          if (errorMessagePassword) {
            this.refs.passwordInputRef.refs.errorRef.setProps({ text: errorMessagePassword });
          }
          if (errorMessageReplayPassword) {
            this.refs.replayPasswordInputRef.refs.errorRef.setProps({ text: errorMessageReplayPassword });
          }
          
        } else if (passowrdEl.value !== replayPasswordEl.value) {
            this.refs.replayPasswordInputRef.refs.errorRef.setProps({ text: 'Пароли не совпадают!' });
        } else {
          
          const data = {
            oldPassword: oldPasswordEl.value,
            newPassword: passowrdEl.value,
            replayPasswordValue: replayPasswordEl.value,
          }
          
          this.props.store.dispatch(passwordUp, {oldPassword: oldPasswordEl.value, newPassword: passowrdEl.value});
        }
        
      }
    });
  }


  render() {
    return `
    <div class='wrap'>
      <div class='avatar'>
        <img src='${avatar}' alt='Семен' />
      </div>
    <form class='change__form'>
      {{{ Data
        ref="oldPasswordInputRef"
        item="Старый пароль"
        onInput=onInput
        onFocus=onFocus
        type="password"
        name="OldPassword"
        placeholder="•••••••"
        id="OldPassword"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="passwordInputRef"
        item="Новый пароль"
        onInput=onInput
        onFocus=onFocus
        type="password"
        name="Password"
        placeholder="•••••••"
        id="Password"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="replayPasswordInputRef"
        item="Повторите пароль"
        onInput=onInput
        onFocus=onFocus
        type="password"
        name="ReplayPassword"
        placeholder="•••••••"
        id="ReplayPassword"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{Button textContent="Сохранить" className="btn" onClick=onSubmit}}}
    <div class="btn"><a href="/settings">Вернуться назад</a></div>
    </form>
  </div>
    `
  }
}

export default withRouter(withStore(withUser(ChangingPasswordPage)));
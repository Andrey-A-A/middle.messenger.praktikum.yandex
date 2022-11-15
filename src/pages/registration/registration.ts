import Block from '../../core/Block';
import { withStore, withRouter } from '../../utils';
import Input from '../../components/input';
import Data from '../../components/data'
import registerComponent from '../../core/registerComponent'
import Button from '../../components/Button';
import ErrorComponent from '../../components/error';
import { validateForm, ValidateType } from '../../helpers/validateRegForm';
import { signUp } from '../../services/auth';

registerComponent(Input);
registerComponent(Data);
registerComponent(Button);
registerComponent(ErrorComponent);

export class RegistrationPage extends Block {

  static componentName = 'RegistrationPage';

  constructor() {
    super()

    this.setProps({
      error: '',
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
      display_name: '',
      replay_password: '',
      store: window.store,
      router: window.router,
      onInput: (e: Event): void => {
        
        const inputEl = e.target as HTMLInputElement;
        const type = ValidateType[inputEl.name as keyof typeof ValidateType];
        const errorMessage = validateForm([{ type: type, value: inputEl.value }]);

        let el;
        for (const key in ValidateType) {
          const keyI = key as keyof typeof ValidateType;
          if (type === ValidateType[keyI]) {
            el = this.refs[`${type}InputRef`]
          }
          
        }
        
        el?.refs.errorRef.setProps({ text: errorMessage });
      },
      onFocus: (): void => console.log('focus'),
      onBlur: (): void => console.log('blur'),
      onSubmit: (): void => {
        
        const loginEl = this.element?.querySelector('input[name="Login"]') as HTMLInputElement;
        const passowrdEl = this.element?.querySelector(
          'input[name="Password"]',
        ) as HTMLInputElement;
        const replayPasswordEl = this.element?.querySelector('input[name="ReplayPassword"]') as HTMLInputElement;
        const firstNameEl = this.element?.querySelector('input[name="FirstName"]') as HTMLInputElement;
        const lastNameEl = this.element?.querySelector('input[name="LastName"]') as HTMLInputElement;
        const displayNameEl = this.element?.querySelector('input[name="NickName"]') as HTMLInputElement;
        const phoneEl = this.element?.querySelector('input[name="Phone"]') as HTMLInputElement;
        const emailEl = this.element?.querySelector('input[name="Email"]') as HTMLInputElement;
        
        const errorMessageLogin = validateForm([
          { type: ValidateType.Login, value: loginEl.value }
        ]);

        const errorMessagePassword = validateForm([
          { type: ValidateType.Password, value: passowrdEl.value }
        ]);

        const errorMessageReplayPassword = validateForm([
          { type: ValidateType.ReplayPassword, value: replayPasswordEl.value }
        ]);

        const errorMessageFirstName = validateForm([
          { type: ValidateType.FirstName, value: firstNameEl.value }
        ]);

        const errorMessageLastName = validateForm([
          { type: ValidateType.LastName, value: lastNameEl.value }
        ]);

        const errorMessagePhone = validateForm([
          { type: ValidateType.Phone, value: phoneEl.value }
        ]);

        const errorMessageNickName = validateForm([
          { type: ValidateType.DisplayName, value: displayNameEl.value }
        ]);

        const errorMessageEmail = validateForm([
          { type: ValidateType.Email, value: emailEl.value }
        ]);

        
        if (errorMessageLogin || errorMessagePassword || errorMessageReplayPassword || errorMessageFirstName || errorMessageLastName || errorMessagePhone || errorMessageNickName || errorMessageEmail) {
          console.log('Ошибка ввода данных');
          
          if (errorMessageLogin) {
            this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessageLogin });
          }
          if (errorMessagePassword) {
            this.refs.passwordInputRef.refs.errorRef.setProps({ text: errorMessagePassword });
          }
          if (errorMessageReplayPassword) {
            this.refs.replayPasswordInputRef.refs.errorRef.setProps({ text: errorMessageReplayPassword });
          }
          if (errorMessageFirstName) {
            this.refs.firstNameInputRef.refs.errorRef.setProps({ text: errorMessageFirstName });
          }
          if (errorMessageLastName) {
            this.refs.lastNameInputRef.refs.errorRef.setProps({ text: errorMessageLastName });
          }
          if (errorMessagePhone) {
            this.refs.phoneInputRef.refs.errorRef.setProps({ text: errorMessagePhone });
          }
          if (errorMessageNickName) {
            this.refs.nickNameInputRef.refs.errorRef.setProps({ text: errorMessageNickName });
          }
          if (errorMessageEmail) {
            this.refs.emailInputRef.refs.errorRef.setProps({ text: errorMessageEmail });
          }
        } else if (passowrdEl.value !== replayPasswordEl.value) {
            this.refs.replayPasswordInputRef.refs.errorRef.setProps({ text: 'Пароли не совпадают!' });
        } else {
          
          const data = {
            first_name: firstNameEl.value,
            second_name: lastNameEl.value,
            login: loginEl.value,
            email: emailEl.value,
            password: passowrdEl.value,
            phone: phoneEl.value,
            display_name: displayNameEl.value,
            replay_password: replayPasswordEl.value,
          }
          console.log("Данные введенные в форму", data);
          this.props.store.dispatch(signUp, data);
        }
        console.log('End!');
      }
    });
  }

  render() {
    return `
    <div class='wrap__registration'>
      <h1>Регистрация</h1>
      <form class='change__form'>
      {{{ Data
        ref="emailInputRef"
        item="Почта"
        onInput=onInput
        onFocus=onFocus
        type="email"
        name="Email"
        placeholder="yandex@ya.ru"
        id="email"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="loginInputRef"
        item="Логин"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="Login"
        placeholder="Ваш логин"
        id="login"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="firstNameInputRef"
        item="Имя"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="FirstName"
        placeholder="Степан"
        id="Firstname"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="lastNameInputRef"
        item="Фамилия"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="LastName"
        placeholder="Степанов"
        id="Lastname"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="nickNameInputRef"
        item="Имя в чате"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="NickName"
        placeholder="Степан"
        id="NickName"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="phoneInputRef"
        item="Телефон"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="Phone"
        placeholder="+79167777777"
        id="Phone"
      }}}
      {{#if error}}{{error}}{{/if}}
      {{{ Data
        ref="passwordInputRef"
        item="Пароль"
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
      {{{Button textContent="Регистрация" className="btn" onClick=onSubmit}}}
      <div class='btn'><a href='/login'>Вернуться назад</a></div>
      </form>
    </div>
    `
  }
}

export default withRouter(withStore(RegistrationPage));
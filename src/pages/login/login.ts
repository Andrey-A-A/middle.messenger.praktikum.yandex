import Block from '../../core/Block';
import { validateForm, ValidateType } from '../../helpers/validateRegForm';
import { CoreRouter } from '../../core';
import {Store} from '../../core/Store';
import ControlledInput from '../../components/controlledInput';
import { withStore, withRouter } from '../../utils';
import { login, logout } from '../../services/auth';
import Button from '../../components/Button';
import Input from '../../components/input';
import registerComponent from '../../core/registerComponent'
import ErrorComponent from '../../components/error';

registerComponent(Button);
registerComponent(Input);
registerComponent(ControlledInput);
registerComponent(ErrorComponent);

type LoginPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  formError?: () => string | null;
  onInput: (e: Event) => void;
  onSubmit: () => void;
  onLogout: () => void;
  onLinkSignUp?: (e: Event) => void;
};

export class LoginPage extends Block<LoginPageProps> {

  static componentName = 'LoginPage';

  constructor() {
    super();
    this.setProps({
      store: window.store,
      router: window.router, 
      onInput: (e: Event): void => {
        
        const inputEl = e.target as HTMLInputElement;
        
        const type = ValidateType[inputEl.name as keyof typeof ValidateType];
        const errorMessage = validateForm([{ type: type, value: inputEl.value }]);
        
        let el;
        if (type === ValidateType.Login) {
          el = this.refs.loginInputRef;
        } else if (type === ValidateType.Password) {
          el = this.refs.passwordInputRef;
        }
        el?.refs.errorRef.setProps({ text: errorMessage });
      },

      onSubmit: (): void => {
                
        const loginEl = this.element?.querySelector('input[name="Login"]') as HTMLInputElement;
        const passowrdEl = this.element?.querySelector(
          'input[name="Password"]',
        ) as HTMLInputElement;

        const errorMessageLogin = validateForm([
          { type: ValidateType.Login, value: loginEl.value }
        ]);

        const errorMessagePassword = validateForm([
          { type: ValidateType.Password, value: passowrdEl.value }
        ]);

        if (errorMessageLogin || errorMessagePassword) {
          if (errorMessageLogin) {
            this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessageLogin });
          }
          if (errorMessagePassword) {
            this.refs.passwordInputRef.refs.errorRef.setProps({ text: errorMessagePassword });
          }
        } else {
          
          const data = {
            login: loginEl.value,
            password: passowrdEl.value,
          }

          this.props.store.dispatch(login, data);
        }
      },
      onLogout: () => this.props.store.dispatch(logout),
      onLinkSignUp: (e: Event): void => {
        e.preventDefault;
        window.router.go('/sign-up');}
    });
  }

  render() {
    return `
    <div class='login__wrap'>
    <h1 class='heading'>Авторизация</h1>
    <form class='login__form'>
    <label for='login'>Логин</label>
      {{{ControlledInput
        ref="loginInputRef"
        onInput=onInput
        onFocus=onFocus
        type="text"
        name="Login"
        placeholder="Ваш_логин"
        label="Логин"
        id="login"
      }}}
    <label for='password'>Пароль</label>
      {{{ControlledInput
        ref="passwordInputRef"
        onInput=onInput
        onFocus=onFocus
        type="password"
        name="Password"
        placeholder="•••••••"
        id="passoword"
      }}}
      {{{Button textContent="Вход" className="btn" onClick=onSubmit}}}
      {{{Button textContent="Выйти" className="btn" onClick=onLogout}}}
      <div class='btn'>
        {{#Link href="/sign-up" textContent="Регистрация" onClick=onLinkSignUp}}{{/Link}}
      </div>
      <div class='btn'><a href='/messenger'>Вернуться назад</a></div>
    </form>
  </div>
    `;
  }
}

export default withRouter(withStore(LoginPage));
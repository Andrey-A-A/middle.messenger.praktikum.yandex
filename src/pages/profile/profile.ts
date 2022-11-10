import Block from '../../core/Block';
import { withUser, withStore, withRouter } from '../../utils';
import { CoreRouter } from '../../core';
import { Store } from '../../core/Store';
import { logout } from '../../services/auth';
import DataList from '../../components/dataList';
import registerComponent from '../../core/registerComponent';
import Button from '../../components/Button';
import ErrorComponent from '../../components/error';
import process from 'process';
import avatar from '../../assets/img/avatar.png';

registerComponent(DataList);
registerComponent(Button);
registerComponent(ErrorComponent);

type ProfilePageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  user: User | null;
  onLogout?: () => void;
  onLink?: () => void;
};

export class ProfilePage extends Block<ProfilePageProps> {

  static componentName = 'ProfilePage';

  constructor(props: ProfilePageProps) {
    super(props)
console.log('props=', props);

    this.setProps({
      store: props.store,
      router: props.router,
      user: props.user,
      onLogout: () => this.props.store.dispatch(logout),
      onLink: () => {window.router.go('/messenger');}
    });
    console.log('this.props.user=', this.props.user);    
  }

  render() {
    const { avatar, displayName, email, firstName, id, login, phone, secondName } = this.props.user;
    if (!this.props.user) {
      return `
      <div class='wrap'>Пользователь не авторизован</>
      `
    }

    return `
    <div class='wrap'>
      <div class='avatar'>
        <img src='${process.env.API_ENDPOINT}/resources/${avatar}' alt='${firstName}' />
      </div>
      <div class='name'>${firstName}</div>
      <div class='data'>
      {{{DataList item="Почта" itemData="${email}"}}}
      {{{DataList item="Логин" itemData="${login}"}}}
      {{{DataList item="Имя" itemData="${firstName}"}}}
      {{{DataList item="Фамилия" itemData="${secondName}"}}} 
      {{{DataList item="Имя в чате" itemData="${displayName}"}}} 
      {{{DataList item="Телефон" itemData="${phone}"}}}   
    </div>
    <div class="management">
      <a href='/changing-settings'>Изменить данные</a>
      <a href='/changing-password'>Изменить пароль</a>
      <a href='/messenger'>Вернуться</a>
    </div>
  </div>
    `
  }
}

export default withRouter(withStore(withUser(ProfilePage)));
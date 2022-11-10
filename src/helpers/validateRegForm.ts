export enum ValidateType {
  Login = 'login',
  Password = 'password',
  ReplayPassword = 'replayPassword',
  OldPassword = 'oldPassword',
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  DisplayName = 'displayName',
  Phone = 'phone',
  Message = 'message',
}

type ValidateRule = {
  type: ValidateType;
  value: string;
};

const NAME = /^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z-]{1,20}$/;
const PASSWORD = /^((?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{8,41})$/
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PHONE_REGEXP = /^((8|\+)[0-9]{10,15})$/;

export function validateForm(rules: ValidateRule[]) {

  let errorMessage = '';

  for (let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];
    

    if (type === ValidateType.Login) {
      const LOGIN = /^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/;
      const isEmailValid = (value: string) => {
        return LOGIN.test(value);
      }
      if (value.length === 0) {
        errorMessage = 'Поле логин не должно быть пустым';
        break;
      } else if (!isEmailValid(value)) {
        errorMessage = 'Логин должен быть написан латиницей от 3 до 20 знаков, можно использовать также цифры, дефис и подчеркивание';
        break;
      } 
    } else if (type === ValidateType.Password || type === ValidateType.ReplayPassword || type === ValidateType.OldPassword) {
      const isEmailValid = (value: string) => {
        return PASSWORD.test(value);
      }
      if (value.length === 0) {
        errorMessage = 'Поле пароль не должен быть пустым';
        break;
      } else if (!isEmailValid(value)) {
        errorMessage = 'Пароль должен быть написан латиницей от 8 до 40 знаков, обязательно одна цифра и одна заглавная буква';
        break;
      } 
    } else if (type === ValidateType.FirstName) {
      const isEmailValid = (value: string) => {
        return NAME.test(value);
      }
      if (value.length === 0) {
        errorMessage = 'Поле имя не должно быть пустым';
        break;
      } else if (!isEmailValid(value)) {
        errorMessage = 'Имя должно быть с заглавной буквы, более 1 буквы';
        break;
      } 
    } else if (type === ValidateType.DisplayName) {
      if (value.length === 0) {
        errorMessage = 'Поле имя в чате не должно быть пустым';
        break;
      } else if (value.length < 4) {
        errorMessage = 'Имя в чате должно содержать более чем 3 символа';
        break;
      }
    } else if (type === ValidateType.LastName) {
      const isEmailValid = (value: string) => {
        return NAME.test(value);
      }
      if (value.length === 0) {
        errorMessage = 'Поле фамилия не должно быть пустым';
        break;
      } else if (!isEmailValid(value)) {
        errorMessage = 'Фамилия должна быть с заглавной буквы, более 1 буквы';
        break;
      } 
    } else if (type === ValidateType.Email) {
      
      const isEmailValid = (value: string) => {
        return EMAIL_REGEXP.test(value);
      }
      if (!isEmailValid(value)) {
        errorMessage = 'Введите корректный email';
        break;
      } 
    } else if (type === ValidateType.Phone) {
      
      const isEmailValid = (value: string) => {
        return PHONE_REGEXP.test(value);
      }
      if (value.length === 0) {
        errorMessage = 'Поле телефон не должно быть пустым';
        break;
      } else if (!isEmailValid(value)) {
        errorMessage = 'Введите корректный номер телефона, номер может начинаться с 8 или с +';
        break;
      } 
    } else if (type === ValidateType.Message) {
      if (value.length === 0) {
        errorMessage = 'Поле сообщение не должно быть пустым';
        break;
      } 
    }
  }
  return errorMessage;
}

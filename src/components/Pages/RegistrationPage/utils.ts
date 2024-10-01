export function checkLogin(text: string) {
  // Функция валидации поля ввода логина
  if (text.length < 4) {
    return { status: true, message: 'Не менее 4 символов' };
  } else if (text.length > 20) {
    return { status: true, message: 'Не более 20 символов' };
  } else if (text.search(/[^a-zA-Z0-9]/) != -1) {
    return { status: true, message: 'Только латиница и цифры' };
  }
  return { status: false, message: '' };
} 

export function checkPassword(text: string) {
  // Функция валидации поля ввода пароля
  if (text.length < 6) {
    return { status: true, message: 'Не менее 6 символов' };
  } else if (text.search(/\d/) === -1) {
    return { status: true, message: 'Не менее 1 цифры' };
  } else if (text.search(/[A-Z]/) === -1) {
    return { status: true, message: 'Нет заглавных букв' };
  } else if (text.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) {
    return { status: true, message: 'Нет специальных символов' };
  } else if (text.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1) {
    return { status: true, message: 'Некорректный пароль' };
  }
  return { status: false, message: '' };
}

export function checkEmail(text: string) {
  // Функция валидации поля ввода email
  if (text.search(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) === -1) {
    return { status: true, message: 'Некорректный email' };
  }
  return { status: false, message: '' };
} 
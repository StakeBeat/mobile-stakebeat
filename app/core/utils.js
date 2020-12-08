export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password, confirmation) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  if (password != confirmation) return 'Password confirmation does not match.';
  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const digitValidator = digit => {
  if (!digit || digit.length <= 0 || isNaN(digit)) return "Value is not a digit."
  if (digit.length >= 7) return "Index cannot be higher than 1,000,000"
}

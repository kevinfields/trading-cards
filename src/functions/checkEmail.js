export default function checkEmail(text) {
  let emailArr = text.split('');

  if (!emailArr.includes('@')) {
    return '@';
  }

  if (!emailArr.includes('.')) {
    return '.';
  }

  if (emailArr.length > 30) {
    return 'length';
  }

  return 'ok';
}
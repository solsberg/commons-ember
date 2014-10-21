export function makeUrl(email){
  var hash = '';
  if (email !== undefined){
    hash = md5(email.trim().toLowerCase());
  }
  return "http://www.gravatar.com/avatar/" + hash;
}
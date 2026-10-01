const accountKey = 'cinema-local-account';
const sessionKey = 'cinema-local-session';
export function readAccount() {
  try { return JSON.parse(localStorage.getItem(accountKey)); } catch { return null; }
}
export function currentAccount() {
  const account = readAccount();
  return account && sessionStorage.getItem(sessionKey) === account.id ? account : null;
}
async function hash(password, salt) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bytes = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
  return Array.from(new Uint8Array(bytes), value => value.toString(16).padStart(2, '0')).join('');
}
export async function registerAccount(values) {
  if (readAccount()) throw new Error('Bu brauzerdə artıq hesab var. Giriş edin.');
  const salt = crypto.randomUUID();
  const account = { id: crypto.randomUUID(), fullName: `${values.name.trim()} ${values.surname.trim()}`, email: values.email.trim().toLowerCase(), phone: '+994' + values.tel.replace(/\D/g, '').replace(/^994/, ''), birthDate: values.date, avatar: '', salt, passwordHash: await hash(values.password, salt) };
  localStorage.setItem(accountKey, JSON.stringify(account));
}
export async function loginAccount(email, password) {
  const account = readAccount();
  if (!account || account.email !== email.trim().toLowerCase() || account.passwordHash !== await hash(password, account.salt)) throw new Error('Giriş məlumatları düzgün deyil.');
  sessionStorage.setItem(sessionKey, account.id);
}
export function saveAccount(changes) {
  const account = currentAccount();
  if (!account) throw new Error('Hesaba daxil olun.');
  const updated = { ...account, ...changes };
  localStorage.setItem(accountKey, JSON.stringify(updated));
  return updated;
}
export async function changePassword(oldPassword, password) {
  const account = currentAccount();
  if (!account || account.passwordHash !== await hash(oldPassword, account.salt)) throw new Error('Cari şifrə düzgün deyil.');
  const salt = crypto.randomUUID();
  return saveAccount({ salt, passwordHash: await hash(password, salt) });
}
export function logoutAccount() { sessionStorage.removeItem(sessionKey); }
export function deleteAccount() { logoutAccount(); localStorage.removeItem(accountKey); }

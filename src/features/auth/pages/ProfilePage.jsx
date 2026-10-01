import '../styles/profile.css';
import { createElement, useState } from 'react';
import { Navigate, useNavigate, useSearchParams, Link } from 'react-router';
import { FaAddressCard, FaTicketAlt, FaLock, FaPhoneAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { t, useLanguage } from '../../../shared/i18n/language.js';
import { currentAccount, saveAccount, changePassword, logoutAccount, deleteAccount } from '../data/localAccount.js';

const tabs = [['profile', 'Profil', FaAddressCard], ['tickets', 'Mənim Biletlərim', FaTicketAlt], ['password', 'Şifrəni Dəyiş', FaLock], ['phone', 'Telefon nömrəsini dəyiş', FaPhoneAlt], ['email', 'E-poçtu Dəyiş', FaEnvelope]];
function Field({ label, ...props }) {
  return <fieldset className="profile-field"><legend>{t(label)}</legend><input aria-label={t(label)} {...props} /></fieldset>;
}
export default function ProfilePage() {
  useLanguage();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const active = tabs.some(([id]) => id === params.get('tab')) ? params.get('tab') : 'profile';
  const [account, setAccount] = useState(currentAccount);
  const [name, setName] = useState(account?.fullName || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!account) return <Navigate to="/auth" replace />;
  const save = changes => { setAccount(saveAccount(changes)); toast.success(t('Məlumatlar yeniləndi.')); };
  const upload = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type) || file.size > 3.1 * 1024 * 1024) { toast.error(t('JPEG, PNG və ya GIF seçin. Maksimum ölçü 3.1 MB.')); return; }
    const reader = new FileReader();
    reader.onload = () => { try { save({ avatar: reader.result }); } catch { toast.error(t('Şəkli yadda saxlamaq mümkün olmadı.')); } };
    reader.readAsDataURL(file);
  };
  const submitChange = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setBusy(true);
    try {
      if (active === 'password') {
        if (values.password !== values.confirm) throw new Error('Şifrələr eyni deyil.');
        setAccount(await changePassword(values.current, values.password));
        toast.success(t('Şifrə dəyişdirildi.'));
      } else if (active === 'phone') {
        const digits = values.phone.replace(/\D/g, '');
        if (!/^(994)?\d{9}$/.test(digits)) throw new Error('Telefon nömrəsini düzgün daxil edin.');
        save({ phone: '+' + (digits.length === 9 ? '994' : '') + digits });
      } else save({ email: values.email.trim().toLowerCase() });
      form.reset();
    } catch (error) { toast.error(t(error.message)); } finally { setBusy(false); }
  };
  return <main className="profile-page">
    <nav aria-label={t('Profil bölmələri')} className="profile-tabs">{tabs.map(([id, label, Icon]) => <button key={id} onClick={() => setParams(id === 'profile' ? {} : { tab: id })} aria-current={active === id ? 'page' : undefined}>{createElement(Icon, { 'aria-hidden': true })}{t(label)}</button>)}</nav>
    <h1>{t(active === 'profile' ? 'Mənim Profilim' : tabs.find(([id]) => id === active)[1])}</h1>
    {active === 'profile' ? <div className="profile-grid">
      <section className="profile-card profile-avatar-card">
        <label className="profile-avatar" aria-label={t('Profil şəklini dəyiş')}>
          {account.avatar ? <img src={account.avatar} alt={t('Profil şəkli')} /> : <FaUser aria-hidden="true" />}
          <input type="file" accept="image/jpeg,image/png,image/gif" onChange={upload} aria-label={t('Profil şəklini dəyiş')} />
        </label>
        <p>*.jpeg, *.jpg, *.png, *.gif {t('Maksimum ölçü')} 3.1 MB</p>
        <div className="profile-buttons"><button onClick={() => { logoutAccount(); navigate('/auth'); }}>{t('Çıxış')}</button><button className="profile-delete" onClick={() => setConfirmDelete(true)}>{t('Hesabı Sil')}</button></div>
        {confirmDelete && <div role="alert" className="profile-delete-confirm"><p>{t('Bu brauzerdəki hesab silinsin?')}</p><div className="profile-buttons"><button onClick={() => setConfirmDelete(false)}>{t('Ləğv et')}</button><button className="profile-delete" onClick={() => { deleteAccount(); navigate('/auth'); }}>{t('Sil')}</button></div></div>}
      </section>
      <div className="profile-details">
        <form className="profile-card profile-name" onSubmit={event => { event.preventDefault(); if (!name.trim()) return; try { save({ fullName: name.trim() }); } catch { toast.error(t('Məlumatları yadda saxlamaq mümkün olmadı.')); } }}><Field label="Ad Soyad" value={name} onChange={event => setName(event.target.value)} required maxLength={100} /><button type="submit">{t('Dəyiş')}</button></form>
        <section className="profile-card profile-info"><Field label="Telefon nömrəsi" value={account.phone} readOnly /><Field label="Email" value={account.email} readOnly /><Field label="Doğum tarixi" value={account.birthDate} readOnly /></section>
      </div>
    </div> : active === 'tickets' ? <section className="profile-card profile-empty"><FaTicketAlt /><h2>{t('Hələ biletiniz yoxdur.')}</h2><Link to="/">{t('Filmlərə bax')}</Link></section> : <form key={active} className="profile-card profile-edit" onSubmit={submitChange}>
      {active === 'password' ? <><Field label="Cari şifrə" name="current" type="password" autoComplete="current-password" required /><Field label="Yeni şifrə" name="password" type="password" autoComplete="new-password" minLength={8} required /><Field label="Şifrəni Təsdiqlə" name="confirm" type="password" autoComplete="new-password" minLength={8} required /></> : active === 'phone' ? <Field label="Telefon nömrəsi" name="phone" type="tel" defaultValue={account.phone} required /> : <Field label="Email" name="email" type="email" defaultValue={account.email} required />}
      <button disabled={busy}>{t(busy ? 'Yadda saxlanılır…' : 'Dəyiş')}</button>
    </form>}
  </main>;
}

import { currentAccount, loginAccount } from '../data/localAccount.js';
import { Navigate } from 'react-router';
import { t, useLanguage } from '../../../shared/i18n/language.js';
import { useNavigate } from "react-router"
import { loginSchema } from "../validation/loginSchema.js"
import { useFormik } from "formik"
import { toast } from "react-toastify"

function LoginPage() {
  useLanguage();
  const navigator = useNavigate()  
  const navigate = () => {  
    navigator('register')
  }
  const submit = async values => {
    try { await loginAccount(values.email, values.password); navigator('/general'); toast.success(t('Giriş uğurlu oldu')); }
    catch (error) { toast.error(t(error.message), { position: 'bottom-right' }); }
  };
  const {values , errors , handleChange , handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password : '',
        },
        validationSchema : loginSchema,
        onSubmit : submit
    })
  if (currentAccount()) return <Navigate to="/general" replace />;
  return (
    <div className='px-5'>
        <p className="text-sm text-[#aaa] mb-3">{t("Yerli profil: məlumatlar yalnız bu brauzerdə saxlanılır.")}</p>
        <h1 className='text-[32px] text-white font-semibold'>{t("Giriş")}</h1>
        <div className='w-full py-20  flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full md:w-max flex flex-col '>    
                <input id="email" value={values.email} onChange={handleChange} type='text' placeholder={t("Email")} className='outline-0 p-3 mb-10 text-[#9CA3AF] text-[17px] w-full border-b-1 border-white md:w-[600px]'/>
                {errors.email && <p className="text-red-500">{t(errors.email)}</p>}
                <input id="password" value={values.password} onChange={handleChange} type='password' placeholder={t("Şifrə")} className='outline-0 p-3 text-[#9CA3AF] text-[17px] w-full border-b-1 border-white md:w-[600px]'/>
                {errors.password && <p className="text-red-500">{t(errors.password)}</p>}
                
                <p className='text-end font-semibold text-[#9CA3AF] py-2'>{t("Şifrəni unutmusunuz?")}</p>
                <button type="submit" className='cursor-pointer flex items-center font-semibold justify-center bg-[#D52B1E] opacity-65 hover:opacity-100 duration-200 rounded-[20px]  mt-10 h-[36px] px-4 py-2  text-white text-sm hover:bg-[#A81A1A] transition w-full  max-sm:!p-0 max-sm:!text-[12px] max-sm:leading-3'>{t("Giriş")}</button>
                <p className='text-center font-semibold text-[#9CA3AF] py-5'>{t("Burada yenisiniz? ")}<span className='underline cursor-pointer ' onClick={navigate}>{t("Qeydiyyat")}</span></p>
            </form>
        </div>  
    </div>
  )
}

export default LoginPage

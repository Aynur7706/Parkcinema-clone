import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name : yup.string().required("Adınızı Daxil Edin"),
    surname : yup.string().required('Soyadınızı Daxil Edin'),
    password : yup.string().required("Şifrə Daxil Edin"),
    resetpassword : yup.string().oneOf([yup.ref('password')], "Sifreler eyni deyil").required("Şifrəni Yenidən Daxil Edin"),
    date : yup.date("Doğru tarix daxil edin").required("Vaxt Daxil Edin"),
    email: yup.string().email("Doğru Email Daxil Edin").required("Email Daxil Edin"),
    tel : yup.string().required("Telefon Nömrəsi Daxil Edin")
})
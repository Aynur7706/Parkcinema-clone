import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email : yup.string().email('Doğru Email Daxil Edin').required("Zəhmət Olmasa Email Daxil Edin"),
    password : yup.string().required('Zəhmət Olmasa Şifrə Daxil Edin')
})
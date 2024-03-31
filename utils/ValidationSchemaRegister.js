import * as Yup from 'yup';
const getChatacterValidationError = (str) =>
{
    return `Your password must hava at least 1 ${str} character`
}
export const registerSchema = Yup.object().shape({
    name: Yup.string().required('')
        .min(4, 'Too Short!')
        .max(15, 'Too Long!'),
    email: Yup.string().email("Enter A Valid Email Address")
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required(''),
     password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/[0-9]/,getChatacterValidationError("digit"))
        .matches(/[a-z]/,getChatacterValidationError("lowercase"))
        .matches(/[A-Z]/,getChatacterValidationError("uppercase"))
        .matches(
            /^(?=.*[~'!@#$%^&*()--+={}[\]:;"'<>,.?/_]).*$/
        ,getChatacterValidationError("special required"))
        ,
    ConfirmPassword: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
       
        .oneOf([Yup.ref("password")],"Your Password Do not match")
});
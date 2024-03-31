import * as Yup from 'yup';
export  const loginpSchema = Yup.object().shape({
  email: Yup.string().email("Enter A Valid Email Address")
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(''),
    password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required(''),
});
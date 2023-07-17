import * as yup from 'yup';

const schema = {
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Insira uma senha')
    .min(6, 'A senha deve ter um mínimo de 6 caracteres'),
};

export default schema;

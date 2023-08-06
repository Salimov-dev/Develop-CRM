import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Email обязателен для заполнения"),
  password: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
});

export const objectSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  contact: yup.object().shape({
    // phone: yup.string().required("Телефон обязателен для заполнения"),
    name: yup.string().matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
    email: yup.string().email("Некорректный адрес электронной почты"),
  }),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
    metro: yup.string(),
  }),
  // estateOptions: yup.object().shape({
    // totalSquare: yup
    // .number()
    // .min(2, "Минимум 2 символа")
    // .max(4, "Максимум 4 символа")
    // .matches(/\d+/g, "Вводите только цифры")
  // }),
  description: yup.object().shape({
    fullDescription: yup.string(),
    // .required("Полное описание обязательно для заполнения"),
  }),
});

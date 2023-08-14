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
    name: yup.string().matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
    email: yup.string().email("Некорректный адрес электронной почты"),
  }),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
  }),
  estateOptions: yup.object().shape({
    currentRenters: yup.string().required("Выберите арендатора"),
    estateTypes: yup.string().required("Выберите тип"),
    objectTypes: yup.string().required("Выберите тип"),
  }),
});

export const managerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Email обязателен для заполнения"),
  password: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
  status: yup.string().required("Статус обязателен для заполнения"),
  contacts: yup.object().shape({
    firstName: yup
      .string()
      .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры")
      .required("Имя обязательно для заполнения"),
    surName: yup
      .string()
      .matches(/^([^0-9]*$)/, "Отчество не должно содержать цифры")
      .required("Отчество обязательно для заполнения"),
    lastName: yup
      .string()
      .matches(/^([^0-9]*$)/, "Фамилия не должна содержать цифры")
      .required("Фамилия обязательна для заполнения"),
    phone: yup
      .number()
      .typeError("Телефон должен быть числом")
      .required("Телефон обязателен для заполнения"),
  }),
  contract: yup.object().shape({
    startDate: yup
      .date()
      .required("Заполните начало договора")
      .typeError("Должна должна быть датой")
      .max(yup.ref("endDate"), "Начальная дата не может быть позже конечной"),
    endDate: yup
      .date()
      .required("Заполните окончание договора")
      .typeError("Должна должна быть датой")
      .min(yup.ref("startDate"), "Конечная дата не может быть ранее начальной"),
    trialPeriod: yup.string().nullable(),
  }),
});

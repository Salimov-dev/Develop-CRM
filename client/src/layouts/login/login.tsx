// libraries
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import { Button, Typography } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// store
import { login } from "../../store/users-store";
// components
import LoginForm from "./components/login-form";
import { Component, AuthForm, Title } from "./styled/styled";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введите email корректно")
    .required("Email обязателен для заполнения"),
  password: yup
    .string()
    .min(8, "Слишком короткий пароль - введите не менее 8 символов")
    .required("Пароль обязателен для заполнения"),
});

const Login = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ payload: data }));
    navigate("/");
  };

  const isFormValid = !Object.keys(errors).length;

  return (
    <>
      <Component>
        <AuthForm>
          <Title>
            <Typography variant="h5">Войти</Typography>
          </Title>
          <LoginForm
            data={data}
            onSubmit={handleSubmit}
            onChange={handleChange}
            errors={errors}
            register={register}
            isFormValid={isFormValid}
          />
        </AuthForm>
      </Component>
    </>
  );
};

export default Login;

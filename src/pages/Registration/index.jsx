import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthRegister, selectIsAuth } from "../../redux/slices/auth-slice";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuthRegister(values));
    console.log(data);
    if (!data.payload) {
      return alert("Siz ro'yxatdan o'tmadingiz!");
    }
    const { token } = data.payload;
    if (token) {
      window.localStorage.setItem("token", token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("fullName", { required: "To'liq kiriting" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
          type="text"
          helperText={errors.fullName?.message}
          error={Boolean(errors.fullName?.message)}
        />
        <TextField
          {...register("email", { required: "Emailni kiriting" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
          type="email"
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
        />
        <TextField
          {...register("password", { required: "Parolni kiriting" })}
          className={styles.field}
          label="Пароль"
          fullWidth
          type="password"
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
        />
        <Button
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

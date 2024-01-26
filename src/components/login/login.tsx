import { Alert, AlertTitle, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { doLogin } from "../../store/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postErrorMessage } from "../../store/actions/message";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (event: any) => {
    console.log(event);
    dispatch(
      doLogin(event.username, event.password, (err) => {
        if (err) {
          dispatch(postErrorMessage(err.message));
        } else {
          navigate("/home");
        }
      })
    );
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div className="login login-wrapper">
      <form
        className="login login-form login-form__wrapper"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h2" className="login login-form login-form__title">
          Login
        </Typography>
        <div className="login login-form login-form__login-wrapper">
          <TextField
            label={"Username"}
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            className="login login-form login-form__input"
            type="username"
          />
          <TextField
            label={"Password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className="login login-form login-form__input"
            type="password"
          />
          <div className="login login-form login-form__button-wrapper">
            <Button
              variant="contained"
              className="login login-form login-form__button"
              type="submit"
            >
              <Typography variant="body2">Login</Typography>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

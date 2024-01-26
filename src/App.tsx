import { Routes, Route } from "react-router-dom";
import "./shared/style/main.scss";
import { Login } from "./components/login/login";
import { Home } from "./components/home/home";

import { NotFound } from "./components/errors/404";
import PrivateRoute from "./components/login/login-checker";
import React from "react";
import { Register } from "./components/register/register";
import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./store/format";
import { closeMessage } from "./store/actions/message";

function App() {
  const open = useSelector((state: AppState) => state.messageState.open);
  const message = useSelector((state: AppState) => state.messageState.message);
  const title = useSelector((state: AppState) => state.messageState.messageTitle);
  const severity = useSelector((state: AppState) => state.messageState.severity);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeMessage());
  }
  

  return (
    <div className="container">
      <Routes>
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/home"} element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => {close}}
        key={'top' + 'right'}
      >
        <Alert severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
          <IconButton onClick={close}><CloseIcon /></IconButton>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

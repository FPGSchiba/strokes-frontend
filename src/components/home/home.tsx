import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doSignOut } from "../../store/actions/user";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../store/format";
import { getSession, getUser, test } from "../../services/amplify";
import { AuthSession } from '@aws-amplify/core/dist/esm/singleton/Auth/types';
import { AuthUser } from "aws-amplify/auth";

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<undefined | AuthUser>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log(currentUser);
    };

    fetchData();
  }, []);
  const onSignOut = () => {
    dispatch(
      doSignOut((err) => {
        if (err) {
          console.log(err);
        } else {
          navigate("/login");
        }
      })
    );
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>{user ? user.username : "loading..."}</h2>
      <Button variant="contained" onClick={test}>Test</Button>
      <Button variant="contained" onClick={onSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

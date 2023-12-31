"use client";

import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./GlobalRedux/Features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import TopPage from "./Components/TopPage";
import Auth from "./Components/Auth";

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const dispath = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispath(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispath(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispath]);

  return <>{user.uid ? <TopPage /> : <Auth />}</>;
};

export default Home;

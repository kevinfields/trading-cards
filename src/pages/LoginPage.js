import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import ADD_SIGN_IN from "../reducers/ADD_SIGN_IN";

const LoginPage = (props) => {

  const makeAccountIfNone = async (user) => {
    let data;
    await props.usersRef
      .doc(user.uid)
      .get()
      .then((doc) => {
        data = doc.data();
      });

    if (data !== undefined) {
      return;
    } else {
      const loginTime = new Date();
      await props.usersRef.doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
        xpTotal: 0,
        xpRemaining: 0,
        cards: [],
        wins: 0,
        losses: 0,
        lastLogin: loginTime,
      });
    }
  };

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider).then((data) => {
      makeAccountIfNone(data.user).then(() => {
        ADD_SIGN_IN(props.usersRef.doc(data.user.uid), new Date());
      })
      props.nav('/');
    });
  };

  return (
    <div className="page">
      <button className='login-button' onClick={() => login()}>Log In or Sign Up</button>
    </div>
  );
};

export default LoginPage;
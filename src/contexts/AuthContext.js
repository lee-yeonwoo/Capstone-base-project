// import React, { useContext, useState } from "react";
// import { auth } from "../firebase/config";
// import { useEffect } from "react";

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();
//   const [loading, setLoading] = useState(true);

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

//   function login(email, password) {
//     return auth.signInWithEmailAndPassword(email, password);
//   }

//   function logout(email, password) {
//     return auth.signOut();
//   }

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email);
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email);
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password);
//   }

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }
import React, { useContext, useState } from "react";
import { auth, db } from "../firebase/config";
import { useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function updateDisplayName(name) {
    if (auth.currentUser) {
      return auth.currentUser
        .updateProfile({
          displayName: name,
        })
        .then(
          function (response) {
            console.log("Updated", response);
          },
          function (error) {
            console.log(error);
          }
        );
    }
  }

  function addUserToDB() {
    const u = auth.currentUser;
    return db.ref("users/" + u.uid).set({
      email: u.email,
      uid: u.uid,
      uname: u.displayName,
    });
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(email, password) {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    updateDisplayName,
    addUserToDB,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

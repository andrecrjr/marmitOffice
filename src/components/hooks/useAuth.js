import React, { useCallback, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const useAuthFirebase = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuth] = useState(false);
  const [userData, setDataUser] = useState({});

  const authState = (userData) => {
    setUser(userData);
    if (userData) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  const userFunction = useCallback(() => {
    const subscribedUser = auth().onAuthStateChanged(authState);
    return subscribedUser;
  }, []);
  const userDatabase = useCallback(() => {
    const userFiredatabase = async () => {
      try {
        const dataUser = firestore()
          .collection('Users')
          .doc(user.uid)
          .onSnapshot((documentSnapshot) =>
            setDataUser(documentSnapshot.data()),
          );
      } catch (e) {
        console.log(e);
      }
    };
    if (user) userFiredatabase();
  }, [user]);

  React.useEffect(() => {
    userFunction();
    if (user) {
      console.log(user);
      userDatabase();
    }
  }, [userFunction, user, userDatabase]);

  return { user, authenticated, userData };
};

import React, { useCallback, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const useAuthFirebase = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuth] = useState(false);
  const [userData, setDataUser] = useState({});

  const authState = (data) => {
    try {
      setUser(data);
      if (data) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userFunction = useCallback(() => {
    const subscribedUser = auth().onAuthStateChanged(authState);
    return subscribedUser;
  }, []);

  const userGetDatabase = useCallback(() => {
    const userFiredatabase = async () => {
      try {
        firestore()
          .collection('Users')
          .doc(user.uid)
          .onSnapshot((documentSnapshot) =>
            setDataUser(documentSnapshot.data()),
          );
      } catch (e) {
        console.log(e);
      }
    };
    if (user) {
      return userFiredatabase();
    }
  }, [user]);

  React.useEffect(() => {
    userFunction();
    userGetDatabase();
    return () => {
      userFunction();
      userGetDatabase();
    };
  }, [user, userGetDatabase, userFunction]);

  return { user, authenticated, userData };
};

import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const useDatabase = (user) => {
  const [userData, setDataUser] = useState({});

  useEffect(() => {
    let usuario;
    if (user) {
      usuario = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot((documentSnapshot) => {
          setDataUser(documentSnapshot.data());
        });
    }

    return () => {
      if (user) {
        usuario();
      }
    };
  }, [user]);

  return { userData };
};

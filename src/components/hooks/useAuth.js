import React, { useCallback, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const useAuthFirebase = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuth] = useState(false);

  const authState = (data) => {
    try {
      setUser(data);
      if (data) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (e) {
      setAuth(false);
      console.log(e);
    }
  };

  const userFunction = useCallback(() => {
    const subscribedUser = auth().onAuthStateChanged(authState);
    return subscribedUser;
  }, []);

  React.useEffect(() => {
    userFunction();
  }, [user, userFunction, authenticated]);

  return { user, authenticated };
};

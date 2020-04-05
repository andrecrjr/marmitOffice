import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const useAuthFirebase = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuth] = useState(false);

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

  React.useEffect(() => {
    userFunction();
  }, [userFunction, user]);

  return {user, authenticated};
};

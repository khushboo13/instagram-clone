import { useContext, useEffect, useState, useCallback } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  const savesGetUser = useCallback(async () => {
    const [response] = await getUserByUserId(user.uid);
    setActiveUser(response);
  }, [user.uid]);
  useEffect(() => {
    if (user?.uid) {
      savesGetUser();
    }
  }, [user, savesGetUser]);
  return { user: activeUser, updateUser: savesGetUser };
}

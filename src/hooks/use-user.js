import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  async function getUserObjByUserId() {
    const [response] = await getUserByUserId(user.uid);
    setActiveUser(response);
  }
  useEffect(() => {
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser, updateUser: getUserObjByUserId };
}

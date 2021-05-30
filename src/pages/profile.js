import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { NOT_FOUND } from '../constants/Routes';
import { getUserByUsername } from '../services/firebase';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    async function checkUserExists() {
      const [response] = await getUserByUsername(username);
      if (response) {
        setProfileUser(response);
      } else {
        history.push(NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);
  return profileUser && profileUser.userId ? (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={profileUser} />
      </div>
    </div>
  ) : null;
}

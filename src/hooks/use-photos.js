import { useEffect, useState } from 'react';
import { getPhotos } from '../services/firebase';
import useUser from './use-user';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    async function getTimelinePhotos() {
      let followedUserPhotos = [];
      if (user.following.length > 0) {
        followedUserPhotos = await getPhotos(user.userId, user.following);
        setPhotos(followedUserPhotos);
      }
    }
    if (user.userId) getTimelinePhotos();
  }, [user.following, user.userId]);
  return { photos };
}

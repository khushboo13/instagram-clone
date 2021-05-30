import { useEffect, useReducer } from 'react';
import { getPhotosByUsername } from '../../services/firebase';
import Header from '../Header';
import Photos from './photos';
import ProfileHeader from './profileHeader';
/* eslint-disable react/prop-types */

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0
};
export default function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getUserPhotos() {
      const photos = await getPhotosByUsername(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    getUserPhotos();
  }, [user]);
  return (
    <>
      <Header />
      <div>
        <ProfileHeader
          photosCount={photosCollection ? photosCollection.length : 0}
          profile={profile}
          followerCount={followerCount}
          followUser={dispatch}
          setFollowerCount={dispatch}
        />
        <Photos photos={photosCollection} />
      </div>
    </>
  );
}

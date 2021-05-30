import { useState, useEffect } from 'react';
import useUser from '../../hooks/use-user';
import { updateFollowing, updateFollowers } from '../../services/firebase';

/* eslint-disable react/prop-types */
export default function ProfileHeader({ photosCount, profile, followerCount, setFollowerCount }) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  useEffect(() => {
    if (user.following && user.following.indexOf(profile.userId) !== -1) {
      setIsFollowingProfile(true);
    } else {
      setIsFollowingProfile(false);
    }
  }, [user.uid, user.following, profile.userId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((prevIsFollowing) => !prevIsFollowing);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await updateFollowing(user.docId, profile.userId, isFollowingProfile);
    await updateFollowers(profile.docId, user.userId, isFollowingProfile);
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-4- w-40 flex"
          alt={`${profile.username} profile`}
          src={`/images/avatar/${profile.username}.jpeg`}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          <button
            className="text-white w-20 h-8 bg-blue-medium text-sm rounded"
            type="button"
            onClick={handleToggleFollow}
          >
            {isFollowingProfile ? 'UnFollow' : 'Follow'}
          </button>
        </div>
        <div className="container flex mt-4">
          <p className="mr-10">
            <span className="font-bold">
              {photosCount}
              {` photos`}
            </span>
          </p>
          <p className="mr-10">
            <span className="font-bold">
              {followerCount}
              {` followers`}
            </span>
          </p>
          <p className="mr-10">
            <span className="font-bold">
              {profile.following && profile.following.length}
              {` following`}
            </span>
          </p>
        </div>
        <div className="container mt-4">
          <p className="font-medium">{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
}

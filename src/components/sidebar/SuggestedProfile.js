/* eslint-disable react/prop-types */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/use-user';
import { updateFollowers, updateFollowing } from '../../services/firebase';

export default function SuggestedProfile({ profileDocId, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false);
  const {
    user: { docId },
    updateUser
  } = useUser();
  async function handleFollowUser() {
    setFollowed(true);
    await updateFollowing(docId, profileId, false);
    await updateFollowers(profileDocId, userId, false);
    await updateUser();
  }
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`/images/avatar/${username}.jpeg`}
          className="rounded-full w-8 flex mr-3"
          alt={`Follow ${username}`}
        />
        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="text-xs font-bold text-blue-medium"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

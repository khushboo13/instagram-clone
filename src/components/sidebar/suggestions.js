/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedUsers } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

export default function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    async function getSuggestedProfiles() {
      const response = await getSuggestedUsers(userId, following);
      setProfiles(response);
    }
    if (userId) {
      getSuggestedProfiles();
    }
  }, [userId, following]);

  const renderSuggestedProfiles = () => {
    if (profiles.length > 0) {
      return (
        <div className="rounded flex flex-col">
          <div className="text-sm flex items-center align-items justify-between mb-2">
            <p className="font-bold text-gray-base">Suggestions for you</p>
          </div>
          <div className="mt-4 grid gap-5">
            {profiles.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                profileDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  return !profiles ? <Skeleton count={5} h={150} className="mt-5" /> : renderSuggestedProfiles();
}

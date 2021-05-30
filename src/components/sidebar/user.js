import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function User({ username, fullName }) {
  if (!username || !fullName) {
    return <Skeleton count={1} height={61} />;
  }
  return (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center col-span-1 justify-between">
        <img
          src={`/images/avatar/${username}.jpeg`}
          alt="User Profile"
          className="rounded-full h-8 w-8 flex"
        />
      </div>
      <div className="col-span-3">
        <p className="text-sm font-bold">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}
export default memo(User);

// export default useMemo(User, [username, fullName]);

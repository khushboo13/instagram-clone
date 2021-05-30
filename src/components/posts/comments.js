import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

/* eslint-disable react/prop-types */
export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View
            {` ${comments.length} `}
            comments
          </p>
        )}
        {comments.slice(0, 3).map((item, index) => (
          <p key={`${item.displayName}-${index}-${docId}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs">
          {formatDistance(posted, new Date())}
          {` ago`}
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

import { useContext, useState } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

/* eslint-disable react/prop-types */
export default function AddComment({ docId, comments, setComments, commentInput }) {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [comment, setComment] = useState('');
  const {
    user: { displayName }
  } = useContext(UserContext);
  const handlePostComment = (evt) => {
    evt.preventDefault();
    setComments([{ displayName, comment }, ...comments]);
    setComment('');
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({ comments: FieldValue.arrayUnion({ displayName, comment }) });
  };
  return (
    <div className="border-t border-gray-primary">
      <form className="flex justify-between pl-0 pr-5" method="POST" onSubmit={handlePostComment}>
        <input
          type="text"
          className="px-4 text-sm text-gray-base w-full mr-3 py-5"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="Add Comment"
          ref={commentInput}
        />
        <button
          type="button"
          className={`text-blue-medium text-sm text-bold ${!comment && 'opacity-25'}`}
          disabled={comment.length < 1}
          onClick={handlePostComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

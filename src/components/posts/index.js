/* eslint-disable react/prop-types */
import { useRef } from 'react';
import Actions from './actions';
import Comments from './comments';
import Footer from './footer';
import Header from './header';
import Image from './image';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.likedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        comments={content.comments}
        docId={content.docId}
        commentInput={commentInput}
        posted={content.dateCreated}
      />
    </div>
  );
}

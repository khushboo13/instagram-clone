import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './posts';

export default function Timeline() {
  const { photos } = usePhotos();
  const renderLoader = () => <Skeleton count={5} width={640} height={500} className="mb-5" />;
  const renderPhotos = () => {
    if (photos.length > 0) {
      return photos.map((photo) => <Post key={photo.docId} content={photo} />);
    }
    return <p className="text-2xl text-center">Follow people to see photos.</p>;
  };
  return <div className="col-span-2 container">{!photos ? renderLoader() : renderPhotos()}</div>;
}

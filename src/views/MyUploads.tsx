import {useUserContext} from '../hooks/ContextHooks';
import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';

const MyUploads = () => {
  const {user} = useUserContext();
  const {mediaArray, deleteMedia} = useMedia();
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  // only show media that belongs to the logged-in user
  const myMedia = user
    ? mediaArray.filter((item) => item.user_id === user.user_id)
    : [];

  const handleDelete = async (media_id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await deleteMedia(media_id, token);
  };

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {myMedia.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
            setSelectedItem={setSelectedItem}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </>
  );
};

export default MyUploads;

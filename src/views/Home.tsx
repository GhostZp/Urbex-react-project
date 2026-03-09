import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray, deleteMedia} = useMedia();

  const handleDelete = async (media_id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await deleteMedia(media_id, token);
  };

  return (
    <>
      {/* Debug
       <p>Selected item: {selectedItem?.title}</p> */}
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaArray.map((item) => (
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

export default Home;

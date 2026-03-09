import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import Likes from './Likes';
import Comments from './Comments';
import {Button} from './ui/button';
import {X} from 'lucide-react';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto bg-black/60 p-4 pt-12 md:pt-4"
    >
      {item && (
        <article className="relative h-fit w-full max-w-4xl rounded-lg border border-gray-400 bg-gray-200 shadow-xl">
          <Button
            className="absolute top-3 right-3 border border-gray-400 bg-gray-300 hover:bg-gray-400"
            onClick={() => {
              setSelectedItem(undefined);
            }}
            variant={'secondary'}
          >
            <X />
          </Button>
          {item.media_type.split('/')[0] === 'image' && (
            <img
              className="max-h-[60vh] w-full rounded border border-gray-400 object-contain shadow-sm"
              src={item.filename}
              alt={item.description || item.title}
            />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            <video
              className="max-h-[60vh] w-full rounded border border-gray-400 object-contain shadow-sm"
              src={item.filename}
              controls
            />
          )}
          <div className="space-y-3 p-4">
            <h3 className="rounded border border-blue-800 bg-linear-to-b from-blue-400 to-blue-700 px-3 py-2 text-center text-xl font-bold text-white shadow">
              {item.title}
            </h3>
            <div className="mt-3 flex items-center justify-between text-sm">
              <p className="text-gray-700">
                Owner: <span className="font-medium">{item.username}</span>
              </p>
              <Likes item={item} />
            </div>
            <div className="mt-3 rounded border border-gray-400 bg-white p-3 text-sm shadow-sm">
              {item.description}
            </div>
            <div className="mt-3 rounded border border-gray-400 bg-gray-100 p-3 text-sm shadow-inner">
              <p>
                Uploaded at {new Date(item.created_at).toLocaleString('fi-FI')}{' '}
                by user id {item.user_id}
              </p>
            </div>

            <div className="mt-4">
              <Comments mediaId={item.media_id} />
            </div>
          </div>
        </article>
      )}
    </dialog>
  );
};
export default SingleView;

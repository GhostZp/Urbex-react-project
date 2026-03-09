import type {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface MediaRowProps {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
  onDelete?: (media_id: number) => Promise<void>;
}

const MediaRow = (props: MediaRowProps) => {
  const {item, setSelectedItem, onDelete} = props;
  const {user} = useUserContext();

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      await onDelete(item.media_id);
    } catch (err) {
      console.error('deletion failed', err);
    }
  };

  return (
<Card className="w-full p-3 overflow-hidden bg-gray-200 border border-gray-400">      {' '}
      <div className="relative">
        <div className="" />
        <img
          className="h-72 w-full rounded border-b border-gray-400 object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <CardHeader>
        <CardTitle className="rounded bg-linear-to-b from-blue-500 to-blue-700 px-3 py-2 text-xl font-bold text-white shadow-sm">
          {' '}
          {item.title}
        </CardTitle>
        <CardDescription className="rounded border border-gray-400 bg-gray-100 p-3 text-sm text-gray-700 shadow-inner">
          {' '}
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded border border-gray-400 bg-gray-100 p-3 text-sm text-gray-700 shadow-inner">
          {' '}
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Media-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full border border-blue-700 bg-linear-to-b from-blue-400 to-blue-600 text-white shadow hover:from-blue-500 hover:to-blue-700"
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          View
        </Button>
        {/* User exists and owns the media item or is an admin */}
        {user &&
          (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <Button
                variant="destructive"
                className="w-full border border-red-700 bg-linear-to-b from-red-400 to-red-600 text-white shadow hover:from-red-500 hover:to-red-700"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
      </CardFooter>
    </Card>
  );
};

export default MediaRow;

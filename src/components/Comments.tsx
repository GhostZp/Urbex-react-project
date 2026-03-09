import {useEffect, useRef} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import useForm from '../hooks/formHooks';
import {useCommentStore} from '../stores/commentStore';
import {useComment} from '../hooks/apiHooks';
import {Button} from './ui/button';

const Comments = ({mediaId}: {mediaId: number}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const {postComment, getCommentsByMediaId} = useComment();

  const initValues = {comment_text: ''};
  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    // eslint-disable-next-line react-hooks/immutability
    console.log('adding comment:', inputs.comment_text);
    const commentResponse = await postComment(
      inputs.comment_text,
      mediaId,
      token,
    );

    if (!commentResponse) {
      return;
    }
    const comments = await getCommentsByMediaId(mediaId);

    if (comments.length > 0) {
      setComments(comments);
    }

    // eslint-disable-next-line react-hooks/immutability
    setInputs(initValues);
    // clear comment input with useRef() hook
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const {handleInputChange, handleSubmit, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  useEffect(() => {
    const main = async () => {
      console.log('Moro!!!!!');
      const comments = await getCommentsByMediaId(mediaId);

      if (comments.length > 0) {
        setComments(comments);
      }
    };

    main();
  }, [mediaId]);

  return (
    <div className="space-y-3">
      <h3 className="rounded border border-gray-400 bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm">
        Comments:
      </h3>

      {comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="rounded border border-gray-400 bg-white p-3 text-sm shadow-sm"
            >
              <p className="text-xs text-gray-500">
                {comment.created_at?.toLocaleString('fi-FI')}{' '}
              </p>

              <p className="font-semibold text-gray-800">
                {comment.username}
              </p>

              <p className="mt-1 text-gray-700">
                {comment.comment_text}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded border border-gray-400 bg-white p-3 text-sm shadow-sm">
          No comments yet.
        </div>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex w-full flex-col gap-3 rounded border border-gray-400 bg-gray-100 p-4 shadow-inner"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold" htmlFor="comment_text">
              Write comment
            </label>

            <input
              className="rounded border border-gray-400 bg-white px-3 py-2 text-sm shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              ref={inputRef}
            />
          </div>

          <Button
            className="w-full border border-blue-700 bg-linear-to-b from-blue-400 to-blue-600 font-semibold text-white shadow hover:from-blue-500 hover:to-blue-700"
            type="submit"
            disabled={inputs.comment_text.length === 0}
          >
            Add comment
          </Button>
        </form>
      )}
    </div>
  );
};

export default Comments;

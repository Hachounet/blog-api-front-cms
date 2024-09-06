import { enGB } from 'date-fns/locale';
import ButtonGroup from './ButtonsGroup';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostCard({
  postId,
  author,
  createdAt,
  title,
  content,
  published,
  onDelete,
}) {
  const deleteURL =
    'https://hachounet-blog-api-backend.adaptable.app/dashboard/delete';

  const updateURL = `https://hachounet-blog-api-backend.adaptable.app/dashboard/${postId}/update`;
  const { token, setLogged } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${deleteURL}?postId=${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete(postId); // Call the onDelete function
      } else if (response.status === 401) {
        localStorage.removeItem('accessToken');
        setLogged(false);
        navigate('/login');
      }
    } catch (err) {
      return;
    }
  };

  const handlePublish = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
      <div className="p-6 flex-grow">
        <header className="mb-4">
          <h3 className="text-xl font-medium text-slate-700">{title}</h3>
          <p className="text-sm text-slate-400">
            By {author},{' '}
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: enGB,
            })}
          </p>
        </header>
        <p className="line-clamp-4">{content}</p>
      </div>
      <div className="flex justify-center pb-2 gap-1 items-center mt-auto">
        <ButtonGroup
          postId={postId}
          updateURL={updateURL}
          handleDelete={handleDelete}
          handlePublish={handlePublish}
          published={published}
        />
      </div>
    </div>
  );
}

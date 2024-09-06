import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useParams, useNavigate } from 'react-router-dom';
import SavePostBtn from './SavePostBtn';
import { useAuthContext } from '../AuthContext';
import useAuth from '../hooks/authFetch';

export default function EditPost({ url }) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { token, setLogged } = useAuthContext();
  const navigate = useNavigate();

  const { data, loading, error } = useAuth(`${url}${postId}/update`);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.Content);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred. {error.message}</div>;

  const savePost = async () => {
    try {
      const response = await fetch(`${url}/${postId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSaveSuccess(true);
        setSuccessMessage(data.message);
      } else if (response.status === 401) {
        localStorage.removeItem('accessToken');
        setLogged(false);
        navigate('/login');
      } else {
        setSaveSuccess(false);
        setSuccessMessage('Failed to update post!');
      }
    } catch (err) {
      setSaveSuccess(false);
      setSuccessMessage('An error occurred while updating the post.');
    }
  };

  return (
    <>
      <h1>Edit Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <Editor
        apiKey={'lcl13p17airpvjjdng284n9n4643p625cxmoojv8wepxce43'}
        value={content}
        onEditorChange={(newValue, editor) => setContent(newValue)}
        init={{
          height: '90vh',
          width: '100%',
        }}
      />
      <SavePostBtn
        text="Save changes"
        onClick={savePost}
      />
      {saveSuccess && <span>{successMessage}</span>}
    </>
  );
}

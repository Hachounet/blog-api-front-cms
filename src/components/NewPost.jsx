import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import SavePostBtn from './SavePostBtn';
import { useAuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NewPost({ url }) {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { logged, setLogged, token } = useAuthContext();
  const navigate = useNavigate();

  const extractTitleFromContent = (content) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    return h1 ? h1.textContent : 'Untitled';
  };

  const onEditorInputChange = (newValue, editor) => {
    setValue(newValue);
    const extractedTitle = extractTitleFromContent(newValue);
    setTitle(extractedTitle);
  };

  const savePost = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSaveSuccess(true);
        setSuccessMessage(data.message || 'Post saved successfully!');
      } else if (response.status === 401) {
        localStorage.removeItem('accessToken');
        setLogged(false);
        navigate('/login');
      } else {
        setSaveSuccess(false);
        setSuccessMessage('Failed to save post!');
      }
    } catch (err) {
      setSaveSuccess(false);
      setSuccessMessage('An error occurred while saving the post.');
    }
  };

  return (
    <>
      <Editor
        apiKey="lcl13p17airpvjjdng284n9n4643p625cxmoojv8wepxce43"
        onEditorChange={onEditorInputChange}
        value={value}
        initialValue="<h1>This is your article title.</h1><p>Start writing here...</p>"
        init={{ height: '90vh', width: '100vw' }}
      />
      <SavePostBtn
        text="Save article"
        onClick={savePost}
      />
      <span>{saveSuccess ? successMessage : ''}</span>
    </>
  );
}

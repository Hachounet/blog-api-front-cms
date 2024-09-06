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

  const { data, loading, error } = useAuth(`${url}/update?postId=${postId}`);
  console.log(data);

  // Fonction pour extraire le titre à partir du premier h1
  const extractTitleFromContent = (content) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    return h1 ? h1.textContent : 'Untitled';
  };

  // Fonction pour enlever le premier h1 du contenu
  const removeFirstH1FromContent = (content) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const h1 = doc.querySelector('h1');
    if (h1) {
      h1.remove(); // Enlève le premier h1
    }
    return doc.body.innerHTML; // Retourne le nouveau contenu sans le h1
  };

  // Met à jour le contenu et le titre lorsqu'on reçoit les données
  useEffect(() => {
    if (data) {
      setContent(data.postToUpdate.Content);
      const extractedTitle = extractTitleFromContent(data.postToUpdate.Content);
      setTitle(extractedTitle);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred. {error.message}</div>;

  // Met à jour le contenu et extrait le titre lors de chaque modification
  const onEditorInputChange = (newValue, editor) => {
    setContent(newValue);
    const extractedTitle = extractTitleFromContent(newValue);
    setTitle(extractedTitle);
  };

  const savePost = async () => {
    // Supprime le premier h1 du contenu avant de l'enregistrer
    const cleanedContent = removeFirstH1FromContent(content);

    try {
      const response = await fetch(`${url}/update?postId=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title, // Utilise le titre extrait
          content: cleanedContent, // Utilise le contenu sans le premier h1
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
      <h1 className="pl-4">Edit Post</h1>

      <Editor
        apiKey={'lcl13p17airpvjjdng284n9n4643p625cxmoojv8wepxce43'}
        value={content}
        onEditorChange={onEditorInputChange}
        init={{
          height: '90vh',
          width: '100vw',
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

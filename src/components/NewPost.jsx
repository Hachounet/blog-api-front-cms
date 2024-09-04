import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import SavePostBtn from './SavePostBtn';

export default function NewPost() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title, // Titre extrait
        content: value, // Contenu HTML brut
      }),
    });

    if (response.ok) {
      setSaveSuccess((prevState) => !prevState);
    } else {
      setSaveSuccess((prevState) => !prevState);
    }
  };

  return (
    <>
      <Editor
        apiKey={'lcl13p17airpvjjdng284n9n4643p625cxmoojv8wepxce43'}
        onEditorChange={(newValue, editor) =>
          onEditorInputChange(newValue, editor)
        }
        value={value}
        initialValue={
          '<h1>This is your article title.</h1><p>Start writing here...</p>'
        }
      />
      <SavePostBtn
        text="Save article"
        onClick={savePost}
      />
      <span>{saveSuccess ? 'Post have been saved in database ! ' : ''}</span>
    </>
  );
}

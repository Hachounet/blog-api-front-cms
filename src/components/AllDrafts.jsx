import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard';
import useAuth from '../hooks/authFetch';
import CreatePostBtn from './CreatePostBtn';

export default function AllDrafts({ url }) {
  const { data, loading, error } = useAuth(url);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    if (data && data.drafts) {
      setDrafts(data.drafts);
      console.log(data);
    }
  }, [data]);

  const handleDraftDelete = (draftId) => {
    setDrafts((prevDrafts) =>
      prevDrafts.filter((draft) => draft.id !== draftId)
    );
  };

  const handleDraftPublish = (draftId) => {
    setDrafts((prevDrafts) =>
      prevDrafts.map((draft) =>
        draft.id === draftId ? { ...draft, published: !draft.published } : draft
      )
    );
  };

  if (loading) return <div>Loading drafts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="min-w-[100%] flex justify-center pt-2">
        <CreatePostBtn text="Create new post" />
      </div>

      <div className="grid grid-cols-3 grid-rows-4 gap-8 pt-8 pr-4 pl-4">
        {drafts.map((draft) => (
          <PostCard
            key={draft.id}
            author={draft.author.pseudo}
            createdAt={draft.createdAt}
            title={draft.title}
            content={draft.Content}
            postId={draft.id}
            published={draft.published}
            onDelete={handleDraftDelete}
            onPublish={handleDraftPublish}
          />
        ))}
      </div>
    </>
  );
}

AllDrafts.propTypes = {
  url: PropTypes.string.isRequired,
};

import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import useAuth from '../hooks/authFetch';

export default function AllComments({ url }) {
  const { data, loading, error } = useAuth(url);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data]);

  const handleCommentAction = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-8 pt-8 pr-4 pl-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          url={url}
          id={comment.id}
          author={comment.author.pseudo}
          createdAt={comment.createdAt}
          content={comment.content}
          onAction={() => handleCommentAction(comment.id)}
        />
      ))}
    </div>
  );
}

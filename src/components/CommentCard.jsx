import { enGB } from 'date-fns/locale';
import CommentBtnsGroup from './CommentBtnsGroup';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function CommentCard({
  url,
  id,
  author,
  createdAt,
  content,
  onAction,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async (actionType) => {
    setIsProcessing(true);
    setError('');
    try {
      const response = await fetch(
        `${url}?commentId=${id}&authorized=${actionType}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        onAction(); // Invoquer le callback pour mettre à jour l'état local
      } else {
        const errorText = await response.text();
        setError(`Failed to ${actionType} comment. Error: ${errorText}`);
      }
    } catch (error) {
      setError(`Failed to ${actionType} comment. Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <header className="mb-4">
          <p className="text-sm text-slate-400">
            By {author},{' '}
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: enGB,
            })}
          </p>
        </header>
        <p>{content}</p>
      </div>
      <div className="mt-auto pb-2 self-center">
        <CommentBtnsGroup
          onApprove={() => handleAction('true')}
          onReject={() => handleAction('false')}
          isProcessing={isProcessing}
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

CommentCard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

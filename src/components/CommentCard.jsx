import { enGB } from 'date-fns/locale';
import CommentBtnsGroup from './CommentBtnsGroup';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export default function PostCard({
  url,
  id,
  author,
  createdAt,
  content,
  onAction,
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (actionType) => {
    setIsProcessing(true);
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
        // Invoquer le callback pour mettre à jour l'état local
        onAction();
      } else {
        console.error(`Failed to ${actionType} comment`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
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
    </div>
  );
}

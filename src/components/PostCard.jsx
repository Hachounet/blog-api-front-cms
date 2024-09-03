import { enGB } from 'date-fns/locale';
import ButtonGroup from './ButtonsGroup';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({
  author,
  createdAt,
  title,
  content,
  published,
}) {
  return (
    <>
      {/*<!-- Component: Card with subtitle --> */}
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
          <ButtonGroup />
          {published ? (
            <span className="">Published</span>
          ) : (
            <span className="">Draft/Not published</span>
          )}
        </div>
      </div>

      {/*<!-- End Card with subtitle --> */}
    </>
  );
}

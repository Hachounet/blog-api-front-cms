import PropTypes from 'prop-types';

export default function CommentBtnsGroup({
  onApprove,
  onReject,
  isProcessing,
}) {
  return (
    <>
      {/*<!-- Component: Base sized primary basic button group --> */}
      <div className="inline-flex overflow-hidden rounded pl-2 pr-2">
        <button
          onClick={onApprove}
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          disabled={isProcessing}
        >
          <span>Authorize comment</span>
        </button>
        <button
          onClick={onReject}
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          disabled={isProcessing}
        >
          <span>Delete comment</span>
        </button>
      </div>
      {/*<!-- End Base sized primary basic button group --> */}
    </>
  );
}

CommentBtnsGroup.propTypes = {
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

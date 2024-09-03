import PropTypes from 'prop-types';

export default function ButtonLogOut({ text, onClickFn }) {
  return (
    <>
      {/*<!-- Component: Base primary elevated button --> */}
      <button
        onClick={onClickFn}
        className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
      >
        <span>{text}</span>
      </button>
      {/*<!-- End Base primary elevated button --> */}
    </>
  );
}

ButtonLogOut.propTypes = {
  text: PropTypes.string.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

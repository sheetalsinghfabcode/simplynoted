
const Loader = ({loaderMessage}) => {
  return (
    <div className="flex flex-col gap-[20px] justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-b-4 border-blue-500 border-r-4 border-blue-500 h-36 w-36"></div>
      <h2 className='text-[24px] font-semibold text-center'>{loaderMessage}</h2>
    </div>
  );
};

export default Loader;

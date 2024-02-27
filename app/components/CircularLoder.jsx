const CircularLoader = ({color, title, height = '48px', width = '48px'}) => {
  return (
    <div className="flex flex-col gap-[8px] justify-center items-center ">
      {title && (
        <h4 className="text-[16px] md:text-[24px] lg:text-[28px] text-[#001a5f]  font-bold text-center font-karla mb-6">
          {title}
        </h4>
      )}
      <div
        className="custom-spinner border-4 border-t-4 border-gray-200 rounded-full mb-4"
        style={{
          borderTopColor: color,
          height,
          width,
        }}
      ></div>
    </div>
  );
};

export default CircularLoader;

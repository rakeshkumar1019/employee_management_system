/* eslint-disable react/prop-types */
const BottomHeader = ({ heading,isMobile }) => {
  if (isMobile) {
    return (
      <div className="bg-secondary-gray text-secondary h-[80px] pl-[14px] pt-[10px] font-light w-screen fixed bottom-0">
        {heading}
      </div>
    );
  } else {
    return null;
  }
};

export default BottomHeader;

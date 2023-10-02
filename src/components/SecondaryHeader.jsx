/* eslint-disable react/prop-types */
const SecondaryHeader = ({ heading }) => {
  return (
    <div className="bg-secondary-gray p-[14px] text-secondary-blue font-medium leading-5">
      {heading}
    </div>
  );
};

export default SecondaryHeader;

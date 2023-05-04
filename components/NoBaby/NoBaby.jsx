import AnchorLink from '../AnchorLink/AnchorLink';

const NoBaby = (props) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[54rem]">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="sm:text-[1.2rem] md:text-[1.4rem] text-[0.8rem] text-center">
              No baby found, start now by pressing the button below!
            </p>
            <AnchorLink
              href="/CreateBaby"
              className="px-4 py-2 w-[10rem] h-[3rem]"
            >
              Create Profile
            </AnchorLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoBaby;

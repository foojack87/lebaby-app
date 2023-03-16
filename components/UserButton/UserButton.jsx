const UserButton = ({
  children,
  className = '',
  onClick,
  type,
  processing,
}) => {
  return (
    <button
      type={type}
      className={
        `shadow-md inline-flex items-center border border-transparent rounded-md font-semibold text-white uppercase tracking-widesttransition ease-in-out duration-150 hover:bg-[#34acc7] hover:-translate-y-0.5 ${
          processing && 'opacity-25'
        } ` + className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UserButton;

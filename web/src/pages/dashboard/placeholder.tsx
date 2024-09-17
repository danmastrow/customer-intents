const Placeholder = () => {
  return (
    <div className="flex items-center justify-center h-64 w-full max-w-sm mb-4 rounded bg-gray-50  hover:shadow-md transition-all cursor-pointer">
      <p className="text-2xl text-gray-400">
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </p>
    </div>
  );
};

export default Placeholder;

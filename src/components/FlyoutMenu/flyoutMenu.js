import React, { useState } from "react";

const FlyoutMenu = ({ song, options }) => {
  const [open, setOpen] = useState(false);

  const flyoutClass = open
    ? "transition ease-in duration-150 opacity-100 translate-y-0 block"
    : "transition ease-out duration-200 opacity-0 translate-y-1 hidden";

  function handleClick(e) {
    setOpen(!open);
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={(e) => handleClick(e)}
          className="inline-flex items-center p-1 text-indigo-700 border border-transparent rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {/* <!--Flyout menu, show/hide based on flyout menu state. Entering: "transition ease-out duration-200" From: "opacity-0 translate-y-1" To: "opacity-100 translate-y-0" Leaving: "transition ease-in duration-150" From: "opacity-100 translate-y-0" To: "opacity-0 translate-y-1"--> */}
        <div
          className={`absolute z-50 left-1/2 transform -translate-x-full mt-3 px-2 w-screen max-w-xs sm:px-0 ${flyoutClass}`}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
              {options.map((option) => {
                return (
                  <button
                    key={option.name}
                    className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                    onClick={(e) => {
                      handleClick(e);
                      option.action(option.id, song);
                    }}
                  >
                    <p className="text-base font-medium text-gray-900">
                      {option.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlyoutMenu;

import React from "react";

const Modal = ({ active, close, children }) => {
  const backgrounOverlayClass = active
    ? "ease-out duration-300 opacity-100"
    : "ease-in duration-200 opacity-0 hidden";
  const panelClass = active
    ? "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100"
    : "opacity-100 translate-y-0 sm:scale-100 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 hidden";

  const modalClass = active ? "" : "hidden";

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${modalClass}`}>
      <div
        className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ${backgrounOverlayClass}`}
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className={`hidden sm:inline-block sm:align-middle sm:h-screen ${panelClass}`}
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {children}
          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => close()}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Go back to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import { type ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  // vista
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/80 overflow-y-auto"
        onClick={onClose}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <dialog
            open
            onClose={onClose}
            closedby="any"
            className="relative bg-white rounded-lg p-6 w-full max-w-lg shadow-xl my-auto border-none"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <FaTimes
                className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                size={24}
                title="cerrar modal"
                onClick={onClose}
              />
            </div>
            {children}
          </dialog>
        </div>
      </div>
    </>
  );
}

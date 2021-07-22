import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    background-color: rgba(154, 160, 185, 0);
  }

  to {
    background-color: rgba(154, 160, 185, 0.50);
  }
`;

const fadeOut = keyframes`
  from {
    background-color: rgba(154, 160, 185, 0.50);
  }

  to {
    background-color: rgba(154, 160, 185, 0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0px);
    opacity: 1;
  }

  to {
    transform: translateY(100px);
    opacity: 0;
  }
`;

const modalRoot = (() => {
  const root = document.getElementById("modal-root");

  if (!root) {
    const newRoot = document.createElement("div");
    newRoot.id = "modal-root";
    document.body.appendChild(newRoot);

    return newRoot;
  } else {
    return root;
  }
})();

interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const ModalBase: FC<ModalProps> = ({ className, children, open, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [closed, setClosed] = useState(!open);

  useEffect(() => {
    if (open && closed) {
      setClosed(false);
    }
    if (!open && !closed) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setClosed(true);
      }, 500);
    }

    function escapeListener(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", escapeListener);

    return () => {
      window.removeEventListener("keydown", escapeListener);
    };
  }, [open, closed, onClose]);

  if (closed) return null;

  const modalElement = (
    <div className={[className, closing ? "closing" : "open"].join(" ")}>
      <dialog>{children}</dialog>
    </div>
  );

  return createPortal(modalElement, modalRoot);
};

const Modal = styled(ModalBase)<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 60px;
  animation: ${fadeIn} 250ms linear forwards;
  z-index: 999;

  &.closing {
    animation: ${fadeOut} 250ms linear forwards;
  }

  &.closing > dialog {
    animation: ${slideOut} 250ms ease-in-out forwards;
  }

  & > dialog {
    display: block;
    width: 800px;
    max-width: 100%;
    animation: ${slideIn} 250ms ease-in-out;
    outline: none;
    border: none;
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(154, 160, 185, 0.4),
      0 15px 60px rgba(166, 173, 201, 0.8);
  }
`;

export default Modal;

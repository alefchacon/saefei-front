import { createContext, useContext, useState } from "react";

import Modal from "../Modal";

export const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [actions, setActions] = useState(null);
  const [noBackdrop, setNoBackdrop] = useState(true);
  const [isResponsive, setIsResponsive] = useState(true);
  const [minWidth, setMinWidth] = useState("200px");

  const openModal = (
    title,
    content,
    actions,
    responsive,
    minWidth,
    noBackdrop = false
  ) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setIsOpen(true);
    setIsResponsive(responsive);
    setMinWidth(minWidth);
    setNoBackdrop(noBackdrop);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Modal
        title={title}
        actions={actions}
        open={isOpen}
        responsive={isResponsive}
        minWidth={minWidth}
        noBackdrop={noBackdrop}
        onClose={closeModal}
      >
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
}

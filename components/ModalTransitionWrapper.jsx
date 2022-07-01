import React from "react";
import * as StyledModal from "../styles/modal.styled";
import { Backdrop, Fade, Modal } from "@mui/material";

const ModalTransitionWrapper = ({ isOpen, onToggle, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onToggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <StyledModal.ModalContainer>{children}</StyledModal.ModalContainer>
      </Fade>
    </Modal>
  );
};

export default ModalTransitionWrapper;

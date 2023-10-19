import { WarningRounded } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import React from "react";

interface ContainerProps {
  titulo: string;
  texto: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClickConfirmar: () => void;
}

const ModalDarBaja: React.FC<ContainerProps> = ({
  texto,
  titulo,
  open,
  setOpen,
  handleClickConfirmar,
}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRounded />
          {titulo}
        </DialogTitle>
        <Divider />
        <DialogContent>{texto}</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
            Dar de baja
          </Button>
          <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ModalDarBaja;

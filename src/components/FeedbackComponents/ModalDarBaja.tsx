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
  textoBotonSi: string;
  textoBotonNo: string;
  colorBotonSi: "danger" | "neutral" | "primary" | "success" | "warning";
  colorBotonNo: "danger" | "neutral" | "primary" | "success" | "warning";
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
  textoBotonSi,
  textoBotonNo,
  colorBotonSi,
  colorBotonNo,
}) => {
  const handleClickConfirmarAccion = async () => {
    await handleClickConfirmar();
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="contentinfo">
        <DialogTitle>
          <WarningRounded />
          {titulo}
        </DialogTitle>
        <Divider />
        <DialogContent>{texto}</DialogContent>
        <DialogActions>
          <Button variant="solid" color={colorBotonSi} onClick={handleClickConfirmarAccion}>
            {textoBotonSi}
          </Button>
          <Button variant="plain" color={colorBotonNo} onClick={() => setOpen(false)}>
            {textoBotonNo}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ModalDarBaja;

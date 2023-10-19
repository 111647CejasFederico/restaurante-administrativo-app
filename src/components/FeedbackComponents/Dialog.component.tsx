// import { IonAlert, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";

interface ContainerProps {
  titulo: string;
  contenido: string;
  abrirCerrarModal: boolean;
  colorBotonNo: string;
  colorBotonSi: string;
  textoBotonNo: string;
  textoBotonSi: string;
  handleclickBotonNo: () => void;
  handleclickBotonSi: () => void;
}

const Dialog: React.FC<ContainerProps> = ({
  titulo,
  contenido,
  abrirCerrarModal,
  handleclickBotonNo,
  handleclickBotonSi,
  colorBotonNo,
  colorBotonSi,
  textoBotonNo,
  textoBotonSi,
}) => {
  const [botonSi, setBotonSi] = useState({
    texto: "",
    clase: "",
  });
  const [botonNo, setBotonNo] = useState({
    texto: "",
    clase: "",
  });

  const getColor = (color: string) => {
    switch (color) {
      case "verde":
        return "success";
      case "rojo":
        return "danger";
      case "amarillo":
        return "warning";
      default:
        return "primary";
    }
  };

  const CargarBotones = () => {
    setBotonSi({
      texto: textoBotonSi,
      clase: getColor(colorBotonSi),
    });
    setBotonNo({
      texto: textoBotonNo,
      clase: getColor(colorBotonNo),
    });
  };

  useEffect(() => {
    CargarBotones();
  }, []);

  return (
    <Modal open={abrirCerrarModal}>
      <ModalDialog
        role="alertdialog"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
        }}
      >
        <DialogTitle component="h2" id="modal-title" level="h4">
          {titulo}
        </DialogTitle>
        <DialogContent>
          <Typography id="modal-desc">{contenido}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleclickBotonNo}>{botonNo.texto}</Button>
          <Button onClick={handleclickBotonSi}>{botonSi.texto}</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

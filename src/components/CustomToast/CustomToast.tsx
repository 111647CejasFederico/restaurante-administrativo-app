import { Toaster, toast } from "sonner";
import { NotificacionInterface } from "../../hooks/notificaciones.hook";
import { useEffect } from "react";
import "./CustomToast.css";
import TaskAlt from "@mui/icons-material/TaskAlt";
import ReportGmailerrorred from "@mui/icons-material/ReportGmailerrorred";
import WarningAmber from "@mui/icons-material/WarningAmber";
import Info from "@mui/icons-material/Info";

interface ContainerProps extends NotificacionInterface {
  onClose: () => void;
}
const CustomToast: React.FC<ContainerProps> = ({ mostrar, mensaje, color, onClose }) => {
  const getColor = (): string => {
    switch (color) {
      case "verde":
        return "success";
      case "rojo":
        return "danger";
      case "amarillo":
        return "warning";
      case "blanco":
        return "light";
      case "neutros":
        return "neutral";
      case "azul":
        return "primary";
      default:
        return "primary";
    }
  };

  const getIcon = (): any => {
    switch (color) {
      case "verde":
        return <TaskAlt />;
      case "rojo":
        return <ReportGmailerrorred />;
      case "amarillo":
        return <WarningAmber />;
      default:
        return <Info />;
    }
  };

  const handleClose = () => {
    if (mostrar) {
      onClose();
    }
  };
  useEffect(() => {
    if (mostrar) {
      toast(mensaje, {
        onAutoClose: () => handleClose(),
        onDismiss: () => handleClose(),
        duration: 3500,
        icon: getIcon(),
        className: `toast ${getColor()}`,
      });
    }
  }, [mostrar]);

  return (
    <Toaster
      richColors
      visibleToasts={1}
      position="top-center"
      closeButton
      toastOptions={{ duration: 3500 }}
    />
  );
};

export default CustomToast;

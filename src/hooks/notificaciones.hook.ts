import { useState } from "react";
interface NotificacionInterface {
  mostrar: boolean;
  mensaje: string;
  color: string;
}
type UseNotificacion = {
  Notificacion: NotificacionInterface;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
  OcultarNotificacion: () => void;
};

const useNotificacion = (): UseNotificacion => {
  const [Notificacion, setNotificacion] = useState<NotificacionInterface>({
    mostrar: false,
    color: "",
    mensaje: "",
  });

  const MostrarNotificacion = (NotificacionMostrar: NotificacionInterface) => {
    setNotificacion(NotificacionMostrar);
  };

  const OcultarNotificacion = () => {
    setNotificacion({ mostrar: false, color: "", mensaje: "" });
  };

  return { Notificacion, MostrarNotificacion, OcultarNotificacion };
};

export default useNotificacion;

import { useState } from "react";
export interface NotificacionInterface {
  mostrar: boolean;
  mensaje: string;
  color: "verde" | "rojo" | "amarillo" | "blanco" | "neutros" | "azul";
}
type UseNotificacion = {
  Notificacion: NotificacionInterface;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
  OcultarNotificacion: () => void;
};

export const useNotificacion = (): UseNotificacion => {
  const [Notificacion, setNotificacion] = useState<NotificacionInterface>({
    mostrar: false,
    color: "azul",
    mensaje: "",
  });

  const MostrarNotificacion = (NotificacionMostrar: NotificacionInterface) => {
    setNotificacion(NotificacionMostrar);
  };

  const OcultarNotificacion = () => {
    setNotificacion({ mostrar: false, color: "azul", mensaje: "" });
  };

  return { Notificacion, MostrarNotificacion, OcultarNotificacion };
};

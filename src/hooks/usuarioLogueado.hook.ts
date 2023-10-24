import { useState } from "react";
import { EmpleadoInterface } from "../interfaces/empleado.interface";

type UseSesion = {
  getSesion: () => EmpleadoInterface;
  setSesion: (empleado: EmpleadoInterface) => void;
  removeSesion: () => void;
};

const useSesion = (): UseSesion => {
  const getSesion = (): EmpleadoInterface => {
    //@ts-ignore
    return (
      JSON.parse(sessionStorage.getItem("UL") || "") || {
        id: 0,
        user: "",
        pass: "",
        nombre: "",
        apellido: "",
        nroDocumento: 0,
        rol: 0,
        telefono: "",
        email: "",
        estado: 0,
        token: "",
      }
    );
  };
  const setSesion = (empleado: EmpleadoInterface): void => {
    sessionStorage.setItem("UL", JSON.stringify(empleado));
  };

  const removeSesion = () => {
    sessionStorage.removeItem("UL");
  };

  return { getSesion, setSesion, removeSesion };
};

export default useSesion;

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import UrlAxio from "../hooks/urlAxio.hook";
import { EmpleadoInterface } from "../interfaces/empleado.interface";

interface UsuarioInterface {
  usuario: string;
  password: string;
  token?: string;
}
const postLogin = async (usuario: UsuarioInterface): Promise<AxiosResponse> => {
  const { getUrlAxio } = UrlAxio();
  return await axios.post(`${getUrlAxio()}auth/Login`, {
    user: usuario.usuario,
    pass: usuario.password,
  });
};

const postRegistrarEmpleado = async (
  empleado: EmpleadoInterface,
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const { getUrlAxio } = UrlAxio();
  return await axios.post(
    `${getUrlAxio()}Auth/Register`,
    {
      user: empleado.user,
      pass: empleado.pass,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      nroDocumento: empleado.nroDocumento,
      rol: empleado.rol,
      telefono: empleado.telefono,
      email: empleado.email,
      estado: empleado.estado,
    },
    config
  );
};

export default { postLogin, postRegistrarEmpleado };

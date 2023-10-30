import React, { useEffect, useState } from "react";
import { Column, Container, Row } from "../../../components/GridComponents";
import axios from "axios";
import useUrlAxio from "../../../hooks/urlAxio.hook";
import useSesion from "../../../hooks/usuarioLogueado.hook";
import { ProductoInterface } from "../../../interfaces/producto.interface";
import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  AuxiliarErrorInterface,
  AuxiliarInterface,
  TipoProductoInterface,
} from "../../../interfaces/tipo.interface";
import { NotificacionInterface } from "../../../hooks/notificaciones.hook";
import { InfoOutlined } from "@mui/icons-material";

interface ContainerProps {
  modo: "consulta" | "registrar" | "editar" | "cerrado";
  tipoAuxiliar: "TipoProducto" | "RolUsuario" | "EstadoUsuario" | "EstadoPromocion";
  tipoSeleccionado?: AuxiliarInterface;
  open: boolean;
  setOpen: (open: boolean) => void;
  MostrarNotificacion: (Notificacion: NotificacionInterface) => void;
}

const ModalFormOtrosMaestros: React.FC<ContainerProps> = ({
  modo = "cerrado",
  tipoAuxiliar,
  open,
  setOpen,
  tipoSeleccionado,
  MostrarNotificacion,
}) => {
  const [tipo, setTipo] = useState<AuxiliarInterface>({
    id: 0,
    nombre: "",
    descripcion: "",
    habilitado: false,
  });
  const [tipoError, setTipoError] = useState<AuxiliarErrorInterface>({
    nombre: false,
    descripcion: false,
    habilitado: false,
  });
  const { getSesion } = useSesion();
  const { getUrlAxio } = useUrlAxio();

  const getUrlAuxiliar = (): string => {
    switch (tipoAuxiliar) {
      case "TipoProducto":
        return "tipoProducto";
      case "RolUsuario":
        return "tipoRol";
      case "EstadoUsuario":
        return "tipoEstadoUsuario";
      case "EstadoPromocion":
        return "tipoEstadoPromocion";
    }
  };

  const getlabel = (): string => {
    switch (tipoAuxiliar) {
      case "TipoProducto":
        return "tipo de producto";
      case "RolUsuario":
        return "rol de usuario";
      case "EstadoUsuario":
        return "estado de usuario";
      case "EstadoPromocion":
        return "estado de promocion";
    }
  };

  useEffect(() => {
    if (tipoSeleccionado && open) {
      setTipo(tipoSeleccionado);
    }
    if (!open)
      setTipo({
        id: 0,
        nombre: "",
        descripcion: "",
        habilitado: false,
      });
  }, [tipoSeleccionado, open]);

  const ValidarFormulario = (): boolean => {
    let errores: AuxiliarErrorInterface = {
      nombre: false,
      descripcion: false,
      habilitado: false,
    };

    let pasa = true;
    if (tipo.nombre === "") {
      pasa = false;
      errores.nombre = true;
    }

    setTipoError(errores);
    return pasa;
  };

  const postTipo = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.post(
        `${getUrlAxio()}${getUrlAuxiliar()}`,
        {
          nombre: tipo.nombre,
          descipcion: tipo.descripcion,
          habilitado: tipo.habilitado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Nuevo ${getlabel()} registrado `,
        color: "verde",
      });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo registrar el ${getlabel()}`,
        color: "rojo",
      });
    }
  };

  const putTipo = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${getSesion().token}`,
      },
    };
    try {
      await axios.put(
        `${getUrlAxio()}${getUrlAuxiliar()}`,
        {
          id: tipo.id,
          nombre: tipo.nombre,
          descripcion: tipo.descripcion,
          habilitado: tipo.habilitado,
        },
        config
      );
      MostrarNotificacion({
        mostrar: true,
        mensaje: `${getlabel()[0].toUpperCase() + getlabel().slice(1)} modificado exitosamente`,
        color: "verde",
      });
      setOpen(false);
    } catch (e: any) {
      MostrarNotificacion({
        mostrar: true,
        mensaje: `Error: No se pudo modificar el ${getlabel()}`,
        color: "rojo",
      });
    }
  };

  const handleChangeInput = (prop: keyof ProductoInterface, value: any) => {
    setTipo((prevProducto) => ({
      ...prevProducto,
      [prop]: value,
    }));
  };

  const handleClickSubmit = async () => {
    if (ValidarFormulario()) {
      if (modo === "editar") {
        await putTipo();
      }
      if (modo === "registrar") {
        await postTipo();
      }
    } else {
      MostrarNotificacion({
        mostrar: true,
        mensaje: "Hay datos no validos en el formulario",
        color: "rojo",
      });
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg">
        <DialogTitle>
          {modo === "editar"
            ? `Editando ${getlabel()}`
            : modo === "registrar"
            ? `Registrando ${getlabel()}`
            : `Informacion de ${getlabel()}`}
        </DialogTitle>
        <DialogContent>
          <Container display="flex" justifyContent="space-between" alignItems="center">
            <Row xs={12}>
              <Column xs={12}>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"} required error={tipoError.nombre}>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        size="sm"
                        required
                        placeholder="Nombre"
                        value={tipo.nombre}
                        onChange={(e) => handleChangeInput("nombre", e.target.value)}
                      />
                      {tipoError.nombre && (
                        <FormHelperText>
                          <InfoOutlined />
                          Dato invalido
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Column>
                </Row>
                <Row xs={12} sx={{ p: "5px" }}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <FormLabel>Descripcion</FormLabel>
                      <Textarea
                        size="sm"
                        minRows={2.5}
                        placeholder="Descripcion"
                        value={tipo.descripcion}
                        onChange={(e) => handleChangeInput("descripcion", e.target.value)}
                      />
                    </FormControl>
                  </Column>
                </Row>
                <Row xs={12}>
                  <Column xs={12} sx={{ p: "5px" }}>
                    <FormControl disabled={modo === "consulta"}>
                      <Checkbox
                        label="Habilitado"
                        size="lg"
                        sx={{ border: "0px" }}
                        checked={tipo.habilitado}
                        onChange={(e) => handleChangeInput("habilitado", e.target.checked)}
                      />
                    </FormControl>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row xs={12} marginTop={2}>
              <Column xs={6} sx={{ p: "5px" }}>
                <Button color="neutral" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Column>
              {modo !== "consulta" && (
                <Column xs={6} sx={{ p: "5px" }}>
                  <Button color="success" onClick={handleClickSubmit}>
                    Grabar
                  </Button>
                </Column>
              )}
            </Row>
          </Container>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ModalFormOtrosMaestros;

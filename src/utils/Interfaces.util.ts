export default function createExtendedInterfaceForTables<T>(baseInterface: T): T & {
  nombre: string;
  tipo: string;
  periodoValidez: string;
  horariosValidez: string;
  acciones: null;
} {
  return {
    ...baseInterface,
    nombre: "",
    tipo: "",
    periodoValidez: "",
    horariosValidez: "",
    acciones: null,
  };
}

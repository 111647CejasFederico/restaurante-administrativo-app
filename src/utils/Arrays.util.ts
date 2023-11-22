export function buscarObjetoPorCampos<T>(
  array: T[],
  keys: (keyof T)[],
  valores: Partial<T>
): T | undefined {
  return array.find((objeto) => keys.every((key) => objeto[key] === valores[key]));
}

export function borrarObjetosDuplicados<T>(
  arrayOriginal: T[],
  prop: keyof T,
  soloPropiedad: boolean
): T[] {
  const map = new Map(); // Usaremos un Map para eliminar duplicados

  for (const item of arrayOriginal) {
    const keyValue = item[prop];
    if (!map.has(keyValue)) {
      map.set(keyValue, item);
    }
  }

  // Ahora, map.values() contendrá los elementos únicos
  const arrayFiltrado = Array.from(map.values());

  if (soloPropiedad) {
    // Si solo queremos las propiedades, mapeamos el array resultante
    return arrayFiltrado.map((item) => item[prop]);
  }

  return arrayFiltrado;
}

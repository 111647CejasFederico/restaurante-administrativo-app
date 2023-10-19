import { useState } from "react";

type UseUrlAxio = {
  getUrlAxio: () => string;
  setUrlAxio: (url: string) => void;
};

const useUrlAxio = (): UseUrlAxio => {
  const getUrlAxio = (): string => {
    return sessionStorage.getItem("urlAxio") || "";
  };
  const setUrlAxio = (url: string): void => {
    sessionStorage.setItem("urlAxio", url);
  };

  return { getUrlAxio, setUrlAxio };
};

export default useUrlAxio;

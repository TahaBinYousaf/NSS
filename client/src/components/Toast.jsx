import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        className: "shadow-lg lg:mr-10 p-3.5 text-lg",
      }}
    />
  );
};

export default Toast;

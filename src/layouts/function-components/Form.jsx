import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
//import { usePrompt } from "./usePrompt";
//import usePrompt from './usePrompt';
import React from 'react';

const InitialValues = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const Form = () => {
  const [modalStateForm, setModalStateForm] = useState(false);
  const [confirmStateForm, setConfirmStateForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  // @ts-ignore
  const onSubmit = (data) => {
    console.log("Holaaaaa");
    setModalStateForm(!modalStateForm);
    if (confirmStateForm === true) {
      console.log("Holaaaaa");
      setLoading(true);
      fetch("https://formsubmit.co/ajax/706ef5302b0527fc015fef24978ffc55 ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          reset();
          if (data.success === "true") {
            setResponse(true);
            setTimeout(() => setResponse(false), 5000);
          } else {
            setErrorResponse(true);
            setTimeout(() => setErrorResponse(false), 5000);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setErrorResponse(true);
          setTimeout(() => setErrorResponse(false), 5000);
        });
      setConfirmStateForm(false);
    }
  };

  const EmailErrorsList = {
    required: "El campo email es requerido",
    pattern: "El formato del email es incorrecto",
  };
  const MessageErrorsList = {
    required: "El campo message es requerido",
    pattern: "El número máximo de caracteres es 500",
  };
  

  //To the alert when leave to page without send form
  //usePrompt( "¿Está seguro de salir sin enviar el formulario?",JSON.stringify(watch()) !== JSON.stringify(InitialValues) && Object.keys(watch()).length !== 0)

  return (
    <form
      className="flex text-default flex-col justify-around sm:px-20 md:px-8 lg:px-16 items-center  h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
        <div className="flex flex-col w-full ">
          <label className="text-base font-semibold leading-none">
            Nombre completo
          </label>
          <input
            type="text"
            className={`form-control-paqari ${
              typeof errors.fullName?.type !== "string"
                ? ""
                : "border-2 border-red-500"
            } `}
            {...register("fullName", { required: true })}
          />
          <p
            className={`text-xs	${
              errors.fullName?.type === "required" ? "" : "invisible"
            } text-red-500`}
          >
            El campo Nombre completo es requerido
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-base font-semibold leading-none ">
            Email
          </label>
          <input
            type="text"
            className={`form-control-paqari ${
              typeof errors.email?.type !== "string"
                ? ""
                : "border-2 border-red-500"
            }`}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            })}
          />
          <p
            className={`text-xs ${
              typeof errors.email?.type !== "string" ? "invisible" : ""
            } text-red-500`}
          >
            {errors.email?.type
              ? EmailErrorsList[errors.email?.type]
              : "Espacio que completar"}
          </p>
        </div>
        <div className="flex w-full flex-col">
          <label className="text-base font-semibold leading-none ">
            Asunto
          </label>
          <input
            className={`form-control-paqari ${
              typeof errors.subject?.type !== "string"
                ? ""
                : "border-2 border-red-500"
            }`}
            {...register("subject", { required: true })}
          />

          <p
            className={`text-xs ${
              errors.subject?.type === "required" ? "" : "invisible"
            } text-red-500`}
          >
            El campo Asunto es requerido
          </p>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-between">
            <label className="text-base font-semibold leading-none ">
              Mensaje
            </label>
            <label className="font-xs text-base font-light leading-none text-offset">
              Max. 500 caracteres
            </label>
          </div>
          <textarea
            className={`form-control-paqari-message  ${
              typeof errors.message?.type !== "string"
                ? ""
                : "border-2 border-red-500"
            }`}
            {...register("message", { required: true, maxLength: 500 })}
          />
          {errors.message?.type === "required" && (
            <p className="text-xs text-red-500">El campo message es requerido</p>
          )}
          {errors.message?.type === "maxLength" && (
            <p className="text-xs text-red-500">Número máximo de caracteres es 500</p>
          )}
        </div>
        <button
          type="submit"
          className={`focus:ring-primary btn btn-primary block mt-4 w-full rounded-full	 ${
            loading
              ? "btn-primary-loading"
              : ""
          }  rounded  focus:outline-none focus:ring-2 focus:ring-offset-2`}
          disabled={loading}
        >
          <div className="flex justify-center">
          {loading && (
            <svg className="self-center ... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Enviando ..." : "Enviar"}
          </div>
        </button>
        <Modal
          modalStateForm={modalStateForm}
          setModalStateForm={setModalStateForm}
          confirmStateForm={confirmStateForm}
          setConfirmStateForm={setConfirmStateForm}
        />
      {response && (
        <div
          className="transition-all my-3 flex w-full flex-col items-center justify-center gap-3 rounded-lg bg-green-100 px-3 py-5 text-center text-base text-green-700 dark:text-gray-50 sm:flex-row"
          role="alert"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check-circle"
            className="mr-2 h-4 w-4 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
            ></path>
          </svg>
          El correo fue enviado exitosamente!
        </div>
      )}
      {errorResponse && (
        <div
          className="transition-all my-3 flex w-full flex-col items-center justify-center gap-3 rounded-lg bg-red-100 px-3 py-5 text-center text-base text-red-600 sm:flex-row"
          role="alert"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times-circle"
            className="mr-2 h-4 w-4 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
            ></path>
          </svg>
          Error al enviar el correo!
        </div>
      )}
    </form>
  );
};

export default Form;

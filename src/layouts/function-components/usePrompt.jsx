import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import React from 'react';


function useConfirmExit(confirmExit, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) {
      return;
    }

    const push = navigator.push;

    navigator.push = (...args) => {
      const result = confirmExit();
      if (result !== false) {
        push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when]);
}

function usePrompt(message, when = true) {
  useEffect(() => {
    if (when && typeof window !== 'undefined') {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.onbeforeunload = null;
      }
    };
  }, [message, when]);

  const confirmExit = useCallback(() => {
    if (typeof window !== 'undefined') {
      const confirm = window.confirm(message);
      return confirm;
    }
    return true; // Si no estamos en el navegador, simplemente permitimos la salida.
  }, [message]);
  useConfirmExit(confirmExit, when);
}

export default usePrompt;

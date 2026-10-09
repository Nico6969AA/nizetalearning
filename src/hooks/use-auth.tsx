import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { QueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { miPerfil } from "@/lib/auth.functions";

interface EstadoSesion {
  cargando: boolean;
  userId: string | null;
  nombre: string | null;
  refrescar: () => void;
}

const EstadoInicial: EstadoSesion = {
  cargando: true,
  userId: null,
  nombre: null,
  refrescar: () => {},
};

const ContextoSesion = createContext<EstadoSesion>(EstadoInicial);

export function useSesion(): EstadoSesion {
  return useContext(ContextoSesion);
}

export function ProveedorSesion({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: ReactNode;
}) {
  const [estado, setEstado] = useState<EstadoSesion>(EstadoInicial);
  const montado = useRef(true);

  const cargar = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id ?? null;
      if (!userId) {
        if (montado.current) {
          setEstado({ cargando: false, userId: null, nombre: null, refrescar: cargar });
        }
        return;
      }
      const perfil = await miPerfil();
      if (montado.current) {
        setEstado({ cargando: false, userId, nombre: perfil?.nombre ?? null, refrescar: cargar });
      }
    } catch {
      if (montado.current) {
        setEstado({ cargando: false, userId: null, nombre: null, refrescar: cargar });
      }
    }
  }, []);

  useEffect(() => {
    montado.current = true;
    void cargar();

    // Único listener de identidad en la app: sesión entrante/saliente y perfil.
    const { data: suscripcion } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") {
        // Higiene de cierre: detener consultas en vuelo y vaciar la caché antes
        // de limpiar la sesión, para que Back no restaure datos protegidos.
        void queryClient.cancelQueries();
        queryClient.clear();
        if (montado.current) {
          setEstado({ cargando: false, userId: null, nombre: null, refrescar: cargar });
        }
      } else {
        void queryClient.invalidateQueries();
        void cargar();
      }
    });

    return () => {
      montado.current = false;
      suscripcion.subscription.unsubscribe();
    };
  }, [cargar, queryClient]);

  return <ContextoSesion.Provider value={estado}>{children}</ContextoSesion.Provider>;
}

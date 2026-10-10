-- Clasificar los intentos: limitar registro e inicio de sesión por separado.
ALTER TABLE public.login_attempts ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'login';
COMMENT ON COLUMN public.login_attempts.kind IS 'Tipo de intento: login (fallo de acceso) o register (registro rechazado).';
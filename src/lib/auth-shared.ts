// Helpers compartidos entre cliente y servidor para las cuentas de Nizeta.
// Sin código de servidor: este módulo entra en el bundle del navegador.

export const USUARIO_REGEX = /^[A-Za-z0-9_]{3,20}$/;

export const MENSAJE_USUARIO_INVALIDO =
  "El nombre de usuario debe tener entre 3 y 20 caracteres: letras, números o guiones bajos.";

export const MENSAJE_CONTRASENA_INVALIDA =
  "La contraseña debe tener entre 12 y 128 caracteres.";

export function normalizarUsername(username: string): string {
  return username.trim().toLowerCase();
}

/** Correo sintético interno: nunca recibe correo real (sin recuperación por email). */
export function emailSintetico(username: string): string {
  return `${normalizarUsername(username)}@nizeta.local`;
}

export function validarContrasena(contrasena: string): string | null {
  if (contrasena.length < 12 || contrasena.length > 128) return MENSAJE_CONTRASENA_INVALIDA;
  return null;
}

/** Solo rutas relativas del mismo origen: bloquea protocolos y dominios externos. */
export function rutaDestinoSegura(valor: string | null | undefined): string {
  if (typeof valor === "string" && valor.startsWith("/") && !valor.startsWith("//") && !valor.includes("\\")) {
    return valor;
  }
  return "/";
}

export const DESTINO_GUARDADO = "nizeta-destino-pendiente";

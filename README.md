# Next.js Exa AI SDK

Esta es una aplicación web construida con Next.js que integra el SDK de Exa AI para proporcionar capacidades de búsqueda y procesamiento de lenguaje natural.

## Requisitos Previos

- Node.js (versión 22 o superior)
- pnpm (gestor de paquetes)
- Una cuenta de Exa AI con credenciales de API válidas

## Configuración del Proyecto

1. Clona el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
cd nextjs-exa-ai-sdk
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
EXA_API_KEY=tu_api_key_aquí
```

## Ejecución de la Aplicación

### Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción

Para construir la aplicación:

```bash
pnpm build
```

Para iniciar la versión de producción:

```bash
pnpm start
```

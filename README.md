# Next.js Exa AI SDK

Esta es una aplicación web construida con Next.js que integra el SDK de Exa AI y Vercel AI SDK para proporcionar capacidades de búsqueda y procesamiento de lenguaje natural.

## Requisitos Previos

- Node.js (versión 22 o superior)
- pnpm (gestor de paquetes)
- Una cuenta de Exa AI con credenciales de API válidas
- Una cuenta de OpenAI con credenciales de API válidas

## Configuración del Proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/kristiandrex/nextjs-exa-ai-sdk.git
cd nextjs-exa-ai-sdk
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Exa AI Configuration
EXA_API_KEY=tu_api_key_aquí
EXA_SUMMARY_PROMPT=tu_prompt_de_resumen_aquí

# OpenAI Configuration
OPENAI_API_KEY=tu_api_key_aquí
CHAT_SYSTEM_PROMPT=tu_prompt_del_sistema_aquí
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

## Tecnologías Utilizadas

- Next.js - Framework de React
- Vercel AI SDK - SDK para integración de IA
- Exa AI SDK - SDK para búsqueda y procesamiento de lenguaje natural

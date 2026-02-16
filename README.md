# Wortise CMS - Plataforma de Gestión de Contenidos

Este es un sistema de gestión de contenidos (CMS) moderno y de alto rendimiento, construido como prueba técnica para **Wortise**. La aplicación permite la gestión de artículos para autores autenticados y ofrece una experiencia de lectura fluida y optimizada para los usuarios finales.



## 🚀 Tecnologías Principales

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado fuerte de extremo a extremo)
* **Comunicación API:** [tRPC](https://trpc.io/) (Type-safe APIs sin necesidad de REST o GraphQL)
* **Base de Datos:** [MongoDB](https://www.mongodb.com/) con Driver Nativo para máxima performance
* **Autenticación:** [Better Auth](https://www.better-auth.com/) (Gestión de sesiones segura y moderna)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **Formularios:** React Hook Form + [Zod](https://zod.dev/)

---

## ✨ Características Implementadas

### 🔐 Autenticación y Seguridad
* Sistema de registro e inicio de sesión seguro.
* Protección de rutas mediante **Middleware** de Next.js.
* Sesiones persistentes y manejo de autores.

### 📝 Gestión de Artículos (CRUD)
* **Creación y Edición:** Interfaz intuitiva con validación de datos en tiempo real mediante Zod.
* **Dashboard:** Panel de administración privado para que cada autor gestione sus propias publicaciones.
* **Optimización:** Uso del componente `next/image` para carga y optimización de LCP.

### 🔍 Buscador Server-Side (Filtros Avanzados)
* Búsqueda eficiente procesada directamente en el servidor.
* Filtro simultáneo por: **Título, Contenido y Nombre del Autor**.
* Implementación de **Debounce** en el cliente para optimizar las peticiones a la base de datos y mejorar la UX.

### 👥 Sección de Autores
* Listado dinámico de todos los colaboradores registrados.
* Uso de **Pipelines de Agregación de MongoDB** para calcular en tiempo real la cantidad de artículos publicados por cada autor.
* Navegación por perfiles: Posibilidad de filtrar todas las historias de un autor específico.



---

## 🛠️ Configuración del Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd wortise-cms
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Variables de Entorno:**
    Crea un archivo `.env` en la raíz con los siguientes valores:
    ```env
    MONGODB_URI=mongodb+srv://
    BETTER_AUTH_SECRET=una_clave_aleatoria
    BETTER_AUTH_URL=http://localhost:3000
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

4.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📐 Decisiones de Arquitectura

* **tRPC sobre REST:** Se eligió tRPC para garantizar que cualquier cambio en el esquema del servidor se refleje instantáneamente como un error de TypeScript en el cliente, eliminando errores en tiempo de ejecución (End-to-End Typesafety).
* **Server Components vs Client Components:** Se priorizó el uso de Server Components para la entrega de contenido (SEO y velocidad) y Client Components para la interactividad (Buscador y Formularios).
* **Debounce y URL State:** La búsqueda se sincroniza con la URL (`?q=...`) mediante `useTransition`, lo que permite que los resultados sean compartibles y que la navegación hacia atrás/adelante funcione de forma natural sin recargas innecesarias.

---

## 👨‍💻 Autor
**Nahuel** - Desarrollador Full Stack orientado a performance y escalabilidad.
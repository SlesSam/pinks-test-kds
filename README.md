# Proyecto pink`s test kids

## Descripción
Este proyecto es una aplicación de gestión de órdenes y riders usando NEXTJS

## Instalación
1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Inicia la aplicación con `npm run dev`

## Uso
1. Realizar un `npm run build`
2. Realizar un  `npm run start`

## Mejoras Realizadas y Control de Estados
Se han implementado varias mejoras y una gestión centralizada de los estados de las órdenes y riders. 

### Estructuración del Layout Principal
**Componente `OrdersLayout`**:
- Implementación de una estructura coherente y bien organizada para la aplicación, con una barra de navegación y una sección principal dividida en dos áreas (Kanban y Riders).

### Gestión de Órdenes
**Contexto `OrdersContext`**:
- Creación de un contexto para manejar el estado global de las órdenes.
- Funciones implementadas: `updateOrderState`, `deleteOrder`, `pickup`.

### Gestión de Riders
**Contexto `RidersContext`**:
- Creación de un contexto para manejar el estado global de los riders.
- Asignación automática de órdenes `READY` a los riders y simulación de la entrega.

### Visualización y Gestión de Órdenes en Columnas
**Componente `Column`**:
- Implementación de un componente para mostrar órdenes en diferentes estados dentro de un tablero Kanban.

## Conclusión
Estas mejoras han permitido crear una aplicación más organizada, eficiente e interactiva, facilitando la gestión de órdenes y riders de manera centralizada y automatizada.


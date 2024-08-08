# Cambios y Mejoras

## Estructuración del Layout Principal
**Componente `OrdersLayout`**:
- Se ha implementado una estructura para la aplicación, con una barra de navegación y una sección principal dividida en dos áreas (Kanban y Riders).

## Gestión de Órdenes Riders 
**Contexto `OrdersContext`**:
- Creación de un contexto para manejar el estado global de las órdenes.
- Funciones implementadas: `updateOrderState`, `deleteOrder`, `pickup`.

## Gestión de 
**Contexto `RidersContext`**:
- Creación de un contexto para manejar el estado global de los riders.
- Asignación automática de órdenes `READY` a los riders y simulación de la entrega.

## Visualización y Gestión de Órdenes en Columnas
**Componente `Column`**:
- Implementación de un componente para mostrar órdenes en diferentes estados dentro de un tablero Kanban.

## Control de Estados

### Contexto de Órdenes (`OrdersContext`)
**Descripción**: Utiliza el contexto y el hook `useState` para mantener un estado global de las órdenes.
**Lógica**:
- Inicialización de Órdenes: Escucha nuevas órdenes a través de `OrderOrchestrator` y las agrega al estado.
- Actualización Automática de Estados: Utiliza `useEffect` para cambiar automáticamente el estado de las órdenes de `PENDING` a `IN_PROGRESS` y luego a `READY` usando `setTimeout`.
- Funciones:
  - `updateOrderState`: Cambia el estado de una orden específica.
  - `deleteOrder`: Elimina una orden específica.
  - `pickup`: Filtra una orden específica, simulando su recogida por un rider.

### Contexto de Riders (`RidersContext`)
**Descripción**: Utiliza el contexto y el hook `useState` para mantener un estado global de los riders.
**Lógica**:
- Asignación de Órdenes: Filtra las órdenes `READY` no asignadas, se buscas un `Riders` y se allas asigna el pedido.
- Simulación de Entrega: Simula el tiempo de entrega de una orden asignada utilizando `setTimeout` y luego actualiza el estado de la orden a `DELIVERED`.
- Funciones:
  - `pickup`: Llama a `updateOrderState` para marcar una orden como `DELIVERED` y elimina el rider asociado.

## Resumen de Cambios y Mejoras

- **Gestión Centralizada del Estado**: Implementación de contextos (`OrdersContext` y `RidersContext`) para manejar el estado global de órdenes y riders, facilitando la gestión y actualización del estado.
- **Automatización del Flujo de Trabajo**: Automatización de la transición de estados de las órdenes y la asignación de órdenes a los riders, mejorando la eficiencia y realismo de la aplicación.
- **Interactividad Mejorada**: Componentes interactivos como `Column` permiten una mejor visualización y gestión de las órdenes, proporcionando una experiencia de usuario más dinámica.


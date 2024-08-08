import Column from "@/components/Column";
import s from "./Kanban.module.scss";
import { useOrders } from "@/contexts/Orders.context";

// version 3
export default function Kanban() {
  const { orders, updateOrderState, deleteOrder } = useOrders();

  const handleOrderClick = (orderId: string, currentState:  "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    const nextState = getNextStatus(currentState);
    updateOrderState(orderId, nextState);
  };

  const handleDeliveredOrderClick = (orderId: string) => {
    deleteOrder(orderId);
  };

  const getNextStatus = (status:  "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    switch (status) {
      case "PENDING":
        return "IN_PROGRESS";
      case "IN_PROGRESS":
        return "READY";
      case "READY":
        return "DELIVERED";
      default:
        return "PENDING";
    }
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED")}
        onClick={(order) => handleDeliveredOrderClick(order.id)}
      />
    </section>
  );
}

// export default function Kanban() {
//   const { orders, pickup } = useOrders();

//   const handleOrderClick = (orderId: string, currentState: string) => {
//     const nextState = getNextStatus(currentState);
//     pickup({ id: orderId, state: nextState, items: [] }); // Temporal
//   };

//   const getNextStatus = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "IN_PROGRESS";
//       case "IN_PROGRESS":
//         return "READY";
//       case "READY":
//         return "DELIVERED";
//       default:
//         return "PENDING";
//     }
//   };

//   return (
//     <section className={s["pk-kanban"]}>
//       <Column
//         title="Pendiente"
//         orders={orders.filter((i) => i.state === "PENDING")}
//         onClick={(order) => handleOrderClick(order.id, order.state)}
//       />
//       <Column
//         title="En preparación"
//         orders={orders.filter((i) => i.state === "IN_PROGRESS")}
//         onClick={(order) => handleOrderClick(order.id, order.state)}
//       />
//       <Column
//         title="Listo"
//         orders={orders.filter((i) => i.state === "READY")}
//         onClick={(order) => handleOrderClick(order.id, order.state)}
//       />
//       <Column
//         title="Entregado"
//         orders={orders.filter((i) => i.state === "DELIVERED")}
//         onClick={(order) => handleOrderClick(order.id, order.state)}
//       />
//     </section>
//   );
// }


/*
export default function Kanban() {
  const { orders, pickup } = useOrders();

  const handleOrderClick = (orderId: string, currentState: string) => {
    const nextState = getNextStatus(currentState);
    pickup({ id: orderId, state: nextState, items: [] }); // Temporal
  };

  const getNextStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "IN_PROGRESS";
      case "IN_PROGRESS":
        return "READY";
      case "READY":
        return "DELIVERED";
      default:
        return "PENDING";
    }
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
    </section>
  );
}
*/

/*
export default function Kanban() {
  const { orders, pickup } = useOrders();

  const handleOrderClick = (orderId: string, currentState: string) => {
    const nextState = getNextStatus(currentState);
    // Suponiendo que hay una función para actualizar el estado de la orden en el servidor
    // await updateOrderStatus(orderId, nextState);
    pickup({ id: orderId, state: nextState, items: [] }); // Temporal
  };

  const getNextStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'IN_PROGRESS';
      case 'IN_PROGRESS':
        return 'READY';
      case 'READY':
        return 'DELIVERED';
      default:
        return 'PENDING';
    }
  };

  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="En preparación"
        orders={orders.filter((i) => i.state === "IN_PROGRESS")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Listo"
        orders={orders.filter((i) => i.state === "READY")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
      <Column
        title="Entregado"
        orders={orders.filter((i) => i.state === "DELIVERED")}
        onClick={(order) => handleOrderClick(order.id, order.state)}
      />
    </section>
  );
}
*/
// export default function Kanban() {
//   const { orders } = useOrders();

//   return (
//     <section className={s["pk-kanban"]}>
//       <Column
//         title="Pendiente"
//         orders={orders.filter((i) => i.state === "PENDING")}
//         onClick={() =>
//           alert(
//             "mmmmm..., deberias de modificar esto! tenemos que hacer que las ordenes lleguen hasta listo y se entreguen!"
//           )
//         }
//       />
//       <Column title="En preparación" orders={[]} />
//       <Column title="Listo" orders={[]} />
//     </section>
//   );
// }
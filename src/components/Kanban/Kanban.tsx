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

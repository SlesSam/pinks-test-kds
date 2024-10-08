import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";

export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  onClick?: (order: Order) => void;
};


export default function Column({ orders, title, onClick }: ColumnProps) {
  return (
    <div className={s["pk-column"]}>
      <div className={s["pk-column__title"]}>
        <h3>{title}</h3>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => onClick && onClick(order)}
          className={`${s["pk-card"]} ${order.state === "DELIVERED" ? s["pk-card--delivered"] : ""}`}
        >
          <div>
            <span>
              Orden: <b>{order.id}</b>
            </span>
          </div>
          <div>
            {order.items.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import Kanban from "@/components/Kanban";
import Riders from "@/components/Riders";
import Logo from "@/bases/Logo";
import s from "./OrdersLayout.module.scss";
import { OrdersProvider } from "@/contexts/Orders.context";
import { RidersProvider } from "@/contexts/Riders.context";

// version 3
export default function OrdersLayout() {
  return (
    <OrdersProvider>
      <RidersProvider>
        <main className={s["pk-layout"]}>
          <nav className={s["pk-layout__navbar"]}>
            <Logo size="S" />
            <span>KDS: Krazy Display Service</span>
          </nav>
          <article className={s["pk-layout__app"]}>
            <Kanban />
            <Riders />
          </article>
        </main>
      </RidersProvider>
    </OrdersProvider>
  );
}


// export default function OrdersLayout() {
//   return (
//     <main className={s["pk-layout"]}>
//       <nav className={s["pk-layout__navbar"]}>
//         <Logo size="S" />
//         <span>KDS: Krazy Display Service</span>
//       </nav>
//       <article className={s["pk-layout__app"]}>
//         <Kanban />
//         <Riders />
//       </article>
//     </main>
//   );
// }
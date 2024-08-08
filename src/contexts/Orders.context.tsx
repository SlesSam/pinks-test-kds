import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


// version 3
export type OrdersContextProps = {
  orders: Array<Order>;
  updateOrderState: (orderId: string, newState: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => void;
  deleteOrder: (orderId: string) => void;
  pickup: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps | undefined>(
  undefined
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    orders.forEach((order) => {
      if (order.state === "PENDING") {
        const timer = setTimeout(() => {
          updateOrderState(order.id, "IN_PROGRESS");
        }, 2000);
        timers.push(timer);
      } else if (order.state === "IN_PROGRESS") {
        const timer = setTimeout(() => {
          updateOrderState(order.id, "READY");
        }, 2000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [orders]);

  const updateOrderState = (orderId: string, newState: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, state: newState } : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId));
  };

  const pickup = (order: Order) => {
    setOrders((prevOrders) => prevOrders.filter(o => o.id !== order.id));
  };

  const context = {
    orders,
    updateOrderState,
    pickup,
    deleteOrder
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};

// export type OrdersContextProps = {
//   orders: Array<Order>;
//   pickup: (order: Order) => void;
// };

// export const OrdersContext = createContext<OrdersContextProps | undefined>(
//   undefined
// );

// export type OrdersProviderProps = {
//   children: ReactNode;
// };

// export function OrdersProvider(props: OrdersProviderProps) {
//   const [orders, setOrders] = useState<Array<Order>>([]);

//   useEffect(() => {
//     const orderOrchestrator = new OrderOrchestrator();
//     const listener = orderOrchestrator.run();
//     listener.on("order", (order) => {
//       setOrders((prev) => [...prev, order]);
//     });
//   }, []);

//   useEffect(() => {
//     const timers: NodeJS.Timeout[] = [];

//     orders.forEach((order) => {
//       if (order.state === "PENDING") {
//         const timer = setTimeout(() => {
//           setOrders((prevOrders) =>
//             prevOrders.map((o) =>
//               o.id === order.id ? { ...o, state: "IN_PROGRESS" } : o
//             )
//           );
//         }, 2000);
//         timers.push(timer);
//       } else if (order.state === "IN_PROGRESS") {
//         const timer = setTimeout(() => {
//           setOrders((prevOrders) =>
//             prevOrders.map((o) =>
//               o.id === order.id ? { ...o, state: "READY" } : o
//             )
//           );
//         }, 2000);
//         timers.push(timer);
//       }
//     });

//     return () => {
//       timers.forEach(clearTimeout);
//     };
//   }, [orders]);

//   const pickup = (order: Order) => {
//     setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
//   };

//   const context = {
//     orders,
//     pickup,
//   };

//   return (
//     <OrdersContext.Provider value={context}>
//       {props.children}
//     </OrdersContext.Provider>
//   );
// }

// export const useOrders = () => {
//   const context = useContext(OrdersContext);
//   if (!context) {
//     throw new Error("useOrders must be used within an OrdersProvider");
//   }
//   return context;
// };

/*
export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps | undefined>(
  undefined
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    orders.forEach((order) => {
      if (order.state === "PENDING") {
        const timer = setTimeout(() => {
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === order.id ? { ...o, state: "IN_PROGRESS" } : o
            )
          );
        }, 2000);
        timers.push(timer);
      } else if (order.state === "IN_PROGRESS") {
        const timer = setTimeout(() => {
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === order.id ? { ...o, state: "READY" } : o
            )
          );
        }, 2000);
        timers.push(timer);
      } else if (order.state === "READY") {
        const timer = setTimeout(() => {
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === order.id ? { ...o, state: "DELIVERED" } : o
            )
          );
        }, 2000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [orders]);

  const pickup = (order: Order) => {
    setOrders((prevOrders) => prevOrders.filter(o => o.id !== order.id));
  };

  const context = {
    orders,
    pickup,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
*/

// export type OrdersContextProps = {
//   orders: Array<Order>;
//   pickup: (order: Order) => void;
// };

// // export const OrdersContext = createContext<OrdersContextProps>(
// //   // @ts-ignore
// //   {}
// // );

// export const OrdersContext = createContext<OrdersContextProps | undefined>(
//   undefined
// );

// export type OrdersProviderProps = {
//   children: ReactNode;
// };

// export function OrdersProvider(props: OrdersProviderProps) {
//   const [orders, setOrders] = useState<Array<Order>>([]);

//   useEffect(() => {
//     const orderOrchestrator = new OrderOrchestrator();
//     const listener = orderOrchestrator.run();
//     listener.on("order", (order) => {
//       setOrders((prev) => [...prev, order]);
//     });
//     // return () => {
//     //   listener.off("order", );
//     // };
//   }, []);

//   const pickup = (order: Order) => {
//     setOrders((prevOrders) => prevOrders.filter(o => o.id !== order.id));

//     // alert(
//     //   "necesitamos eliminar del kanban a la orden recogida! Rapido! antes que nuestra gente de tienda se confunda!"
//     // );
//   };

//   const context = {
//     orders,
//     pickup,
//   };

//   return (
//     <OrdersContext.Provider value={context}>
//       {props.children}
//     </OrdersContext.Provider>
//   );
// }

// export const useOrders = () => {
//   const context = useContext(OrdersContext);
//   if (!context) {
//     throw new Error("useOrders must be used within an OrdersProvider");
//   }
//   return context;
// };

// export const useOrders = () => useContext(OrdersContext);
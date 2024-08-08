import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";


// version 3
export type RidersContextProps = {
  riders: Array<Rider>;
};

export const RidersContext = createContext<RidersContextProps | undefined>(
  undefined
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider({ children }: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, updateOrderState } = useOrders();

  useEffect(() => {
    const availableOrders = orders.filter((order) => 
      !assignedOrders.includes(order.id) && order.state === "READY"
    );

    if (availableOrders.length > 0) {
      const order = availableOrders[0];
      setAssignedOrders((prev) => [...prev, order.id]);

      const rider: Rider = {
        orderWanted: order.id,
        pickup: () => {
          updateOrderState(order.id, "DELIVERED"), 
          setRiders((prevRiders) => prevRiders.filter((r) => r.orderWanted !== order.id));
        }
      };

      setRiders((prev) => [...prev, rider]);

      setTimeout(() => {
        rider.pickup();
      }, getRandomInterval(10_000, 20_000));

    }
  }, [orders, assignedOrders, updateOrderState]);

  const context = { riders };

  return (
    <RidersContext.Provider value={context}>
      {children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => {
  const context = useContext(RidersContext);
  if (!context) {
    throw new Error("useRiders must be used within a RidersProvider");
  }
  return context;
};

// Version 2
// export type RidersContextProps = {
//   riders: Array<Rider>;
// };

// export const RidersContext = createContext<RidersContextProps | undefined>(
//   undefined
// );

// export type RidersProviderProps = {
//   children: ReactNode;
// };

// export function RidersProvider({ children }: RidersProviderProps) {
//   const [riders, setRiders] = useState<Array<Rider>>([]);
//   const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
//   const { orders, pickup } = useOrders();

//   useEffect(() => {
//     const availableOrders = orders.filter(
//       (order) => !assignedOrders.includes(order.id) && order.state === "READY"
//     );

//     if (availableOrders.length > 0) {
//       const order = availableOrders[0];
//       setAssignedOrders((prev) => [...prev, order.id]);

//       const rider: Rider = {
//         orderWanted: order.id,
//         pickup: () => pickup(order),
//       };

//       setTimeout(() => {
//         setRiders((prev) => [...prev, rider]);
//       }, getRandomInterval(4_000, 10_000));

//       setTimeout(() => {
//         setAssignedOrders((prev) => prev.filter((id) => id !== order.id));
//         setRiders((prev) => prev.filter((r) => r.orderWanted !== order.id));
//         pickup(order);
//       }, getRandomInterval(6_000, 12_000));
//     }
//   }, [orders, assignedOrders, pickup]);

//   useEffect(() => {
//     setRiders((prevRiders) =>
//       prevRiders.filter((rider) =>
//         orders.some(
//           (order) => order.id === rider.orderWanted && order.state !== "DELIVERED"
//         )
//       )
//     );
//   }, [orders]);

//   const context = { riders };

//   return (
//     <RidersContext.Provider value={context}>
//       {children}
//     </RidersContext.Provider>
//   );
// }

// export const useRiders = () => {
//   const context = useContext(RidersContext);
//   if (!context) {
//     throw new Error("useRiders must be used within a RidersProvider");
//   }
//   return context;
// };


//version 1
/*
export type RidersContextProps = {
  riders: Array<Rider>;
};

export const RidersContext = createContext<RidersContextProps | undefined>(
  undefined
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider({ children }: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup, } = useOrders();

  useEffect(() => {
    const availableOrders = orders.filter((order) => 
      !assignedOrders.includes(order.id)
    );

    if (availableOrders.length > 0) {
      const order = availableOrders[0];
      setAssignedOrders((prev) => [...prev, order.id]);

      const rider: Rider = {
        orderWanted: order.id,
        pickup: () => pickup(order),
      };

      setTimeout(() => {
        setRiders((prev) => [...prev, rider]);
      }, getRandomInterval(4_000, 10_000));

      // Transición automática a 'DELIVERED'
      setTimeout(() => {
        setAssignedOrders((prev) => prev.filter(id => id !== order.id));
        setRiders((prev) => prev.filter(r => r.orderWanted !== order.id));
        setOrders((prevOrders: any[]) =>
          prevOrders.map((o: { id: string; }) =>
            o.id === order.id ? { ...o, state: "DELIVERED" } : o
          )
        );
      }, getRandomInterval(6_000, 12_000));
    }
  }, [orders, assignedOrders, pickup]);

  const context = { riders };

  return (
    <RidersContext.Provider value={context}>
      {children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => {
  const context = useContext(RidersContext);
  if (!context) {
    throw new Error("useRiders must be used within a RidersProvider");
  }
  return context;
};
*/
  
 /*export type RidersContextProps = {
    riders: Array<Rider>;
  };

  export const RidersContext = createContext<RidersContextProps | undefined>(
    undefined
  );
  // export const RidersContext = createContext<RidersContextProps>(
  //   // @ts-ignore
  //   {}
  // );
  
  export type RidersProviderProps = {
    children: ReactNode;
  };

  export function RidersProvider({ children }: RidersProviderProps) {
    const [riders, setRiders] = useState<Array<Rider>>([]);
    const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
    const { orders, pickup } = useOrders();
  
    useEffect(() => {
      const availableOrders = orders.filter((order) => 
        !assignedOrders.includes(order.id)
      );
  
      if (availableOrders.length > 0) {
        const order = availableOrders[0]; // Tomar la primera orden disponible
        setAssignedOrders((prev) => [...prev, order.id]);
        
        const rider: Rider = {
          orderWanted: order.id,
          pickup: () => pickup(order), // Al recoger una orden, llamar al método pickup
        };
  
        setTimeout(() => {
          setRiders((prev) => [...prev, rider]);
        }, getRandomInterval(4_000, 10_000));
      }
    }, [orders, assignedOrders, pickup]);
  
    useEffect(() => {
      // Limpiar órdenes recogidas
      setRiders((prevRiders) => 
        prevRiders.filter((rider) => 
          orders.some((order) => order.id === rider.orderWanted && order.state !== "DELIVERED")
        )
      );
    }, [orders]);
  
    const context = { riders };
  
    return (
      <RidersContext.Provider value={context}>
        {children}
      </RidersContext.Provider>
    );
  }
  
  export const useRiders = () => {
    const context = useContext(RidersContext);
    if (!context) {
      throw new Error("useRiders must be used within a RidersProvider");
    }
    return context;
  };
  

  // export function RidersProvider(props: RidersProviderProps) {
  //   const [riders, setRiders] = useState<Array<Rider>>([]);
  //   const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  //   const { orders, pickup } = useOrders();
  
  //   useEffect(() => {
  //     const order = orders.find((order) => !assignedOrders.includes(order.id));
  //     if (order) {
  //       setAssignedOrders((prev) => [...prev, order.id]);
  //       setTimeout(() => {
  //         setRiders((prev) => [
  //           ...prev,
  //           {
  //             orderWanted: order.id,
  //             pickup,
  //           },
  //         ]);
  //       }, getRandomInterval(4_000, 10_000));
  //     }
  //   }, [orders]);
  
  //   const context = { riders };
  //   return (
  //     <RidersContext.Provider value={context}>
  //       {props.children}
  //     </RidersContext.Provider>
  //   );
  // }
  
  // export const useRiders = () => useContext(RidersContext); */
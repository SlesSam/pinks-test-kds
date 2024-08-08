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

import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sells from "./routes/sells/sells.tsx";
import Order from "./routes/order/order.tsx";
import Restaurant from "./routes/restaurant/restaurant.tsx";
import Cashier from "./routes/cashier/cashier.tsx";
import Login from "./routes/login/login.tsx";
import Host from "./routes/host/host.tsx";
import FingerRegister from "./routes/fingerRegister/fingerRegister.tsx";
import Reports from "./routes/reports/reports.tsx";
import ProtectedRoute from "./components/protect/protectedRoutes/protectedRoute.tsx";
import { useAuthStore } from "./store/auth/auth.store.ts";
import {
  BIOMETRICS_PATH,
  ENTRY_PATH,
  HOST_PATH,
  PHONE_PATH,
  RAPPI_PATH,
  REPORTS_PATH,
  RESTAURANT_ORDER_PATH,
  RESTAURANT_PATH,
  SELL_TYPES_PATH,
  TABLES_CONTROL_PATH,
  TO_GO_PATH,
} from "./lib/routes.paths.lib.ts";
import TablesControl from "./routes/tablesControl/tablesControl.tsx";
import { CASHIER } from "./components/tools/confirmPassword/lib.ts";
import ToGoOrder from "./routes/toGoOrder/toGoOrder.tsx";
import RappiOrders from "./routes/rappiOrder/rappiOrder.tsx";
import PhoneOrders from "./routes/phoneOrder/phoneOrder.tsx";

const App = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const router = createBrowserRouter([
    {
      path: ENTRY_PATH,
      element: <Login />,
    },
    {
      path: ENTRY_PATH,
      element: <ProtectedRoute isAllowed={isAuth} />,
      children: [
        {
          path: HOST_PATH,
          element: <Host />,
        },
        {
          path: SELL_TYPES_PATH,
          element: <Sells />,
        },
        {
          path: RESTAURANT_ORDER_PATH,
          element: <Order />,
        },
        {
          path: CASHIER,
          element: <Cashier />,
        },
        {
          path: BIOMETRICS_PATH,
          element: <FingerRegister />,
        },
        {
          path: REPORTS_PATH,
          element: <Reports />,
        },
        {
          path: RESTAURANT_PATH,
          element: <Restaurant />,
        },
        {
          path: TABLES_CONTROL_PATH,
          element: <TablesControl />,
        },
        {
          path: TO_GO_PATH,
          element: <ToGoOrder />,
        },
        {
          path: RAPPI_PATH,
          element: <RappiOrders />,
        },
        {
          path: PHONE_PATH, ///
          element: <PhoneOrders />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
// rollback
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

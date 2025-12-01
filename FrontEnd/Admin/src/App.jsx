import router from "../Routes/Route";
import { RouterProvider } from "react-router-dom";
import { ServiceProvider } from "./Contaxt/SetServiceContext";
import { HistoryProvider } from "./Contaxt/HistoryContaxt";

function App() {
  return (
    <HistoryProvider>
      <ServiceProvider>
        <div>
          <RouterProvider router={router} />
        </div>
      </ServiceProvider>
    </HistoryProvider>
  );
}

export default App;

import router from "./routes/Route";
import { RouterProvider } from "react-router-dom";
import { ServiceProvider } from "./context/SetServiceContext";
import { HistoryProvider } from "./context/HistoryContext";

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

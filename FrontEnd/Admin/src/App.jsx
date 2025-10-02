import router from "../Routes/Route";
import { RouterProvider } from "react-router-dom";
import { HistoryProvider } from "./Contaxt/HistoryContaxt";

function App() {
  return (
    <HistoryProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </HistoryProvider>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./context/AppContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);

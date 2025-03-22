import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "./components/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShopContextProvider>
          <Toast />
          <App />
        </ShopContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

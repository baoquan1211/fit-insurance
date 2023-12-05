import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingPage from "./components/loading-page";

const HomePage = React.lazy(() => import("./pages/home"));
const LoginPage = React.lazy(() => import("./pages/login"));
const RegisterPage = React.lazy(() => import("./pages/register"));

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route path="/" element={<RootLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

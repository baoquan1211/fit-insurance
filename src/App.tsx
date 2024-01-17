import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts";
import { Provider } from "react-redux";
import { store, persistor } from "./stores";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoadingPage from "./components/loading-page";
import ErrorPage from "./components/error-page";
import FooterLayout from "./layouts/footer-layout";

const HomePage = React.lazy(() => import("./pages/home"));
const LoginPage = React.lazy(() => import("./pages/login"));
const RegisterPage = React.lazy(() => import("./pages/register"));
const InsurancePage = React.lazy(() => import("./pages/insurance"));
const InsuranceDetailPage = React.lazy(
  () => import("./pages/insurance-detail"),
);
const HealthQuestionPage = React.lazy(() => import("./pages/health-question"));
const InsuredRegisterPage = React.lazy(
  () => import("./pages/insured-register"),
);
const ContractDetailPage = React.lazy(() => import("./pages/contract-detail"));
const ContractManagePage = React.lazy(() => import("./pages/contract-manage"));
const PayoutRequestPage = React.lazy(() => import("./pages/payout-request"));

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
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route
                      path="baohiem/chi-tiet/:id"
                      element={<InsuranceDetailPage />}
                    />
                    <Route
                      path="cau-hoi-suc-khoe"
                      element={<HealthQuestionPage />}
                    />
                    <Route
                      path="dang-ky-thong-tin"
                      element={<InsuredRegisterPage />}
                    />
                    <Route
                      path="hopdong/chi-tiet/:id"
                      element={<ContractDetailPage />}
                    />
                    <Route
                      path="/hopdong/quan-ly"
                      element={<ContractManagePage />}
                    />
                    <Route
                      path="/yeu-cau-thanh-toan"
                      element={<PayoutRequestPage />}
                    />
                    // Co footer
                    <Route element={<FooterLayout />}>
                      <Route path="" element={<HomePage />} />
                      <Route path="baohiem/:slug" element={<InsurancePage />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
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

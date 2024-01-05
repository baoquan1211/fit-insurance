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
const InsuredPerson = React.lazy(() => import("./pages/insured-person"));
const ContractDetail = React.lazy(() => import("./pages/contract-detail"));
const ContractManage = React.lazy(() => import("./pages/contract-manage"));

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
                      element={<InsuredPerson />}
                    />
                    <Route
                      path="hopdong/chi-tiet/:id"
                      element={<ContractDetail />}
                    />
                    <Route
                      path="/hopdong/quan-ly"
                      element={<ContractManage />}
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

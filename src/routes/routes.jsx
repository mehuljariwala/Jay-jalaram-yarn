import React from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminPage from "../container/AdminPage/AdminPage";
import AdminConfigPage from "../container/AdminConfigPage/AdminConfigPage";
import DashboardContent from "../container/AdminConfigPage/components/DashboardContent";
import UsersPage from "../container/UsersPage/UsersPage";
import InsightsPage from "../container/InsightsPage/InsightsPage";
import App from "../App";
import Choice from "../Choice";

export const Routes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <RouterRoutes>
          <Route path="/Home" element={<App />} />
          <Route path="/Selection" element={<Choice />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/admin-config" element={<AdminConfigPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
          <Route path="/get-insights" element={<InsightsPage />} />
          <Route path="/" element={<Navigate to="/Home" replace />} />
        </RouterRoutes>
      </BrowserRouter>
    </React.Fragment>
  );
};

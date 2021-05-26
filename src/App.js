import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import ErrorBoundary from "@/components/ErrorBoundary"
import Layout from "@/layouts/Default"
import HomeRoute from "@/controllers/Home"
import UploadRoute from "@/controllers/Upload"

function App() {
 return (
    <Router>
      <ToastProvider>
        <Layout>
          <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <HomeRoute />
            </Route>
            <Route exact path="/upload">
              <UploadRoute />
            </Route>
          </Switch>
          </ErrorBoundary>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;

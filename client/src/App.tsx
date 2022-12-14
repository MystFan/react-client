import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Layout from './app/layout/Layout';
import Login from './features/users/Login';
import './App.css';
import RouteGuard from './app/common/components/RouteGuard';
import ErrorBoundary from './app/common/components/ErrorBoundary';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <ErrorBoundary>
        <BaseProvider theme={LightTheme}>
          <Router>
            <Routes>
              <Route path="login" element={<Login />}></Route>
              <Route element={<RouteGuard />}>
                <Route path="*" element={<Layout />}></Route>
              </Route>
            </Routes>
          </Router>
        </BaseProvider>
      </ErrorBoundary>
    </StyletronProvider>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Layout from './app/layout/Layout';
import Login from './features/users/Login';
import UserActions from './store/users/user.actions';
import './App.css';
import RouteGuard from './app/common/components/RouteGuard';
import { getItemFromStorage } from './app/common/storage';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
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
    </StyletronProvider>
  );
}

export default App;

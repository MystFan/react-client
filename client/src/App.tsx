import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Layout from './app/layout/Layout';
import Login from './features/users/Login';

import './App.css';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Router>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<Layout />}></Route>
          </Routes>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
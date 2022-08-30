import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.min.css'; // 'antd/dist/antd.css' is not working with react5.0 => https://github.com/ant-design/ant-design/issues/33327
import './index.css';
import App from './components/App';

import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import client from './apollo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

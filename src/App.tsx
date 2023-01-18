import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { queryClient } from './lib';
import Gateway from './pages/gateway/Gateway';
import { Index } from './pages/home';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/gateway/:id" exact component={Gateway} />
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';


  // *** react query setup. alternative method of calling API ***/
const qc = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
    },
  },
});

const QueryProvider = ({ children }) => {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

QueryProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default QueryProvider;
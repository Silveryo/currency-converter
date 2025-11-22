import { QueryClient } from '@tanstack/react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ExchangeRatesDataSerializable } from './lib/types';
import { shouldRefetch } from './lib/refetch-rules';
import { createIDBPersister } from './lib/persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import ExchangeComposition from './compositions/exchange';

// strong caching and as little refetching as possible
// because the only date we fetch is update once a day.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: query => {
        const data = query.state.data as ExchangeRatesDataSerializable | undefined;
        const isStale = shouldRefetch(data?.dateIso);
        return isStale ? 0 : Infinity;
      },
    },
  },
});
const persister = createIDBPersister('cnb-rates-cache');

const GlobalStyle = createGlobalStyle`
    body {
      
    }
`;

const theme = {
    mobile: '768px',
    desktop: '1024px',
};

function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <div>ČNB currency converter app</div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ExchangeComposition />
        
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

export default App;

import { QueryClient } from '@tanstack/react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import type { ExchangeRatesDataSerializable } from './lib/types';
import { shouldRefetch } from './lib/refetch-rules';
import { createIDBPersister } from './lib/persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import ExchangeComposition from './compositions/exchange';
import ThemeToggle from './components/theme.toggle';
import useThemeMode from './hooks/useThemeMode';
import { darkTheme, lightTheme } from './styles/themes';

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

function App() {
  const { mode, toggleTheme } = useThemeMode();
  const activeTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ThemeProvider theme={activeTheme}>
        <GlobalStyle />
        <ExchangeComposition />
        <ThemeToggle mode={mode} toggle={toggleTheme} />
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

export default App;

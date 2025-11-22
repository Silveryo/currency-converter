import { QueryClient } from '@tanstack/react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { shouldRefetch } from './lib/refetch-rules';
import { createIDBPersister } from './lib/persister';
import { lightTheme, darkTheme } from './styles/themes';
import type { ExchangeRatesDataSerializable } from './lib/types';
import useThemeMode from './hooks/useThemeMode';
import ExchangeComposition from './compositions/exchange';
import ThemeToggle from './components/theme.toggle';

const cachedQueryClient = new QueryClient({
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
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    margin: 0;
    font-family: system-ui, sans-serif;
  }
`;

function App() {
  const { mode, toggleTheme } = useThemeMode();
  const activeTheme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <PersistQueryClientProvider client={cachedQueryClient} persistOptions={{ persister }}>
      <ThemeProvider theme={activeTheme}>
        <div style={{ padding: '1rem', textAlign: 'right' }}>
          <ThemeToggle toggle={toggleTheme} mode={mode} />
        </div>

        <GlobalStyle />
        <ExchangeComposition />
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

export default App;

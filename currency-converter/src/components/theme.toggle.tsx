import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface Props {
  toggle: () => void;
  mode: 'light' | 'dark';
}

function ThemeToggle({ toggle, mode }: Props) {
  return (
    <Button onClick={toggle} aria-label="Toggle Dark Mode">
      {mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
}

export default ThemeToggle;
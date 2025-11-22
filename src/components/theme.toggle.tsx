import styled from 'styled-components';

const Button = styled.button`
  background: trasparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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

function ThemeToggle({toggle, mode}: Props) {
    return (
        <Button onClick={toggle} aria-label="Toggle theme">
            Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </Button>
    );
}

export default ThemeToggle;

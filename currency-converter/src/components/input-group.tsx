import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  gap: 8px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input,
  select {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 16px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
    }
  }
`;

export default InputGroup;

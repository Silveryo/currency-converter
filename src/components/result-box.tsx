import styled from 'styled-components';

const ResultBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  font-size: 24px;
  text-align: center;

  border-radius: 8px;
  padding: 16px;
`;
export default ResultBox;

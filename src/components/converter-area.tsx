import styled from 'styled-components';

const ConverterArea = styled.aside`
  grid-area: converter;

  @media (min-width: ${({ theme }) => theme.mobile}) {
    position: sticky;
    top: 24px;
  }
`;

export default ConverterArea;

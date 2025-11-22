import styled from 'styled-components';

const PageLayout = styled.div`
    display: grid;
    gap: 24px;

    padding: 16px;
    max-width: 1200px;
    margin 0 auto;

    /* mobile */
    grid-template-columns: 1fr;
    grid-template-areas:
        "converter"
        "list";
    
    /* desktop */
    @media (min-width: ${({ theme }) => theme.mobile} {
    grid-template-columns: 1fr 350px;
    grid-template-areas:
        "list converter"
    align-items: start;
    }
`;

export default PageLayout;

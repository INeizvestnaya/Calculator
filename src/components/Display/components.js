import styled from 'styled-components';

const DisplayWrapper = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 0% 6% 0% 6%;
`;

const CurrentExpression = styled.div`
  font-size: 150%;
  color: ${({ theme }) => theme.colors.font};
  height: 60%;
`;
const CurrentHistory = styled.div`
  font-size: 70%;
  color: ${({ theme }) => theme.colors.font};
  height: 20%;
`;

export { DisplayWrapper, CurrentExpression, CurrentHistory };

import styled from 'styled-components';

const CButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonsBackgound};
  border-radius: 20%;
  border: 2px solid ${({ theme }) => theme.colors.buttonsBorder};
  color: ${({ theme }) => theme.colors.font};
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
  @media (max-width: 1000px) {
    font-size: 25px;
    width: 70px;
    height: 70px;
  }
  @media (max-width: 750px) {
    font-size: 20px;
    width: 50px;
    height: 50px;
  }
  @media (min-width: 1001px) {
    font-size: 35px;
    width: 100px;
    height: 100px;
  }
`;

export default CButton;

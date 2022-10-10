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
    height: ${(props) => (props.long ? '150px' : '70px')};
    ${(props) => props.long && 'border-radius: 15px;'}
  }
  @media (max-width: 750px) {
    font-size: 20px;
    width: 50px;
    height: ${(props) => (props.long ? '110px' : '50px')};
    ${(props) => props.long && 'border-radius: 15px;'}
  }
  @media (min-width: 1001px) {
    font-size: 35px;
    width: 100px;
    height: ${(props) => (props.long ? '220px' : '100px')};
    ${(props) => props.long && 'border-radius: 20px;'}
  }
`;

export { CButton };

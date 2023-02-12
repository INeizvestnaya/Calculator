import styled from 'styled-components';

const ShowHideButton = styled.button`
  width: fit-content;
  height: fit-content;
  @media (orientation: portrait) {
    & {
      margin-bottom: 1%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (orientation: landscape) {
    & {
      margin-top: 1%;
      margin-right: 1%;
    }
  }
  font-size: 70%;
  border: 2px solid ${({ theme }) => theme.colors.buttonsBorder};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.buttonsBackgound};
  color: ${({ theme }) => theme.colors.font};
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

export { ShowHideButton };

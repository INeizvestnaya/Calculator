import styled from 'styled-components';

const SettingsLabel = styled.div`
  padding: 2% 3% 1% 3%;
  color: ${({ theme }) => theme.colors.font};
`;

const SelectTheme = styled.select`
  @media (min-width: 751px) {
    font-size: 0.7rem;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
  }
  padding: 7px;
  border: 2px solid ${({ theme }) => theme.colors.middleBorderGrey};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.buttonsBackgound};
  color: ${({ theme }) => theme.colors.font};
`;

const ThemeOption = styled.option`
  @media (min-width: 751px) {
    font-size: 0.7rem;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
  }
  background-color: ${({ theme }) => theme.colors.buttonsBackgound};
  color: ${({ theme }) => theme.colors.font};
`;

const SelectLabel = styled.span`
  font-size: 0.5rem;
  color: ${({ theme }) => theme.colors.font};
`;

const SelectContainer = styled.div`
  margin: 1% 3% 1% 3%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ClearButton = styled.button`
  margin: 1% 3% 1% 3%;
  @media (min-width: 751px) {
    font-size: 0.7rem;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
  }
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.buttonsBorder};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.buttonsBackgound};
  color: ${({ theme }) => theme.colors.font};
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.mainBackground};
  @media (orientation: portrait) {
    & {
      height: 90vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 88vh;
    }
  }
`;

export {
  SettingsLabel,
  SelectTheme,
  ThemeOption,
  SelectLabel,
  SelectContainer,
  ClearButton,
  PageWrapper
};

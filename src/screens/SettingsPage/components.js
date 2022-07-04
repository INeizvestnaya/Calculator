import styled from 'styled-components';

const SettingsLabel = styled.div`
  margin: 2% 3% 1% 3%;
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
`;

const ThemeOption = styled.option`
  @media (min-width: 751px) {
    font-size: 0.7rem;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
  }
`;

const SelectLabel = styled.span`
  font-size: 0.5rem;
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
  border: 2px solid ${({ theme }) => theme.colors.middleBorderGrey};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverGrey};
  }
`;

export {
  SettingsLabel,
  SelectTheme,
  ThemeOption,
  SelectLabel,
  SelectContainer,
  ClearButton
};

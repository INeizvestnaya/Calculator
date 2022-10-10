import styled from 'styled-components';

const Divider = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.dividers};
  ${(props) =>
    props.vertical &&
    `margin: 3% 0% 3% 0%;
    width: 3px;
    @media (orientation: portrait) {
      & {
        display: none;
      }
  }`}
  ${(props) =>
    !props.vertical &&
    `height: 3px;
  margin: 0% 4% 0% 4%;`}
  ${(props) =>
    props.mobile &&
    `@media (orientation: landscape) {
    & {
      display: none;
    }
  }`}
`;

export { Divider };

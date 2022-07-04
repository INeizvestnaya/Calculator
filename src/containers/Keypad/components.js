import styled from 'styled-components';

const KeypadFuncContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (orientation: portrait) {
    & {
      height: 40vh;
    }
  }
  @media (orientation: landscape) {
    & {
      height: 70vh;
    }
  }*
`;

export default KeypadFuncContainer;

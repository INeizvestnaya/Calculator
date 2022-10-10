import styled from 'styled-components';

const KeypadContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 80%;
`;

const ButtonsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export { KeypadContainer, ButtonsColumn };

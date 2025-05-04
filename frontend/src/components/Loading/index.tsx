import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 6px solid #ff9c00;
  border-top: 6px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 60px auto;
`;

export function Loading() {
  return <Loader />;
}

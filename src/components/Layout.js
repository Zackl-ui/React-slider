// Dependencies
import styled from "styled-components";

export const Row = styled.section`
  display: grid;
  grid-template-columns:
    [full-start] minmax(24px, 1fr) [main-start] minmax(0, 1200px)
    [main-end] minmax(24px, 1fr) [full-end];
`;

export const RowInner = styled.div`
  display: grid;
  grid-column: main;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2%;
  width: 100%;
`;

// WEBPACK FOOTER //
// ./src/components/Layout.js

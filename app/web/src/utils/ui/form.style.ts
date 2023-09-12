export const formStyle = css`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .title {
    font-size: 18px;
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;

    > span {
      font-size: 14px;
      margin-bottom: 2px;
    }
  }
  
  input,
  select {
    border: 3px solid black;
    padding: 3px;
    width: 300px;
    font-size: 15px;

    &:disabled {
      color: #999;
    }
  }

  button {
    color: white;
    padding: 5px;
  }
  button[type="submit"] {
    background: black;

    &:disabled {
      background: #999;
    }
  }
`;

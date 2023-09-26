export const editorStyle = css`
  --border-color: #ddd;

  &.editor {
    align-items: stretch;

    .editor-content {
      flex: 1;
      display: flex;
      align-items: stretch;
      position: relative;
    }

    .editor-active,
    .editor-hover {
      &::after {
        position: absolute;
        border: 2px solid #3c82f6;
        pointer-events: none;
        bottom: 0px;
        top: 0px;
        left: 0px;
        right: 0px;

        content: " ";
      }
    }

    .editor-hover {
      &::after {
        background: #dbe9fe66;
      }
    }
    .editor-active {
      &::after {
        background: none;
      }
    }

    .toolbar {
      height: 35px;
      font-size: 12px;
      align-items: stretch;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);

      > .toolbar-left {
      }

      > .toolbar-mid {
      }

      > .toolbar-right {
      }

      .toolbar-box {
        display: flex;
        align-items: stretch;
        border-radius: 2px;
        border: 1px solid #ccc;
        margin: 5px 0px 5px 5px;
        padding-left: 5px;

        .label {
          display: flex;
          user-select: none;
          align-items: center;
          font-size: 10px;
          margin-top: 1px;
          color: #999;
          text-transform: uppercase;
        }

        .items {
          display: flex;
          align-items: stretch;
          margin-left: 5px;
          color: #555;
          border-left: 1px solid transparent;

          .item {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
            border-right: 1px solid transparent;
            padding: 0px 5px;
            border-radius: 0px;

            &:hover {
              background: #ececeb;
            }

            &.disabled {
              color: #ccc;
              cursor: default;
            }
          }

          .item:last-child {
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }
        }

        &.no-label {
          padding-left: 0px;
          margin-left: 0px;
          .items {
            margin-left: 0px;
          }
        }

        &:hover {
          border: 1px solid black;

          .items {
            color: #111;
            border-left: 1px solid #ececeb;
            .item {
              border-right: 1px solid #ececeb;
            }
          }
        }
      }
    }

    .editor-box {
      flex: 1;
      flex-direction: row;
      align-items: stretch;
      background: #f1f5f9;

      .tree {
        min-width: 250px;
        border-right: 1px solid var(--border-color);
      }

      .page-editor {
        flex: 1;
      }

      .side {
        border-left: 1px solid var(--border-color);
        min-width: 220px;
      }
    }
  }
`;

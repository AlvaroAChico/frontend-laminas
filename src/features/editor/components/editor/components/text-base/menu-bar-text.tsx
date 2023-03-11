import React from "react";
import styled from "styled-components";
import { TextLeft } from "@styled-icons/bootstrap/TextLeft";
import { TextCenter } from "@styled-icons/bootstrap/TextCenter";
import { TextRight } from "@styled-icons/bootstrap/TextRight";
import { Justify } from "@styled-icons/bootstrap/Justify";

const ContainerOptions = styled.div`
  display: flex;
  flex-direction: row;
  jusfity-content: left;
  align-items: center;
  column-gap: 2px;
  position: absolute;
  bottom: -25px;
  position: relative;
`;

const ContainerItem = styled.div<{ active?: boolean; customPadding?: string }>`
  border: 0.5px solid #4949e6;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => (p.active ? "#0020ff9e" : "#6db2de61")};
  color: ${(p) => (p.active ? "white" : "black")};
  padding: ${(p) => (p.customPadding != "" ? p.customPadding : "4px")};

  > svg {
    width: 12px;
  }

  > input {
    width: 13px;
    height: 13px;
    padding: 0;
    border: 0;
  }
`;

const ContainerSelect = styled.select`
  border-radius: 4px;
  border: 0;
  font-size: 12px;
  outline: none;
  padding: 1px;
`;

interface IOwnProps {
  editor: any;
}
const MenuBarText: React.FC<IOwnProps> = ({ editor }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  return (
    <ContainerOptions>
      <ContainerItem
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        active={editor.isActive({ textAlign: "left" })}
      >
        <TextLeft />
      </ContainerItem>
      <ContainerItem
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        active={editor.isActive({ textAlign: "center" })}
      >
        <TextCenter />
      </ContainerItem>
      <ContainerItem
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        active={editor.isActive({ textAlign: "right" })}
      >
        <TextRight />
      </ContainerItem>
      <ContainerItem
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
        active={editor.isActive({ textAlign: "justify" })}
      >
        <Justify />
      </ContainerItem>
    </ContainerOptions>
  );
};

export default MenuBarText;

import React from "react";
import styled from "styled-components";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBarText from "./menu-bar-text";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { Move } from "@styled-icons/boxicons-regular/Move";

const OptionsWrapperMain = styled.div<{
  sizeLetter: number;
  fontFamily: string;
}>`
  > div div p {
    font-size: ${(p) => `${p.sizeLetter}px`};
    font-family: ${(p) => p.fontFamily};
  }
`;

const EditorContentContainer = styled(EditorContent)`
  outline: none;

  .ProseMirror-focused {
    outline: none;
    border: 1px solid red;
    border-radius: 5px;
  }

  > div p {
    margin: 6px 4px;
  }
`;

const ContainerText = styled.div`
  position: absolute;
  width: 100%;
  max-width: 200px;
  height: auto;
`;
const WrapperMove = styled.div`
  position: absolute;
  background: #aeaeae;
  width: 20px;
  height: 20px;
  top: 0;
  right: -20px;
  border-radius: 50%;
  padding: 2px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export interface TextBaseProps {
  id: number;
}

const TextBase: React.FC<TextBaseProps> = ({ id }) => {
  const [statusMenu, setStatusMenu] = React.useState(false);
  const [statusSettings, setStatusSettings] = React.useState(true);
  const [sizeLetter, setSizeLetter] = React.useState(10);
  const [fontFamily, setFontFamily] = React.useState("Arial");

  const handleShowStatusMenu = () => setStatusMenu(true);
  const handleHiddenStatusMenu = () => setStatusMenu(false);
  const handleStatusSettings = () => setStatusSettings(!statusSettings);
  const handleUpLetter = () => setSizeLetter(sizeLetter + 1);
  const handleDownLetter = () => setSizeLetter(sizeLetter - 1);
  const handleChangeFontFamily = (font: string) => setFontFamily(font);

  const textId = document.getElementById(`text${id}`);
  let mousePosition;
  let offset = [0, 0];
  let isDown = false;

  const handleMouseDown = (event: any) => {
    isDown = true;
    offset = [
      textId!.offsetLeft - event.clientX,
      textId!.offsetTop - event.clientY,
    ];
  };
  const handleMouseUp = () => {
    isDown = false;
  };
  const handleMouseMove = (event: any) => {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      textId!.style.left = mousePosition.x + offset[0] + "px";
      textId!.style.top = mousePosition.y + offset[1] + "px";
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content: "<p>Escribe aquí tu mensaje</p>",
  });

  return (
    <ContainerText
      id={`text${id}`}
      onMouseOver={handleShowStatusMenu}
      onMouseOut={handleHiddenStatusMenu}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {/* onMouseDown={} */}
      <OptionsWrapperMain
        sizeLetter={sizeLetter}
        fontFamily={fontFamily}
        onFocus={handleStatusSettings}
      >
        <EditorContentContainer editor={editor} />
      </OptionsWrapperMain>
      {statusMenu && (
        <WrapperMove onMouseOut={handleShowStatusMenu}>
          <Move />
        </WrapperMove>
      )}
      {statusMenu && (
        <MenuBarText
          containerId={`text${id}`}
          editor={editor}
          handleUpLetter={handleUpLetter}
          handleDownLetter={handleDownLetter}
          handleChangeFontFamily={handleChangeFontFamily}
          onMouseOut={handleShowStatusMenu}
        />
      )}
    </ContainerText>
  );
};

export default TextBase;

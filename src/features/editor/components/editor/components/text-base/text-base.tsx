import React from "react";
import styled from "styled-components";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBarText from "./menu-bar-text";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { Settings } from "@styled-icons/fluentui-system-filled/Settings";

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
const WrapperSettings = styled.div`
  position: absolute;
  left: -15px;
  bottom: 6px;
  background: #8831fd;
  width: 15px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  color: white;
  border-radius: 50%;
`;

export interface TextBaseProps {
  id: number;
  text: string;
}

const TextBase: React.FC<TextBaseProps> = ({ id, text }) => {
  const [statusMenu, setStatusMenu] = React.useState(false);
  const [statusSettings, setStatusSettings] = React.useState(true);
  const [sizeLetter, setSizeLetter] = React.useState(10);
  const [fontFamily, setFontFamily] = React.useState("Arial");

  const handleStatusMenu = () => setStatusMenu(!statusMenu);
  const handleStatusSettings = () => setStatusSettings(!statusSettings);
  const handleUpLetter = () => setSizeLetter(sizeLetter + 1);
  const handleDownLetter = () => setSizeLetter(sizeLetter - 1);
  const handleChangeFontFamily = (font: string) => setFontFamily(font);

  React.useEffect(() => {
    const textId = document.getElementById(`text${id}`);
    let mousePosition;
    let offset = [0, 0];
    let isDown = false;

    textId!.addEventListener(
      "mousedown",
      function (e) {
        isDown = true;
        offset = [
          textId!.offsetLeft - e.clientX,
          textId!.offsetTop - e.clientY,
        ];
      },
      true
    );

    textId!.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );

    textId!.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };
          textId!.style.left = mousePosition.x + offset[0] + "px";
          textId!.style.top = mousePosition.y + offset[1] + "px";
        }
      },
      true
    );
  });

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
    content: "<p>Hello World!</p>",
  });

  return (
    <ContainerText id={`text${id}`} onDoubleClick={handleStatusMenu}>
      {statusMenu && (
        <MenuBarText
          containerId={`text${id}`}
          editor={editor}
          handleUpLetter={handleUpLetter}
          handleDownLetter={handleDownLetter}
          handleChangeFontFamily={handleChangeFontFamily}
        />
      )}
      <OptionsWrapperMain
        sizeLetter={sizeLetter}
        fontFamily={fontFamily}
        onFocus={handleStatusSettings}
      >
        {/* <WrapperSettings> */}
        {/* {statusSettings && <Settings onClick={handleStatusMenu} />} */}
        {/* </WrapperSettings> */}
        <EditorContentContainer editor={editor} />
      </OptionsWrapperMain>
    </ContainerText>
  );
};

export default TextBase;

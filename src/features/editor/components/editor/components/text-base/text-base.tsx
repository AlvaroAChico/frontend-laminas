/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import Moveable from "react-moveable";
import { Frame } from "scenejs";
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

const ContainerMain = styled.div<{ active: boolean }>`
  .moveable-control-box {
    ${(p) =>
      !p.active ? "visibility: hidden !important" : "visibility: visible;"};
  }
`;

const ContainerImage = styled.div`
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
  }

  .moveable-line {
    display: none;
  }
`;
export interface TextBaseProps {
  id: number;
}

const TextBase: React.FC<TextBaseProps> = ({ id }) => {
  const [target, setTarget] = React.useState<any>();
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

  const [statusControls, setStatusControls] = React.useState(false);
  const frame = new Frame({
    width: "250px",
    height: "200px",
    left: "0px",
    top: "0px",
    transform: {
      rotate: "0deg",
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  });

  React.useEffect(() => {
    setTarget(document.querySelector(`.target${id}`)!);
  }, []);

  const setTransform = (target: any) => {
    target.style.cssText = frame.toCSS();
  };

  const handleMoveImage = () => {
    setStatusControls(!statusControls);
  };

  // Config text
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
  // Config text
  return (
    <>
      <ContainerMain
        id={`image_id${id}`}
        className="container"
        active={statusControls}
        onDoubleClick={handleMoveImage}
      >
        <ContainerText id={`text${id}`} className={`target${id}`}>
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
        <Moveable
          target={target}
          resizable={true}
          rotatable={true}
          draggable={true}
          pinchable={true}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onRotate={({ target, beforeDelta }) => {
            const deg =
              parseFloat(frame.get("transform", "rotate")) + beforeDelta;
            frame.set("transform", "rotate", `${deg}deg`);
            setTransform(target);
          }}
          onScale={({ target, delta }) => {
            const scaleX = frame.get("transform", "scaleX") * delta[0];
            const scaleY = frame.get("transform", "scaleY") * delta[1];
            frame.set("transform", "scaleX", scaleX);
            frame.set("transform", "scaleY", scaleY);
            setTransform(target);
          }}
          onDrag={({ target, top, left }) => {
            frame.set("left", `${left}px`);
            frame.set("top", `${top}px`);
            setTransform(target);
          }}
          onResize={({ target, width, height }) => {
            frame.set("width", `${width}px`);
            frame.set("height", `${height}px`);
            setTransform(target);
          }}
        />
      </ContainerMain>
    </>
  );
};

export default TextBase;

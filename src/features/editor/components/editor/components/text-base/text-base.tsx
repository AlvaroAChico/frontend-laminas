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
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  deleteText,
  getActiveText,
  getGeneralStatusControl,
  updateTextActive,
} from "../../../../../../core/store/editor/editorSlice";
import { Edit } from "@styled-icons/evaicons-solid/Edit";

const OptionsWrapperMain = styled.div<{
  sizeLetter: number;
  fontFamily: string;
  colorText: string;
  textAlign: string;
}>`
  display: inline-block;
  width: 100%;
  height: 100%;

  > div div p {
    font-size: ${(p) => `${p.sizeLetter}px`};
    font-family: ${(p) => p.fontFamily};
    color: ${(p) => p.colorText};
    text-align: ${(p) => p.textAlign};
  }

  > textarea {
    font-size: ${(p) => `${p.sizeLetter}px`};
    font-family: ${(p) => p.fontFamily};
    color: ${(p) => p.colorText};
    text-align: ${(p) => p.textAlign};
  }
  > p {
    margin: 0;
    font-size: ${(p) => `${p.sizeLetter}px`};
    font-family: ${(p) => p.fontFamily};
    color: ${(p) => p.colorText};
    text-align: ${(p) => p.textAlign};
    > * {
      font-family: ${(p) => p.fontFamily};
    }
    > div * {
      font-family: ${(p) => p.fontFamily};
    }
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
  position: relative;

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

const ContainerDelete = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  left: -25px;
  right: -25px;
  color: white;
  background: #de2b2b;
  cursor: pointer;
`;
const ContainerEdit = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  left: -25px;
  top: 25px;
  color: white;
  background: #de2b2b;
  cursor: pointer;
  color: white;

  > svg {
    width: 10px;
    color: white;
  }
`;
const ContainerTextarea = styled.p`
  width: inherit;
  height: inherit;
  overflow: hidden;
  border: 0;
  outline: none;
  background: transparent;
  resize: none;
`;
export interface TextBaseProps {
  id: number;
  typography: string;
  sizeLetter: number;
  inputColor: string;
  textAlign: string;
}

const TextBase: React.FC<TextBaseProps> = ({
  id,
  typography,
  sizeLetter,
  inputColor,
  textAlign,
}) => {
  const [target, setTarget] = React.useState<any>();
  const [statusControls, setStatusControls] = React.useState(false);
  const [topValue, setTopValue] = React.useState(0);
  const [leftValue, setLeftValue] = React.useState(0);
  const [scaleValueX, setScaleX] = React.useState(1);
  const [scaleValueY, setScaleY] = React.useState(1);
  const [rotateValue, setRotateValue] = React.useState(0);
  const textId = document.getElementById(`editor_main${id}`);
  const [widthValue, setWidthValue] = React.useState(textId?.clientWidth);
  const [heightValue, setHeightValue] = React.useState(50);
  const dispatch: any = useAppDispatch();
  const statusGeneralControl = useAppSelector(getGeneralStatusControl);
  const textActiveControls = useAppSelector(getActiveText);
  const handleDeleteText = () => dispatch(deleteText(id));

  const frame = new Frame({
    width: `${widthValue}px`,
    height: `${heightValue}px`,
    left: `${leftValue}px`,
    top: `${topValue}px`,
    transform: {
      rotate: `${rotateValue}deg`,
      scaleX: scaleValueX,
      scaleY: scaleValueY,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
  });

  React.useEffect(() => {
    setTarget(document.querySelector(`.target${id}`)!);
  }, []);

  const setTransform = (target: any) => {
    target.style.cssText = frame.toCSS();
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

  const handleChangeActive = () => {
    // dispatch(updateEditorTipTap(editor));
    dispatch(updateTextActive(id));
    setStatusControls(!statusControls);
  };

  const handleEditText = () => {
    document.getElementById(`textarea_base${id}`)?.focus();
  };
  const handlePasteText = (e: any) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");
    const textId = document.getElementById(`textarea_base${id}`);
    const originalText = textId!.innerHTML;
    textId!.innerHTML = originalText + text;
  };

  return (
    <>
      <ContainerMain
        id={`image_id${id}`}
        className="container"
        active={
          statusControls && statusGeneralControl && textActiveControls == id
        }
        onClick={handleChangeActive}
        onDoubleClick={handleEditText}
      >
        <div>
          <ContainerText id={`text${id}`} className={`target${id}`}>
            {statusControls &&
              statusGeneralControl &&
              textActiveControls == id && (
                <>
                  <ContainerDelete onClick={handleDeleteText}>
                    x
                  </ContainerDelete>
                  <ContainerEdit onClick={handleEditText}>
                    <Edit />
                  </ContainerEdit>
                </>
              )}
            <OptionsWrapperMain
              sizeLetter={sizeLetter}
              fontFamily={typography}
              colorText={inputColor}
              textAlign={textAlign}
            >
              {/* <EditorContentContainer id={`editor_main${id}`} editor={editor} /> */}
              <ContainerTextarea
                id={`textarea_base${id}`}
                contentEditable={true}
                onPaste={handlePasteText}
              >
                Doble click para editar
              </ContainerTextarea>
            </OptionsWrapperMain>
            {/* {statusControls &&
              statusGeneralControl &&
              textActiveControls == id && <MenuBarText editor={editor} />} */}
          </ContainerText>
        </div>
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
            // frame.set("transform", "rotate", `${deg}deg`);
            setRotateValue(deg);
            setTransform(target);
          }}
          onScale={({ target, delta }) => {
            const scaleX = frame.get("transform", "scaleX") * delta[0];
            const scaleY = frame.get("transform", "scaleY") * delta[1];
            // frame.set("transform", "scaleX", scaleX);
            // frame.set("transform", "scaleY", scaleY);
            setScaleX(scaleX);
            setScaleY(scaleY);
            setTransform(target);
          }}
          onDrag={({ target, top, left }) => {
            // frame.set("left", `${left}px`);
            // frame.set("top", `${top}px`);
            setLeftValue(left);
            setTopValue(top);
            setTransform(target);
          }}
          onResize={({ target, width, height }) => {
            frame.set("width", `${width}px`);
            frame.set("height", `${height}px`);
            setWidthValue(width);
            setHeightValue(height);
            setTransform(target);
          }}
        />
      </ContainerMain>
    </>
  );
};

export default TextBase;

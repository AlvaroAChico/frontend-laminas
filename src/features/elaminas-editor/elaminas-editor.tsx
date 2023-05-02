import React from "react";
// import { Canvas } from "fabric";
import { fabric } from "fabric";
import styled from "styled-components";
import { Canvas } from "fabric/fabric-impl";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

const WrapperPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #e5e5f7;
  background-image: linear-gradient(#ffffff 1px, transparent 1px),
    linear-gradient(to right, #ffffff 1px, #e9eaed 1px);
  background-size: 20px 20px;

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const EditorCanvas = styled.canvas`
  border: 1px solid red;
  // height: 100vh !important;
  // width: 100vw !important;
  // display: block;
`;
const ContainerOptions = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

const ElaminasEditor: React.FC = () => {
  const [fabricCanva, setFabricCanva] = React.useState<Canvas>();
  const [canvasWidth, setCanvasWidth] = React.useState(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight);
  const [layerPDFWidth, setLayerPDFWidth] = React.useState(400);
  const [layerPDFHeight, setLayerPDFHeight] = React.useState(
    window.innerHeight - 100
  );

  // const canvasEl = React.useRef<HTMLCanvasElement>(null);
  // const pdfLayer = new fabric.Rect({
  //   top: canvasHeight / 2 - layerPDFHeight / 2,
  //   left: canvasWidth / 2 - layerPDFWidth / 2,
  //   width: layerPDFWidth,
  //   height: layerPDFHeight,
  //   fill: "green",
  //   selectable: false,
  //   shadow: "#797979e6",
  // });
  // const resizeCanva = () => {
  //   setCanvasHeight(window.innerHeight);
  //   setCanvasWidth(window.innerWidth);
  //   setLayerPDFHeight(window.innerHeight - 100);
  //   console.log("innerWidth", window.innerWidth);
  //   console.log("innerHeight", window.innerHeight);
  //   fabricCanva!.renderAll();
  // };
  // React.useEffect(() => {
  //   console.log("1");
  //   if (fabricCanva != null) {
  //     console.log("2");
  //     fabricCanva!.renderAll();
  //     console.log("3");
  //   }
  // }, [canvasHeight, canvasWidth]);
  // React.useEffect(() => {
  //   const options = {
  //     width: canvasWidth,
  //     height: canvasHeight,
  //     pdfLayer,
  //   };
  //   if (canvasEl != null) {
  //     canvasEl.current!.getContext("2d");
  //   }
  //   const fabricCanva = new fabric.Canvas(canvasEl.current, options);

  //   fabricCanva.add(pdfLayer);
  //   setFabricCanva(fabricCanva);

  //   return () => {
  //     // updateCanvasContext(null);
  //     fabricCanva.dispose();
  //   };
  // }, []);

  // const handleAddSquare = () => {
  //   const rect = new fabric.Rect({
  //     top: 50,
  //     left: 50,
  //     width: 50,
  //     height: 50,
  //     fill: "red",
  //   });

  //   fabricCanva!.add(rect);
  // };

  const handlePrint = () => {
    // console.log("Print 1", pdfLayer.getCoords());
    console.log("1");
  };

  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    editor?.addRectangle();
  };

  return (
    <>
      <WrapperPage>
        <ContainerOptions>
          {/* <button onClick={handleAddSquare}>Rectangulo</button> */}
          <button onClick={handlePrint}>Imprimir</button>
          <button onClick={() => setLayerPDFHeight(layerPDFHeight - 50)}>
            Reducir Alto
          </button>
          <button onClick={onAddCircle}>Add circle</button>
          <button onClick={onAddRectangle}>Add Rectangle</button>
        </ContainerOptions>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        {/* <EditorCanvas ref={canvasEl} /> */}
      </WrapperPage>
    </>
  );
};

export default ElaminasEditor;

// const handleAddTriangle = () => {
//   const triangle = new fabric.Triangle({
//     width: 20,
//     height: 30,
//     fill: "blue",
//     left: 50,
//     top: 50,
//   });

//   // canvasEl.current.add(rect);
//   fabricCanva.add(triangle);
// };
// const handleAddCircle = () => {
//   const circle = new fabric.Circle({
//     radius: 20,
//     fill: "green",
//     left: 100,
//     top: 100,
//   });

//   // canvasEl.current.add(rect);
//   fabricCanva.add(circle);
// };

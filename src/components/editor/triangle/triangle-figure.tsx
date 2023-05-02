import React from "react";
import { RegularPolygon } from "react-konva";

const TriangleFigure: React.FC = () => {
  return (
    <React.Fragment>
      <RegularPolygon
        width={10}
        height={10}
        fill={"blue"}
        draggable={true}
        sides={3}
        radius={50}
      />
    </React.Fragment>
  );
};

export default TriangleFigure;

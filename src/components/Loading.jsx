import React from "react";
import { Dot, DotWrapper } from "../utils/styledComponents";

const Loading = () => {
  return (
    <DotWrapper>
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </DotWrapper>
  );
};

export default Loading;

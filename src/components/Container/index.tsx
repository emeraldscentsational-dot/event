import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[1360px] mx-auto px-3 md:px-4 overflow-hidden">
      {children}
    </div>
  );
};

export default Container;

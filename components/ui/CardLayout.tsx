import { Card, CardProps, ViewProps } from "tamagui";
import React, { ReactNode } from "react";

interface CardLayoutProps extends CardProps {
  children?: ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children, ...rest }) => {
  return (
    <Card className="p-4 bg-white" {...rest}>
      {children}
    </Card>
  );
};

export default CardLayout;

/* типизация пропсов */
import React, { FC, ReactNode } from "react";

export enum CardVariant {
  outlined = "outlined",
  primary = "primary",
}

interface CardProps1 {
  width: string;
  height?: string;
  variant: CardVariant;
  children?: ReactNode;
}

/* если использовать специальный тип  */
interface CardProps2 {
  width: string;
  height?: string;
  variant?: CardVariant;
  children?: ReactNode;
  onClick?: () => void; // callback который ничего не принимает, и не возвращает
}

const Card: FC<CardProps2> = ({
  onClick,
  width,
  height = "100px",
  variant,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        border: variant === CardVariant.outlined ? "1px solid orange" : "none",
        background: variant === CardVariant.primary ? "lightblue" : "",
      }}
    >
      {children}
    </div>
  );
};

export default Card;

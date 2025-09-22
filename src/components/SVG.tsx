import { FC } from "react";
import Icons from "../svg/icons.svg";

interface IconProps {
  name: string;
  size: number;
  style: {};
}

const Icon: FC<IconProps> = ({ name, size, style }) => (
  <svg className={`icon icon-${name}`} width={size} height={size} style={style}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

export default Icon;

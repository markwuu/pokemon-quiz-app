import { FC } from "react";
import Icons from "../svg/icons.svg";

interface IconProps {
  name: string;
  size: number;
}

const Icon: FC<IconProps> = ({ name, size }) => (
  <svg className={`icon icon-${name}`} width={size} height={size}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

export default Icon;

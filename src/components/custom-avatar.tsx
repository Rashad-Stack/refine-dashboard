import { getNameInitials } from "@/utilities";
import { Avatar as AntDAvatar } from "antd";
import { AvatarProps } from "antd/lib";

type Props = AvatarProps & {
  name?: string;
};

export default function CustomAvatar({ name, style, ...rest }: Props) {
  return (
    <AntDAvatar
      alt="Rashad Stack"
      size={"small"}
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}>
      {getNameInitials(name || "")}
    </AntDAvatar>
  );
}

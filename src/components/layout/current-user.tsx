import { Popover } from "antd";

export default function CurrentUser() {
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}>
        TEST
      </Popover>
    </>
  );
}

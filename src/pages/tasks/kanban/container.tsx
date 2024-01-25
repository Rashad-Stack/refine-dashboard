import { PropsWithChildren } from "react";

export default function KanbanBoardContainer({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        width: "calc(100% + 64px)",
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "column",
        margin: "-32px",
      }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "32px",
          overflowX: "scroll",
        }}>
        {children}
      </div>
    </div>
  );
}

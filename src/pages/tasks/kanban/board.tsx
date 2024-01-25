import { DndContext } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export default function KanbanBoard({ children }: PropsWithChildren) {
  return <DndContext>{children}</DndContext>;
}

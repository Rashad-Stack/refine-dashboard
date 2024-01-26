import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { useMemo } from "react";
import { KanbanAddCardButton } from "./kanban/add-card.button";
import KanbanBoard from "./kanban/board";
import { ProjectCardMemo } from "./kanban/card";
import KanbanColumn from "./kanban/column";
import KanbanBoardContainer from "./kanban/container";
import KanbanItem from "./kanban/item";

export default function TaskList() {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });

  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "desc",
      },
    ],
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });

  const taskStages = useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unsignedStages: [],
        stages: [],
      };
    }
    const unsignedStages = tasks.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));

    return {
      unsignedStages,
      columns: grouped,
    };
  }, [tasks, stages]);

  const handleAddCard = (args: { stageId: string }) => {};

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id="unsigned"
            title={"unsigned"}
            count={taskStages?.unsignedStages.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unsigned" })}>
            {taskStages.unsignedStages.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...tasks, stageId: "unsigned" }}>
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}

            {!taskStages.unsignedStages.length && (
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unsigned" })}
              />
            )}
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
}

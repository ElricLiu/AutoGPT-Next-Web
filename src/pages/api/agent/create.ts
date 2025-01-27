import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { RequestBody } from "../../../utils/interfaces";
import AgentService from "../../../services/agent-service";
import { serverError } from "../responses";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest) => {
  try {
    const {
      modelSettings,
      goal,
      tasks,
      lastTask,
      result,
      completedTasks,
      customLanguage,
      agentType,
    } = (await request.json()) as RequestBody;

    if (tasks === undefined || lastTask === undefined || result === undefined) {
      return;
    }

    let newTasks;
    if (agentType === "codyChat") {
      newTasks = await AgentService.codyChatAgent(
        modelSettings,
        goal,
        customLanguage
      );
    } else if (agentType === "deepSeekCoderV3") {
      newTasks = await AgentService.deepSeekCoderV3Agent(
        modelSettings,
        goal,
        customLanguage
      );
    } else {
      newTasks = await AgentService.createTasksAgent(
        modelSettings,
        goal,
        tasks,
        lastTask,
        result,
        completedTasks,
        customLanguage
      );
    }

    return NextResponse.json({ newTasks });
  } catch (e) {}

  return serverError();
};

export default handler;

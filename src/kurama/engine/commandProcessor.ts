import { matchIntent } from "./intentMatcher";
import { LocalKnowledgeProvider, type KnowledgeProvider } from "./knowledgeProvider";
import { TemplateResponseProvider, type ResponseProvider } from "./responseProvider";
import type { Intent, KuramaResponse } from "./types";

export class CommandProcessor {
  private knowledgeProvider: KnowledgeProvider;
  private responseProvider: ResponseProvider;

  constructor(
    knowledgeProvider: KnowledgeProvider = new LocalKnowledgeProvider(),
    responseProvider: ResponseProvider = new TemplateResponseProvider()
  ) {
    this.knowledgeProvider = knowledgeProvider;
    this.responseProvider = responseProvider;
  }

  // Async even though the local implementation is synchronous, so a future
  // remote/LLM-backed provider can be swapped in without changing callers.
  async processMessage(input: string, intentOverride?: Intent): Promise<KuramaResponse> {
    const intent = intentOverride ?? matchIntent(input);
    const knowledge = this.knowledgeProvider.getKnowledgeBase();
    return this.responseProvider.generate(intent, knowledge, input);
  }
}

export const commandProcessor = new CommandProcessor();

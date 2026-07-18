import { getKnowledgeBase, type KnowledgeBase } from "../knowledge";

export interface KnowledgeProvider {
  getKnowledgeBase(): KnowledgeBase;
}

/**
 * v1 knowledge source: the bundled /knowledge JSON files. A future
 * RemoteKnowledgeProvider (backed by an LLM or API) can implement the same
 * interface without any caller needing to change.
 */
export class LocalKnowledgeProvider implements KnowledgeProvider {
  private cache: KnowledgeBase | null = null;

  getKnowledgeBase(): KnowledgeBase {
    if (!this.cache) {
      this.cache = getKnowledgeBase();
    }
    return this.cache;
  }
}

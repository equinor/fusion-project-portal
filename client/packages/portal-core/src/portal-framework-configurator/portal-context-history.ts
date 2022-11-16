import { ContextItem } from '@equinor/fusion-framework-module-context';
import { moveItemToTopByIndex, storage } from '@equinor/portal-utils';

const CONTEXT_HISTORY_SOCAGE_KEY = 'contextHistory';
const CONTEXT_HISTORY_LENGTH_KEY = 'contextHistoryLength';

let CONTEXT_HISTORY_LENGTH = 5;

type ContextHistoryItem = ContextItem<Record<string, unknown>>;

export function setContextHistory(context: ContextHistoryItem) {
  const storedContextHistory =
    storage.getItem<ContextHistoryItem[]>(CONTEXT_HISTORY_SOCAGE_KEY) || [];

  if (typeof storedContextHistory == 'string') return;

  const currentContextIndex: number = storedContextHistory.findIndex(
    (storedContext) => storedContext.id === context.id
  );

  if (currentContextIndex !== -1) {
    storage.setItem(
      CONTEXT_HISTORY_SOCAGE_KEY,
      moveItemToTopByIndex(storedContextHistory, currentContextIndex)
    );
  } else {
    const contextHistory = [];
    contextHistory.unshift(context, ...storedContextHistory);
    storage.setItem(
      CONTEXT_HISTORY_SOCAGE_KEY,
      contextHistory.slice(0, getContextHistoryLength())
    );
  }
}

export function getContextHistory(): ContextHistoryItem[] {
  const storedContextHistory =
    storage.getItem<ContextHistoryItem[]>(CONTEXT_HISTORY_SOCAGE_KEY) || [];
  if (typeof storedContextHistory == 'string') return [];

  return storedContextHistory;
}

export function setUserDefinedContextHistoryLength(contextLength?: number) {
  const contextHistoryLength = getContextHistoryLength();

  if (contextLength && contextHistoryLength !== contextLength) {
    storage.setItem(CONTEXT_HISTORY_LENGTH_KEY, contextLength);
    return;
  }
  if (contextHistoryLength) {
    return;
  }
  storage.setItem(CONTEXT_HISTORY_LENGTH_KEY, CONTEXT_HISTORY_LENGTH);
}

export function getContextHistoryLength(): number {
  const contextHistoryLength =
    storage.getItem<string>(CONTEXT_HISTORY_LENGTH_KEY) ||
    CONTEXT_HISTORY_LENGTH;

  return Number(contextHistoryLength);
}

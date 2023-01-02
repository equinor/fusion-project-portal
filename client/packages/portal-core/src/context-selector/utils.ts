export function getContextPageUrl(contextId?: string): string {
  if (!contextId) return "context-page/"

  const params = new URLSearchParams()
  params.append("contextId", contextId)

  return `/context-page/?${params.toString()}`
} 
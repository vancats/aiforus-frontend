export interface PromptData {
  messages: Array<{ role: string; content: string }>
  userPrompt: string
  selectValueArr: string[]
  allowConversation: boolean
}

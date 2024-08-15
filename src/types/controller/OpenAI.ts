export interface IToolCalls{
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string;
  }
}
export interface IMessage {
  role: string;
  content: null;
  tool_calls: IToolCalls[];
}

export interface IChoices {
  index: number;
  message: IMessage;
  logprobs: null;
  finish_reason: string;
}

export interface IResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: IChoices[];
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number; },
  system_fingerprint: string;
}
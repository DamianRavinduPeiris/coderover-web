export interface ReviewResponse {
  message: string;
  data: {
    id: string;
    provider: string;
    model: string;
    object: string;
    created: number;
    choices: Array<{
      logprobs: any;
      finish_reason: string;
      native_finish_reason: string;
      index: number;
      message: {
        role: string;
        content: string;
      };
    }>;
  };
  statusCode: number;
}

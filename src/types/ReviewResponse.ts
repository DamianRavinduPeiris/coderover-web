export interface ReviewResponse {
  message: string;
  data: {
    id: string;
    model: string;
    object: string;
    output: Array<{
      id: string;
      type: string;
      content: null | Array<{
        type: string;
        text: string;
      }>;
    }>;
  };
  statusCode: number;
}

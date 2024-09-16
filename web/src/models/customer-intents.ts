export type CustomerIntent = {
  category: string;
  original_reason: string;
  sentiment: "Positive" | "Negative" | "Neutral";
};

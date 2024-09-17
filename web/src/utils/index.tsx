export const sentimentToEmoji = (sentiment: string) => {
  switch (sentiment) {
    case "Positive":
      return "😊";
    case "Neutral":
      return "😐";
    case "Negative":
      return "😞";
    default:
      return "❓";
  }
};

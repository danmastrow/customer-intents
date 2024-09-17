import { CustomerIntent } from "../state/state";

export type ReviewModalProps = {
  intent: CustomerIntent;
};

const ReviewCard = ({ intent }: ReviewModalProps) => {
  return <div>{intent.original_reason}</div>;
};

export default ReviewCard;

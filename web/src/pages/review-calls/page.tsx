import { useAtom } from "jotai";
import ReviewCard from "../../components/review-card";
import {
  unreviewedIntentsAtom,
  selectedIndexAtom,
  remainingUnreviewedIntentsAtom,
} from "../../state/state";

const ReviewCalls = () => {
  const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom);
  const [unreviewedIntents] = useAtom(unreviewedIntentsAtom);

  const selectedIntent = unreviewedIntents[selectedIndex];

  return (
    <div className="p-4 md:ml-48">
      <div className="p-4 rounded-lg">
        <h1 className="text-3xl">Review calls</h1>
        <h2 className="text-sm sm:text-md text-gray-500 mb-4">
          We've attempted to categorize and gauge the sentiment of callers,
          please help us improve our system by confirming them here.
        </h2>

        <div className="flex w-full">
          {selectedIntent && (
            <ReviewCard
              intent={selectedIntent}
              skip={() => setSelectedIndex((x) => x + 1)} // Update the selected index when skipping
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCalls;

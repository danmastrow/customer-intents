import { useAtom } from "jotai";
import { unreviewedIntentsAtom } from "../../state/state";

const ReviewCalls = () => {
  const [unreviewedIntents] = useAtom(unreviewedIntentsAtom);
  return (
    <>
      <div className="p-4 md:ml-48">
        <div className="p-4 rounded-lg">
          <h1 className="text-3xl">Review calls</h1>
          <h2 className="text-sm sm:text-md text-gray-500 mb-4">
            We've attempted to categorize and gauge the sentiment of callers,
            please help us improve our system by confirming them here.
          </h2>
          <h3>{unreviewedIntents.length} left to review</h3>
          {/* <IntentsTable intents={customerIntents} /> */}
        </div>
      </div>
    </>
  );
};
export default ReviewCalls;

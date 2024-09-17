import { CustomerIntent } from "../state/state";
import { Button, Card, Dropdown, TextInput } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { sentimentToEmoji } from "../utils";
import { useState } from "react";

export type ReviewModalProps = {
  intent: CustomerIntent;
  skip: () => void;
};

const ReviewCard = ({ intent, skip }: ReviewModalProps) => {
  const { original_reason, category, sentiment } = intent;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <Card className="mx-auto relative sm:w-96 w-80">
        <div>
          <Button
            className="absolute w-fit bottom-1/2 -right-16"
            color="light"
            pill
            onClick={() => {
              skip();
              setIsEditing(false);
            }}
          >
            Skip
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="flex justify-end px-4 pt-4">
            <Button
              color="gray"
              onClick={() => {
                setIsEditing((prev) => !prev);
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
          <div className="flex flex-col items-center py-4">
            <div className=" px-4 py-2 rounded flex flex-col justify-center items-center">
              {isEditing ? (
                <TextInput
                  id="category"
                  type="text"
                  defaultValue={category}
                  required
                  className="py-2"
                />
              ) : (
                <span className="text-base font-bold">{category}</span>
              )}
              {isEditing ? (
                <Dropdown
                  label={`${sentimentToEmoji(sentiment)} Sentiment`}
                  dismissOnClick={false}
                  defaultValue={sentiment}
                  inline
                  className="py-2"
                >
                  <Dropdown.Item value="Positive">
                    {sentimentToEmoji("Positive")} Positive
                  </Dropdown.Item>
                  <Dropdown.Item value="Neutral">
                    {sentimentToEmoji("Neutral")} Neutral
                  </Dropdown.Item>
                  <Dropdown.Item value="Negative">
                    {sentimentToEmoji("Negative")} Negative
                  </Dropdown.Item>
                </Dropdown>
              ) : (
                <span className="text-xl">{sentimentToEmoji(sentiment)}</span>
              )}
            </div>

            <h5 className="py-4 text-base text-center font-medium text-gray-900">
              "{original_reason}"
            </h5>
          </div>
          <Button
            className="mt-auto mb-4 w-full"
            color="blue"
            onClick={() => {
              skip();
              setIsEditing(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ReviewCard;

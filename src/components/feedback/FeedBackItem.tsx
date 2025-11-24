import { TriangleUpIcon } from '@radix-ui/react-icons';
import { TFeedbackItem } from '../../lib/types';
import { useState } from 'react';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

type FeedBackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedBackItem({ feedbackItem }: FeedBackItemProps) {
  const [open, setOpen] = useState(false);
  const upvoteItem = useFeedbackItemsStore((state) => state.upvoteItem);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    upvoteItem(feedbackItem.id);
    e.currentTarget.disabled = true;
  };

  return (
    <li
      onClick={handleClick}
      className={`feedback ${open ? 'feedback--expand' : ''}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      {/* <p>{feedbackItem.daysAgo}d</p> */}
      <p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}

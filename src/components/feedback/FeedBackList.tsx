import { useMemo } from 'react';
import FeedBackItem from './FeedBackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

export default function FeedBackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const feedBackItems = useFeedbackItemsStore((state) => state.feedBackItems);
  const selectedCompany = useFeedbackItemsStore(
    (state) => state.selectedCompany
  );
  const sortBy = useFeedbackItemsStore((state) => state.sortBy);

  const filteredFeedBackItems = useMemo(() => {
    const items = selectedCompany
      ? feedBackItems.filter((item) => item.company === selectedCompany)
      : feedBackItems;

    return items.sort((a, b) => {
      if (sortBy === 'upvotes') {
        return b.upvoteCount - a.upvoteCount;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [feedBackItems, selectedCompany, sortBy]);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {filteredFeedBackItems.map((feedBackItem) => (
        <FeedBackItem key={feedBackItem.id} feedbackItem={feedBackItem} />
      ))}
    </ol>
  );
}

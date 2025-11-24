import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

export default function SortControl() {
  const sortBy = useFeedbackItemsStore((state) => state.sortBy);
  const setSortBy = useFeedbackItemsStore((state) => state.setSortBy);

  return (
    <div className="sorting">
      <small>Sort by:</small>
      <button
        onClick={() => setSortBy('upvotes')}
        className={`sorting__button ${
          sortBy === 'upvotes' ? 'sorting__button--active' : ''
        }`}
      >
        Most Upvoted
      </button>
      <button
        onClick={() => setSortBy('daysAgo')}
        className={`sorting__button ${
          sortBy === 'daysAgo' ? 'sorting__button--active' : ''
        }`}
      >
        Newest
      </button>
    </div>
  );
}

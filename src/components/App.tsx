import { useEffect } from 'react';
import Container from './layout/Container';
import Footer from './layout/Footer';
import HashTagList from './hashtag/HashTagList';
import { useFeedbackItemsStore } from '../stores/feedbackItemsStore';

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashTagList />
    </div>
  );
}

export default App;

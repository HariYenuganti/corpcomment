import FeedBackList from '../feedback/FeedBackList';
import Header from './Header';
import SortControl from '../feedback/SortControl';

export default function Container() {
  return (
    <div className="container">
      <Header />
      <SortControl />
      <FeedBackList />
    </div>
  );
}

import FeedBackList from '../feedback/FeedBackList';
import Header from './Header';

export default function Container() {
  return (
    <div className="container">
      <Header />
      <FeedBackList />
    </div>
  );
}

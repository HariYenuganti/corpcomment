import { useMemo } from 'react';
import HashTagItem from './HashTagItem';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

export default function HashTagList() {
  const feedBackItems = useFeedbackItemsStore((state) => state.feedBackItems);
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  const companyList = useMemo(
    () =>
      feedBackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedBackItems]
  );

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}

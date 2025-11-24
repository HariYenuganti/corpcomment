import { create } from 'zustand';
import { TFeedbackItem } from '../lib/types';

type FeedbackStore = {
  feedBackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<FeedbackStore>((set, get) => ({
  feedBackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',

  getCompanyList: () => {
    return get()
      .feedBackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedBackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedBackItems;
  },

  addItemToList: async (text: string) => {
    const companyName =
      text
        .split(' ')
        .find((word) => word.includes('#'))
        ?.substring(1) || '';

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      text: text,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      daysAgo: 0,
    };

    // Optimistic update
    set((state) => ({
      feedBackItems: [...state.feedBackItems, newItem],
    }));

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      }
    );
  },

  selectCompany: (company: string) => {
    set({ selectedCompany: company });
  },

  fetchFeedbackItems: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set({ feedBackItems: data.feedbacks, isLoading: false });
    } catch {
      set({ errorMessage: 'Something went wrong', isLoading: false });
    }
  },
}));

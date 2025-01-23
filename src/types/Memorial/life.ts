export interface LifeDataType {
    description: {
      quote: string;
      listItems: string[];
      paragraph: string;
    };
    lifeItems: {
      title: string;
      date: string;
      author: string;
      content: string;
    }[];
  }
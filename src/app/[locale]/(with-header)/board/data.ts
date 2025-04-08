interface BoardItem {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  likes: number;
}

export const dummyData: BoardItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Test Title ${i + 1}`,
  author: `User ${i + 1}`,
  date: `2024-01-${(i % 31) + 1}`,
  views: Math.floor(Math.random() * 200) + 50,
  comments: Math.floor(Math.random() * 20),
  likes: Math.floor(Math.random() * 10),
}));

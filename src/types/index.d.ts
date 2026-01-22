interface CourseCardData {
  id: string;
  title: string;
  price: number;
  thumbnail: string | null;
  createdAt: Date;
  category: string;

  instructor: {
    id: string;
    user: {
      name: string | null;
      image: string | null;
    };
  };

  _count: {
    enrollments: number;
  };
}

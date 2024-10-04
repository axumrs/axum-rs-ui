type Subject = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  is_del: boolean;
  cover: string;
  status: SubjectStatus;
  price: string;
  pin: number;
};

type SubjectStatus = "Writing" | "Finished";

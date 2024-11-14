type Topic = {
  id: string;
  title: string;
  subject_id: string;
  slug: string;
  summary: string;
  author: string;
  src: string;
  hit: number;
  dateline: string;
  try_readable: boolean;
  is_del: boolean;
  cover: string;
  md: string;
  pin: number;
};
type TopicWithSubjectAndTags = Topic & {
  name: string;
  subject_slug: string;
  subject_summary: string;
  subject_is_del: boolean;
  subject_cover: string;
  status: SubjectStatus;
  price: string;
  subject_pin: number;
  tags: Tag[];
};

type TopicSection = {
  id: string;
  topic_id: string;
  sort: number;
  hash: string;
  content: string;
};

type TopicWithSubjectAndTagsAndSections = TopicWithSubjectAndTags & {
  sections: TopicSection[];
};

type TopicProtectdMeta = {
  ids: string[];
  catpcha: CaptchaKind;
};

type TopicWithSubjectAndTagsAndProtectedSections =
  TopicWithSubjectAndTagsAndSections & {
    protected: TopicProtectdMeta;
    need_buy: boolean;
  };

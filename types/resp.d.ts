type ApiResp<T> = {
  code: number;
  msg: string;
  data: T | null;
};

type SubjectDetailResp = {
  subject: Subject;
  topic_list: TopicWithSubjectAndTags[];
};

type IDResp = {
  id: string;
};

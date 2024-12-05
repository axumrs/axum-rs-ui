type Announcement = {
  content: string;
  hit: number;
} & AnnouncementLite;

type AnnouncementLite = {
  id: string;
  title: string;

  dateline: string;
};

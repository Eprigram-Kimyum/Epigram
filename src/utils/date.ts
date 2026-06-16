import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatCommentDate = (dateString: string): string => {
  const now = dayjs();
  const commentDate = dayjs(dateString);

  if (now.diff(commentDate, 'hour') < 24) {
    return commentDate.fromNow();
  }

  return commentDate.format('YYYY. MM. DD');
};

import { useMemo, useState } from 'react';
import { getReplyCommentsSnapshot } from '../firebase/api/replyComments';
import { ReplyConmentModel } from '../models/ReplyComment';

export const useReplyCommentsSnapshot = (noteId: string) => {
  const [replyComments, setReplyComments] = useState<ReplyConmentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    try {
      getReplyCommentsSnapshot(noteId, setReplyComments);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  return { replyComments, loading, error };
};

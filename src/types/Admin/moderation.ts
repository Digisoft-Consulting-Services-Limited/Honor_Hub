export type ModerationStatus = 'pending' | 'approved' | 'hidden' | 'rejected';

export interface ModerationItem {
  id: number;
  memorialId: number;
  author: string;
  content: string;
  status: ModerationStatus;
}

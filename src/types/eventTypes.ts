export type Event = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  start_date: Date;
  end_date: Date;
  capacity: number;
  is_online: boolean;
  location: string;
};

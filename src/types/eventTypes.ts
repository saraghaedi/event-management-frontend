export type Event = {
  id: number | null;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  start_date: Date | null;
  end_date: Date | null;
  capacity: number | null;
  is_online: boolean | null;
  location: string | null;
  price: number | null;
  spaceId: number | null;
};

export type EventUser = {
  name: string;
  email: string;
};

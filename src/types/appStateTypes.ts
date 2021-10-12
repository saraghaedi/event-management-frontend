export type AppState = {
  loading: Boolean;
  message: Message | null;
};

export type Message = {
  variant: string;
  dismissable: boolean;
  text: string;
};

import { AlertColor } from "@mui/material";

export type AppState = {
  loading: Boolean;
  message: Message | null;
};

export type Message = {
  variant: AlertColor;
  dismissable: boolean;
  text: string;
};

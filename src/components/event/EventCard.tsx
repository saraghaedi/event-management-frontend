import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export default function EventCard(props: any) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} style={{ margin: "1em" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            props.imageUrl
              ? props.imageUrl
              : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAKlBMVEXg4OD////j4+Pb29v7+/vi4uLx8fHs7Oz39/f09PTa2tru7u7m5ubX19cF3ejnAAABRElEQVR4nO3Z27JDMBiAURFVVN//dXfp+ZC6Y0//tS4zphPflARVBQAAAAAAAAAAAAAAAAAAAAAAAADAj6i/23p6G+jSkn7rKa6tXUyS0mHrSa4rp9QuHNKlJq8yl//i1GS/cEgbtsm4Kx0StEme7ipd4ZCgTQ7zrbT7fOoxm+TL+vL58ondZLwPd/2tQ+wm99HTRu4WJWaTapyTtNdTz/Pe9holaJNcnxrsh+vYZbt/iRK0SVUdj8fnf8k9StgmDyMPD4VzlNBN5qU4Pz0nT1EiN2mmdSe/vDroQzdppsX4NUlKOXCT5ry9f3t3ErhJU3qfFLdJMUncJuUkYZvkchJNNJlo8u58P6l3JXXoPVtRxCZ9PX5Tx/u+4zvgu2H5e3E7LP/MbxmWLowhXBIAAAAAAAAAAAAAAAAAAAAAAAAAgF/1BxZSCIBLTls7AAAAAElFTkSuQmCC`
          }
          alt={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/events/${props.id}`} style={{ textDecoration: "none" }}>
          <Button size="small" color="primary">
            More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

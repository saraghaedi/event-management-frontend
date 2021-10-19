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
        <Link to={`/events/${props.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="140"
            image={
              props.imageUrl
                ? props.imageUrl
                : "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg"
            }
            alt={props.title}
          />
        </Link>
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

import { useState } from 'react'
import './movieCard.css'
import { Card, Spinner } from 'react-bootstrap';

function MovieCard({ Poster_Link, IMDB_Rating, Released_Year, Runtime, Series_Title }) {
  const [isImageLoaded, setIsImageLoaded] = useState(true)
  const handleImageLoad = () => {
    setIsImageLoaded(false)
  }
  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={Poster_Link}
        alt={Series_Title}
        className="movie-card-img"
        onLoad={handleImageLoad}
      />
      <Card.Body>
        <Card.Title>{Series_Title}</Card.Title>
        <Card.Text>Released: {Released_Year}</Card.Text>
        <Card.Text>Rating: {IMDB_Rating}</Card.Text>
        <Card.Text>Runtime: {Runtime}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
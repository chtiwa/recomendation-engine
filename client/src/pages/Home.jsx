import React, { useState, useEffect } from 'react'
import './home.css'
import MovieCard from '../components/movieCard/MovieCard'
import { Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../features/moviesSlice'
import PaginationComponent from '../components/pagination/Pagination'

const Home = () => {
  const dispatch = useDispatch()
  const { movies, moviesLoading, moviesError } = useSelector(state => state.movies)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    dispatch(getMovies(page))
  }, [dispatch, page])

  return (
    <Container className="mt-4">
      <Row>
        {!moviesLoading && !moviesError && movies.length > 0 && movies.map((movie) => {
          return (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4 card-container">
              <MovieCard {...movie} />
            </Col>
          )
        })}
      </Row>
      <Container fluid className="justify-content-center">
        {!moviesLoading && !moviesError && movies.length > 0 && (
          <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </Container>
    </Container>
  )
}

export default Home
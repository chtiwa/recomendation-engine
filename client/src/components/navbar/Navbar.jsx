import React, { useState } from 'react'
import './navbar.css'
import { Container, Navbar, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getMovieRecommendationV_1, getMovies } from '../../features/moviesSlice'

const NavbarComponent = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState(false)

  const handleChange = ({ target }) => {
    setSearch(target.value)
    const timeout = setTimeout(() => {
    }, 500)
    return () => clearTimeout(timeout)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length < 1) {
      dispatch(getMovies(1))
      return
    }
    dispatch(getMovieRecommendationV_1(search))
  }

  return (
    <Navbar bg="primary" className="p-6">
      <Container>
        <Navbar.Brand>
          <img
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Form className="d-flex navbar-form" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder=" e.g : Inception"
            className={`mx-1 navbar-input ${expanded ? 'expanded' : ''}`}
            aria-label="Search"
            value={search || ''}
            onChange={handleChange}
            onClick={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
          />
          <Button variant="light" type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
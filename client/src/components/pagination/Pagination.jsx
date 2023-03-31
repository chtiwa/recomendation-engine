import React, { useEffect, useMemo, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const PaginationComponent = ({ setPage }) => {
  const { totalPages, page } = useSelector(state => state.movies)
  const [rightPages, setRightPages] = useState([])
  const [leftPages, setLeftPages] = useState([])
  const range = 2
  const numbers = []
  const dots = '...'

  for (let i = 1; i < totalPages; i++) {
    numbers.push(i)
  }

  useMemo(() => {
    if (page < 3) {
      setLeftPages(numbers.slice(0, page + range))
      setRightPages(numbers.slice(totalPages - range - 1, totalPages))
    } else if (page > 48) {
      setLeftPages(numbers.slice(page - range - 6, page - range - 3))
      setRightPages(numbers.slice(totalPages - range - 2, totalPages))
      console.log(totalPages)
    } else {
      setLeftPages(numbers.slice(page - 1, page))
      setRightPages(numbers.slice(page + range, page + range + 2))
    }
  }, [page, totalPages, setRightPages, setLeftPages])

  const scrollToTop = () => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // })
  }

  const handleClick = (number) => {
    setPage(number)
    scrollToTop()
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First onClick={() => {
          setPage(1)
          scrollToTop()
        }} disabled={page === 1} />
        <Pagination.Prev onClick={() => {
          setPage(page - 1)
          scrollToTop()
        }} disabled={page === 1} />
        {leftPages.map((pageNumber) => {
          return (
            <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => handleClick(pageNumber)}>
              {pageNumber}
            </Pagination.Item>
          )
        })}
        <Pagination.Item key={"dot"} >
          {dots}
        </Pagination.Item>
        {rightPages.map((pageNumber) => {
          return (
            <Pagination.Item key={pageNumber} active={Number(pageNumber) === page} onClick={() => handleClick(pageNumber)}>
              {pageNumber}
            </Pagination.Item>
          )
        })}
        <Pagination.Next onClick={() => {
          setPage(page + 1)
          scrollToTop()
        }} disabled={page === totalPages - 1} />
        <Pagination.Last onClick={() => {
          setPage(totalPages - 1)
          scrollToTop()
        }} disabled={page === totalPages - 1} />
      </Pagination>
    </div>
  )
}

export default PaginationComponent
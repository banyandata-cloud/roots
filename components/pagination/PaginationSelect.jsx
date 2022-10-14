import React, { useEffect, useState } from 'react';
import { classes } from '../../utils/utils';
import Button from '../buttons/Button';
import styles from './Pagination.module.css';

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};

function PaginationSelect() {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => { return response.json(); })
      .then((json) => { return setData(json); });
  }, []);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  console.log(setitemsPerPage, setpageNumberLimit);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <span
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? styles.active : styles.number}
        >
          {number}
        </span>
      );
    }
      return null;
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <span onClick={handleNextbtn}> &hellip; </span>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <span onClick={handlePrevbtn}> &hellip; </span>;
  }

  return (
    <div className={styles.pageSelect}>Pagination Select<br />
    {renderData(currentItems)}

    <div className={styles.pageNumbers}>
      <Button
        title='Prev'
        onClick={handlePrevbtn}
        className={classes(
          styles.button,
          currentPage === pages[0] ? styles.disable
        : null
        )}
      />
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
      <Button
        title='Next'
        onClick={handleNextbtn}
        className={classes(
          currentPage === pages[pages.length - 1] ? styles.disable
          : null
        )}
      />
    </div>
    </div>
  );
}

export default PaginationSelect;

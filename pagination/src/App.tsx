import React, { useState, useEffect } from 'react';
import Pagination from './components/pagination';
import axios from 'axios'


interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: string;
  __v: number;

}

interface Response {
  totalPassengers: number;
  totalPages: number;
  data: Array<Passenger>;
}

function App() {

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<Array<Passenger>>([])

  const handlePageChange = (currentPage: number): void => {
    setPage(currentPage)
  }
  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const { data: { totalPages, data } } = await axios.get<Response>('https://api.instantwebtools.net/v1/passenger', { params })
      setTotalPages(totalPages);
      setItems(data);

    }

    fetch();
  }, [page])



  return (
    <>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>))}
      </ul>
      <Pagination count={totalPages} page={page} onPageChange={handlePageChange} />;

    </>
  );
}

export default App;

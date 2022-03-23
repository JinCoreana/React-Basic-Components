import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'


interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;

}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}
function App() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)
  const currentPageRef = useRef<number>(0)
  const handleScroll = () => {
    if (listRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = listRef.current;

      const offset = 30;

      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }

  }

  useEffect(() => {
    getPassengers(true);
  }, [])


  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;
      ;
    }
    !isLast && getPassengers()
  }, [isLast, isScrollBottom])



  const getPassengers = async (init?: boolean) => {
    const params = { page: currentPageRef.current, size: 30 };
    try {
      const res = await axios.get('https://api.instantwebtools.net/v1/passenger', { params })
      const passengers = res.data.data;
      setIsLast(res.data.totalPages === currentPageRef.current);
      init ? setPassengers(passengers) : setPassengers(prev => [...prev, ...passengers])
    }
    catch (e) {
      console.error(e);
    }


  }

  return (
    <>
      <div>
        <ul ref={listRef} className='list' onScroll={handleScroll}>
          {passengers.map(passenger => (<li className="item" key={passenger._id}>{passenger.name}</li>))}
        </ul>
      </div>

    </>
  );
}

export default App;



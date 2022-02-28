import React, { useEffect, useState } from "react";

const useFetchStrapi = (url, setFilterWork) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAbout = async () => {
      const getAbout = await fetch(url);
      const { data: fetchData } = await getAbout.json();
      if (setFilterWork) {
        setFilterWork(fetchData);
      }
      setData(fetchData);
    };
    fetchAbout();
  }, [url]);

  return { data };
};

export default useFetchStrapi;

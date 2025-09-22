import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/` + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div className="w-1/2 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3 className="text-lg font-semibold mb-4">Detail of User</h3>
        <div className="mb-2">
          <strong>Name: {data.name}</strong>
        </div>
        <div className="mb-2">
          <strong>Email: {data.email}</strong>
        </div>
        <div className="mb-3">
          <strong>Phone: {data.phone}</strong>
        </div>
        <Link to={`/update/${id}`} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Edit</Link>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ml-3">Back</Link>
      </div>
    </div>

  )
}

export default Read

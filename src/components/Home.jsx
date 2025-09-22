import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate(); // to redirect after success

  useEffect(() => {
    axios.get(`http://localhost:3000/users`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("would you likew to delete ?")
    if (confirm) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(res =>{
          location.reload();
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">List of Users</h1>

      <div className="w-3/4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end mb-4">
          <Link
            to="/Create"
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition duration-200"
          >
            Add +
          </Link>
        </div>
        <table className="min-w-full border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-300 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((ele, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{ele.id}</td>
                <td className="py-3 px-4">{ele.name}</td>
                <td className="py-3 px-4">{ele.email}</td>
                <td className="py-3 px-4">{ele.phone}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link to={`/read/${ele.id}`} className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded">
                    Read
                  </Link>
                  <Link to={`/update/${ele.id}`} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded">
                    Edit
                  </Link>
                  <button onClick={e => handleDelete(ele.id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

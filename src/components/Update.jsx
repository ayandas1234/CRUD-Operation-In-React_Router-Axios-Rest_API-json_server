import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [values, setvalues] = useState({ name: '', email: '', phone: '' })
  // const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate(); // to redirect after success
  

  useEffect(() => {
    axios.get(`http://localhost:3000/users/` + id)
      .then(res => {
        setvalues(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, values)
      .then(res => {
        console.log(res);
        navigate('/'); // Redirect to homepage or user list
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div className="w-1/2 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-2xl font-semibold mb-4">Update User</h1>

        <form autoComplete="off" onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
              value={values.name}
              onChange={e => setvalues({ ...values, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={values.email}
              onChange={e => setvalues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Phone"
              value={values.phone}
              onChange={e => setvalues({ ...values, phone: e.target.value })}
            />
          </div>

          <div className="flex space-x-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Update
            </button>
            <Link
              to="/"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { getSquad, postMember } from "../../../Services";

const FormCreateMember = () => {
  const history = useHistory();
  const [squads, setSquads] = useState([]);

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    conf_password: "",
    squad_id: "",
    generation: "",
  };

  const onSubmit = (values) => {
    postMember(values)
    .then((data) => {
        if(data.status === 200){
            history.push('/user');
        }
    })
    .catch((error) => {
        console.log("Error ", error.response);
    })
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    username: Yup.string().min(3, "Min 3 character").required("Required!"),
    email: Yup.string().email("Invalid email Format!").required("Required!"),
    password: Yup.string().min(6, "Min 6 character").required("Required!"),
    conf_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Does not match with password")
      .required("Required!"),
    squad_id: Yup.string().required("Required!"),
    generation: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getAllSquad = () => {
    getSquad()
      .then((data) => {
        setSquads(data.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSquad();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative mb-3">
          <label htmlFor="name">Fullname</label>
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
            name="name"
            id="name"
            placeholder="Fullname"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className="text-sm text-red-500">{formik.errors.name}</span>
          ) : null}
        </div>
        <div className="relative mb-3">
          <label htmlFor="username">Username</label>
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
            name="username"
            id="username"
            placeholder="Username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="text-sm text-red-500">
              {formik.errors.username}
            </span>
          ) : null}
        </div>
        <div className="relative mb-3">
          <label htmlFor="email">Email</label>
          <input
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
            name="email"
            id="email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-sm text-red-500">{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="relative mb-3 flex justify-between gap-2 w-8/12">
          <div className="w-full">
            <label htmlFor="password">Password</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="password"
              id="password"
              placeholder="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-sm text-red-500">
                {formik.errors.password}
              </span>
            ) : null}
          </div>
          <div className="w-full">
            <label htmlFor="conf_password">Confirm Password</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="conf_password"
              id="conf_password"
              type="password"
              placeholder="Confirm Password"
              value={formik.values.conf_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.conf_password && formik.errors.conf_password ? (
              <span className="text-sm text-red-500">
                {formik.errors.conf_password}
              </span>
            ) : null}
          </div>
        </div>
        <div className="relative mb-3 flex justify-between gap-2  w-6/12">
          <div className="w-full">
            <label htmlFor="squad_id">Squad</label>
            <select
              className="w-full bg-white py-3 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="squad_id"
              id="squad_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Choose Squad</option>
              {squads.map((squad) => {
                return (
                  <option key={squad.id} value={squad.id}>
                    {squad.squads_name}
                  </option>
                );
              })}
            </select>
            {formik.touched.squad_id && formik.errors.squad_id ? (
              <span className="text-sm text-red-500">
                {formik.errors.squad_id}
              </span>
            ) : null}
          </div>
          <div className="w-full">
            <label htmlFor="generation">Generation (year)</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="generation"
              id="generation"
              type="text"
              value={formik.values.generation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.generation && formik.errors.generation ? (
              <span className="text-sm text-red-500">
                {formik.errors.generation}
              </span>
            ) : null}
          </div>
        </div>
        <div className="relative mb-3">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold text-center py-3 w-full rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateMember;

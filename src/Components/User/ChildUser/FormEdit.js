import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import {
  getSquad,
  getDetailUserService,
  updateUserService,
} from "../../../Services";
import { checkDiffDay } from "../../../Redux/helpers/diffDay";

const FormEdit = () => {
  const history = useHistory();
  const location = useLocation();
  const [squads, setSquads] = useState([]);
  const [diffDay, setDiffDay] = useState(0);

  const userId = location.state.userId;

  useEffect(() => {
    const getDetailUser = () => {
      getDetailUserService(userId)
        .then((data) => {
          setDiffDay(checkDiffDay(data.data.data.createdAt));
          formik.setFieldValue("name", data.data.data.name);
          formik.setFieldValue("username", data.data.data.username);
          formik.setFieldValue("email", data.data.data.email);
          formik.setFieldValue("squad_id", data.data.data.squad_id);
          formik.setFieldValue("roles", data.data.data.roles);
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    };

    getDetailUser();
    // eslint-disable-next-line
  }, [userId]);

  const initialValues = {
    name: "",
    username: "",
    email: "",
    squad_id: "",
    roles: "",
  };

  const onSubmit = (values) => {
    updateUserService(userId, values)
      .then((data) => {
        if (data.data.status === 200) {
          history.push("/user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!").matches(/^[aA-zZ\s]+$/, "Hanya huruf yang di ijinkan"),
    username: Yup.string().min(3, "Min 3 character").required("Required!"),
    email: Yup.string().email("Invalid email Format!").required("Required!"),
    squad_id: Yup.string().required("Required!"),
    roles: Yup.string().required("Required!"),
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
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mb-3">
        <label htmlFor="name">Fullname</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
          name="name"
          id="name"
          type="text"
          placeholder="Fullname"
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
          <span className="text-sm text-red-500">{formik.errors.username}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="email">Email</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="text-sm text-red-500">{formik.errors.email}</span>
        ) : null}
      </div>

      <div className="relative mb-3 flex justify-between gap-2  w-8/12">
        <div className="w-full">
          <label htmlFor="squad_id">Squad</label>
          <select
            className="w-full bg-white py-3 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
            name="squad_id"
            id="squad_id"
            value={formik.values.squad_id}
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
          <label htmlFor="roles">Role</label>
          <select
            className="w-full bg-white py-3 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
            name="roles"
            id="roles"
            value={formik.values.roles}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="Admin">Choose Roles</option>
            {diffDay >= 30 && (
              <>
                <option value="Mentor">Mentor</option>
                <option value="Bendahara">Bendahara</option>
              </>
            )}
            <option value="Anggota">Anggota</option>
          </select>
          {formik.touched.roles && formik.errors.roles ? (
            <span className="text-sm text-red-500">{formik.errors.roles}</span>
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
  );
};

export default FormEdit;

import React, {  useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getMoneyByIdService, updateMoneyService } from "../../../Services/";

const FormInputEditMoney = () => {
  const location = useLocation();
  const history = useHistory();
  const moneyId = location.state.idMoney;

  const initialValues = {
    name: "",
    amount: "",
    description: "",
    date: "",
    status: "",
  };

  const onSubmit = (values) => {
    const newData = {
        ...values,
        amount : ("" + values.amount).split('.').join('')
    }
    updateMoneyService(newData, moneyId)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("EDIT_SUCCESS", "SUCCESS");
          history.push("/money");
        }
      })
      .catch((error) => {
        console.log("Error ", error);
        alert("Something went wrong");
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    amount: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
    date: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    getMoneyByIdService(moneyId).then((data) => {
      formik.setFieldValue("name", data.data.data.name);
      formik.setFieldValue("amount", data.data.data.amount);
      formik.setFieldValue("description", data.data.data.description);
      formik.setFieldValue("date", data.data.data.date.slice(0, 10));
      formik.setFieldValue("status", data.data.data.status);
    });
    // eslint-disable-next-line
  }, [moneyId]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mb-3">
        <label htmlFor="name">Name</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <span className="text-red-500 text-sm">{formik.errors.name}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="amount">Amount</label>
        <NumberFormat
          thousandSeparator="."
          decimalSeparator=","
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter amount"
          name="amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
          onBlur={formik.handleBlur}
        />
        {formik.touched.amount && formik.errors.amount ? (
          <span className="text-red-500 text-sm">{formik.errors.amount}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter Description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <span className="text-red-500 text-sm">
            {formik.errors.description}
          </span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="date">Date</label>
        <input
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          name="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
          max={new Date().toISOString().split("T")[0]}
        />
        {formik.touched.date && formik.errors.date ? (
          <span className="text-red-500 text-sm">{formik.errors.date}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <label htmlFor="status">Status</label>
        <select
          className="w-full bg-white rounded py-3 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          name="status"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option>Choose Status</option>
          <option value="true">Masuk</option>
          <option value="false">Keluar</option>
        </select>
        {formik.touched.status && formik.errors.status ? (
          <span className="text-red-500 text-sm">{formik.errors.status}</span>
        ) : null}
      </div>
      <div className="relative mb-3">
        <button
          type="submit"
          className="bg-blue-500 rounded py-3 w-full text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormInputEditMoney;

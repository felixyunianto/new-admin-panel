import React from "react";
import { BiFolderOpen, BiCheckCircle } from "react-icons/bi";

const FormInput = ({ formik, filePath, setFilePath }) => {
  const handleChangeImage = (e) => {
    setFilePath(e.target.files);
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-between mb-2">
          <span className="font-bold text-md">Create or Update Data</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-4">
            <label htmlFor="squads_name">Squad Name</label>
            <input
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="squads_name"
              id="squads_name"
              type="text"
              placeholder="Squad Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.squads_name}
            />
            {formik.touched.squads_name && formik.errors.squads_name ? (
              <span className="text-red-500 text-sm">
                {formik.errors.squads_name}
              </span>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
              name="description"
              id="description"
              placeholder="Squad Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <span className="text-red-500 text-sm">
                {formik.errors.description}
              </span>
            ) : null}
          </div>
          <div className="realtive mb-4">
            <label htmlFor="image">Image</label>
            <div
              className={
                (filePath != null
                  ? "border-green-500"
                  : "border-blue-500") +
                    " cursor-pointer relative border-dotted h-32 rounded-lg border-dashed border-2 bg-gray-100 flex justify-center items-center"
              }
            >
              <div className="absolute">
                <div className="flex flex-col items-center">
                  {filePath != null ? (
                    <>
                      <BiCheckCircle className="text-green-500 text-2xl" />
                      <span className="block text-gray-400 font-normal">
                        File uploaded
                      </span>
                    </>
                  ) : (
                    <>
                      <BiFolderOpen className="text-blue-500 text-2xl" />
                      <span className="block text-gray-400 font-normal">
                        Attach you files here
                      </span>
                    </>
                  )}
                </div>
              </div>
              <input
                type="file"
                className="h-full w-full opacity-0"
                name="image"
                onChange={handleChangeImage}
              />
            </div>
          </div>
          <div className="relative">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full rounded py-1"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormInput;

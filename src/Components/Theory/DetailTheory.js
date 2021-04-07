import React, { useState, useEffect } from "react";
import { withRouter, Link, useLocation } from "react-router-dom";
import { getTheoryById, getTaskById } from "../../Services/";
import MarkdownPreview from "@uiw/react-markdown-preview";

const DetailTheoryComponent = () => {
  const location = useLocation();
  const theoryId = location.state.idTheory;

  const [theoryDetail, setTheoryDetail] = useState({});
  const [taskId, setTaskId] = useState("");
  const [contentTask, setContentTask] = useState("");
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTheoryById(theoryId)
      .then((data) => {
        setTheoryDetail(data.data.data[0]);
        setTaskId(data.data.data[0].tasks.id);
        setContentTask(data.data.data[0].tasks.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [theoryId]);

  useEffect(() => {
    if (taskId !== "") {
      getTaskById(taskId)
        .then((data) => {
          setTask(data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [theoryDetail, taskId]);

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Detail Theory</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="font-medium text-lg">
            Pertemuan Ke-{theoryDetail.gathering}
          </div>
          <div className="font-sm">{theoryDetail.description}</div>
          <div className="mt-2">
            <iframe
              title="content"
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${theoryDetail.content}`}
              width="80%"
              height="400px"
              frameBorder="0"
            ></iframe>
          </div>
        </div>

        <div>
          {theoryDetail.tasks ? (
            <div className="flex gap-2">
              <div className="border bg-white rounded-md p-5 h-auto mt-3 w-8/12">
                <MarkdownPreview source={contentTask} />
              </div>
              <div className="border bg-white rounded-md p-5 h-auto mt-3 w-4/12">
                <div className="text-lg font-bold">List</div>
                <div className="flex flex-col gap-2">
                  {task ? (
                    task.submit_tasks.map((submit_task) => {
                      return (
                        <div className="bg-gray-100 rounded shadow h-20 p-3">
                          <div className="font-bold text-lg">
                            {submit_task.member.name}
                          </div>
                          <div className="text-sm">
                            <a href={submit_task.answer} target="_blank" className="text-blue-700 hover:text-red-700">{submit_task.answer}</a>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>Please Wait .. </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="border bg-white rounded-md p-5 w-full h-auto mt-3">
              <Link
                to={{
                  pathname: "/task-create",
                  query: theoryDetail.id,
                }}
              >
                <button className="bg-blue-500 rounded w-full text-center text-white text-medium font-bold py-3">
                  Create New Task
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailTheoryComponent);
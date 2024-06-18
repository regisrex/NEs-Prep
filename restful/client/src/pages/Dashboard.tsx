import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import StudentForm from "../components/UserManagament/User";
import Button from "../components/button/button";
import Navbar from "../components/navbar/Navbar";
import Pagination from "../components/pagination/Pagination";
import Sidebar from "../components/sidebar/Sidebar";
import { axios } from "../utils/axios.config";
import toast from "react-hot-toast";
export interface Student {
  id: string;
  fullNames: string;
  email: string;
  phoneNumber: string;
  marks: number;
}

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const [currentStudents, setCurrentStudents] = useState<Student[]>([]);
  const studentsPerPage = 5;
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const handleAddStudent = async (student: Omit<Student, "id">) => {
    try {
      const res = await axios.post(
        "/students/createStudent",
        {
          ...student,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status !== 201) throw new Error(res.data.data.message);
      const newStudent = {
        ...res.data.data,
      };
      setStudents([...students, newStudent]);
      toast.success("Student saved");
      setIsFormOpen(false);
      
    } catch (error: any) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      if (error.name == "AxiosError") {
        toast.error(error.response.data.message || "Something went wrong");
      } else toast(error.message);
    }
  };

  const handleEditStudent = async (updatedStudent: Student) => {
    try {
      

    const res = await axios.put(
      `/students/${updatedStudent.id}`,
      {
        ...updatedStudent,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    if (res.status == 200) {
      toast.success("Student updated");
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setIsFormOpen(false)
    } else {
      toast.error(res.data.message || "Something went wrong");
    }
   } catch (error: any) {
      if (error.name == "AxiosError") {
        toast.error(error.response.data.message || "Something went wrong");
      } else toast(error.message);
    }
    // setEditStudent(null);
  };

  const handleDeleteStudent = async (id: string) => {
    const res = await axios.delete(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status == 200) {
      toast.success("Student deleted");
      setStudents(students.filter((student) => student.id !== id));
    } else {
      toast.error(res.data.message || "Something went wrong");
    }
  };

  const openEditForm = (student: Student) => {
    setEditStudent(student);
    setIsFormOpen(true);
  };

  useEffect(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    setCurrentStudents(students.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [currentPage, students]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/students/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStudents(res.data.data);
    })();
  }, []);
  return (
    <div className="flex h-screen font-poppins">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="flex p-5 items-center justify-between">
          <span className="text-lg  font-poppins font-black mb-4">
            Student Management
          </span>
          <Button
            onClick={() => {
              setEditStudent(null);
              setIsFormOpen(true);
            }}
            className="w-fit"
          >
            + Add{" "}
          </Button>
        </div>
        <div className="mx-10  mt-6 border border-slate-100 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-5 px-4 text-left">ID</th>
                <th className="py-5 px-2 text-left">Names</th>
                <th className="py-5 px-2 text-left">Email</th>
                <th className="py-5 text-left">Phone Number</th>
                <th className="py-5 px-2 text-left">Marks</th>
                <th className="py-5 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, i) => (
                <tr key={student.id} className="text-text border-b">
                  <td className="py-5 px-4 ">{i + 1}</td>
                  <td className="py-5 px-2">{student.fullNames}</td>
                  <td className="py-5 px-2">{student.email}</td>
                  <td className="py-5">{student.phoneNumber}</td>
                  <td className="py-5 px-2">{student.marks}</td>
                  <td className="py-3 px-2">
                    <div className="flex space-between items-center gap-3">
                      <button
                        onClick={() => openEditForm(student)}
                        className="border border-button/20 hover:bg-button/10 flex items-center gap-1 hover:bg-blue- text-button  py-2 px-4 ml-3 rounded"
                      >
                        <PencilSquareIcon
                          className="stroke-button"
                          width={16}
                        />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="border flex items-center gap-1 hover:bg-text-red/10 border-text-red/20 text-text-red py-2 px-4 mr-4 rounded"
                      >
                        <TrashIcon className="stroke-text-red" width={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isFormOpen && (
          <StudentForm
            onClose={() => setIsFormOpen(false)}
            onSubmit={editStudent ? handleEditStudent : handleAddStudent}
            initialData={editStudent}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
};

export default Dashboard;

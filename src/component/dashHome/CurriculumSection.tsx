import React, { useState } from "react";
import { useAddSectionMutation, useCreateALectureMutation } from "../../redux/features/course/productApi";
import { message } from "antd";
import Swal from "sweetalert2";

const CourseEditor = ({ id }) => {
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      lectures: [
        {
          id: Date.now() + 1,
          lectureId: "",
          title: "Default Lecture title",
          video: "",
          description: "",
          duration: "",
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const [addSection] = useAddSectionMutation();
  const [createALecture] = useCreateALectureMutation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewSectionTitle("");
  };

  const handleAddSection = async () => {
    if (!newSectionTitle.trim()) {
      alert("Section title cannot be empty!");
      return;
    }

    try {
      const response = await addSection({ courseId: id, title: newSectionTitle }).unwrap();

      if (response?.success) {
        message.success(response.message);
        const data = response.data;

        setSections([
          ...sections,
          { id: data._id, title: data.title, lectures: [] },
        ]);

        toggleModal();
      }
    } catch (error) {
      console.error("Error creating section:", error);
      alert("Failed to create section. Please try again.");
    }
  };

  const addLecture = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: Date.now(),
                  lectureId: "",
                  title: "",
                  video: "",
                  description: "",
                  duration: "",
                },
              ],
            }
          : section
      )
    );
  };

  const updateLecture = (sectionId, lectureId, field, value) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId ? { ...lecture, [field]: value } : lecture
              ),
            }
          : section
      )
    );
  };

  const handleSubmit = async () => {
    // Check if all input fields are filled
    for (const section of sections) {
      for (const lecture of section.lectures) {
        if (!lecture.lectureId || !lecture.title || !lecture.video || !lecture.description || !lecture.duration) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please fill in all the required fields.",
          });
          return;
        }
      }
    }

    const formattedData = sections.map((section) => ({
      lectures: section.lectures.map((lecture, lectureIndex) => ({
        lectureIndex: lectureIndex + 1,
        sectionId: lecture.lectureId || `Lecture ${lectureIndex + 1}`,
        title: lecture.title || `Untitled Lecture ${lectureIndex + 1}`,
        video: lecture.video || "No Video Link",
        description: lecture.description || "No Description",
        duration: lecture.duration || "No Duration",
      })),
    }));

    const alldata = formattedData?.[0]?.lectures?.map((lecture) => ({
      courseId: id,
      sectionId: lecture.sectionId,
      title: lecture.title,
      videoLink: lecture.video,
      description: lecture.description,
      duration: lecture.duration,
    }));

    const submitableData = alldata?.[0];

    try {
      const res = await createALecture(submitableData).unwrap();
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${res.message}`,
        });

        // Clear all input fields
        setSections([
          {
            id: Date.now(),
            lectures: [
              {
                id: Date.now() + 1,
                lectureId: "",
                title: "Default Lecture title",
                video: "",
                description: "",
                duration: "",
              },
            ],
          },
        ]);
      }
    } catch (error) {
      console.error("Error submitting lecture:", error);
      alert("Failed to submit lecture. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Section
      </button>

      {sections.map((section) => (
        <div key={section.id} className="border p-4 mb-4">
          <button
            onClick={() => addLecture(section.id)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Lecture
          </button>

          {section.lectures.map((lecture) => (
            <div key={lecture.id} className="border p-4 mb-4">
              <input
                type="text"
                placeholder="Lecture ID"
                value={lecture.lectureId}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "lectureId", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Lecture Title"
                value={lecture.title}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "title", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Video Link"
                value={lecture.video}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "video", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={lecture.description}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "description", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="Duration (e.g., 10:30)"
                value={lecture.duration}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "duration", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Section</h2>
            <input
              type="text"
              placeholder="Section Title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="block w-full mb-4 p-2 border rounded"
              required
            />
            <div className="flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEditor;

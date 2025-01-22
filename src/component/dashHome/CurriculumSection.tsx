// import React, { useState } from "react";

// const CourseEditor = () => {
//   // Initialize state with a default section and lecture
//   const [sections, setSections] = useState([
//     {
//       id: Date.now(),
//       title: "Default Section",
//       lectures: [
//         {
//           id: Date.now() + 1,
//           title: "Default Lecture",
//           video: null,
//           description: "",
//         },
//       ],
//     },
//   ]);

//   // Function to add a new section
//   const addSection = () => {
//     setSections([
//       ...sections,
//       { id: Date.now(), title: "", lectures: [] }, // Empty section
//     ]);
//   };

//   // Function to add a lecture to a specific section
//   const addLecture = (sectionId) => {
//     setSections(
//       sections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               lectures: [
//                 ...section.lectures,
//                 { id: Date.now(), title: "", video: null, description: "" },
//               ],
//             }
//           : section
//       )
//     );
//   };

//   // Function to update section title
//   const updateSectionTitle = (sectionId, title) => {
//     setSections(
//       sections.map((section) =>
//         section.id === sectionId ? { ...section, title } : section
//       )
//     );
//   };

//   // Function to update lecture details
//   const updateLecture = (sectionId, lectureId, field, value) => {
//     setSections(
//       sections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               lectures: section.lectures.map((lecture) =>
//                 lecture.id === lectureId ? { ...lecture, [field]: value } : lecture
//               ),
//             }
//           : section
//       )
//     );
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={addSection}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Section
//       </button>

//       {sections.map((section) => (
//         <div key={section.id} className="border p-4 mb-4">
//           <input
//             type="text"
//             placeholder="Section Title"
//             value={section.title}
//             onChange={(e) => updateSectionTitle(section.id, e.target.value)}
//             className="block w-full mb-2 p-2 border rounded"
//           />

//           <button
//             onClick={() => addLecture(section.id)}
//             className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//           >
//             Add Lecture
//           </button>

//           {section.lectures.map((lecture) => (
//             <div key={lecture.id} className="border p-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Lecture Title"
//                 value={lecture.title}
//                 onChange={(e) =>
//                   updateLecture(section.id, lecture.id, "title", e.target.value)
//                 }
//                 className="block w-full mb-2 p-2 border rounded"
//               />

//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) =>
//                   updateLecture(
//                     section.id,
//                     lecture.id,
//                     "video",
//                     e.target.files[0]
//                   )
//                 }
//                 className="block w-full mb-2"
//               />

//               <textarea
//                 placeholder="Description"
//                 value={lecture.description}
//                 onChange={(e) =>
//                   updateLecture(
//                     section.id,
//                     lecture.id,
//                     "description",
//                     e.target.value
//                   )
//                 }
//                 className="block w-full mb-2 p-2 border rounded"
//               />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseEditor;
import React, { useState } from "react";

const CourseEditor = () => {
  // Initialize state with a default section and lecture
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: "Default Section",
      lectures: [
        {
          id: Date.now() + 1,
          title: "Default Lecture",
          video: null,
          description: "",
        },
      ],
    },
  ]);

  // Function to add a new section
  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), title: "", lectures: [] }, // Empty section
    ]);
  };

  // Function to add a lecture to a specific section
  const addLecture = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                { id: Date.now(), title: "", video: null, description: "" },
              ],
            }
          : section
      )
    );
  };

  // Function to update section title
  const updateSectionTitle = (sectionId, title) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, title } : section
      )
    );
  };

  // Function to update lecture details
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

  // Function to handle form submission and log all values
  const handleSubmit = () => {
    console.log("Course Data:", sections);
  };

  return (
    <div className="p-4">
      <button
        onClick={addSection}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Section
      </button>

      {sections.map((section) => (
        <div key={section.id} className="border p-4 mb-4">
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
            className="block w-full mb-2 p-2 border rounded"
          />

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
                placeholder="Lecture Title"
                value={lecture.title}
                onChange={(e) =>
                  updateLecture(section.id, lecture.id, "title", e.target.value)
                }
                className="block w-full mb-2 p-2 border rounded"
              />

              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  updateLecture(
                    section.id,
                    lecture.id,
                    "video",
                    e.target.files[0]
                  )
                }
                className="block w-full mb-2"
              />

              <textarea
                placeholder="Description"
                value={lecture.description}
                onChange={(e) =>
                  updateLecture(
                    section.id,
                    lecture.id,
                    "description",
                    e.target.value
                  )
                }
                className="block w-full mb-2 p-2 border rounded"
              />
            </div>
          ))}
        </div>
      ))}

      {/* Submit Button to log values */}
      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default CourseEditor;

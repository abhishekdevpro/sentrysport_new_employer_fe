// // // import { useForm, Controller } from "react-hook-form";
// // // import TextEditor from "./TextEditor";

// // // export default function MyForm() {
// // //   const { handleSubmit, control, formState: { errors } } = useForm({
// // //     defaultValues: {
// // //       description: ""
// // //     }
// // //   });

// // //   const onSubmit = (data) => {
// // //     console.log("Form Data:", data);
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit(onSubmit)}>
// // //       <Controller
// // //         name="description"
// // //         control={control}
// // //         rules={{
// // //           required: "Description is required",
// // //           validate: (value) =>
// // //             value.replace(/<[^>]+>/g, "").trim().length > 0 ||
// // //             "Description cannot be empty"
// // //         }}
// // //         render={({ field }) => (
// // //           <TextEditor
// // //             value={field.value}
// // //             onChange={field.onChange}
// // //             maxLength={500}
// // //           />
// // //         )}
// // //       />
// // //       {errors.description && (
// // //         <p className="text-red-500 text-sm">{errors.description.message}</p>
// // //       )}

// // //       <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white">
// // //         Submit
// // //       </button>
// // //     </form>
// // //   );
// // // }


// // // TextEditor.jsx
// // import React from "react";
// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css";

// // const TextEditor = ({ value, onChange, maxLength = 500, placeholder }) => {
// //   const handleChange = (content) => {
// //     // Optional: enforce max length (excluding HTML tags)
// //     const plainText = content.replace(/<[^>]+>/g, "").trim();
// //     if (plainText.length <= maxLength) {
// //       onChange(content);
// //     }
// //   };

// //   return (
// //     <div className="text-editor">
// //       <ReactQuill
// //         theme="snow"
// //         value={value}
// //         onChange={handleChange}
// //         placeholder={placeholder}
// //       />
// //       <div className="text-right text-sm text-gray-500 mt-1">
// //         {value.replace(/<[^>]+>/g, "").trim().length}/{maxLength}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TextEditor;


// // TextEditorRHF.jsx
// "use client";

// import { useEffect } from "react";
// import { useFormContext } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function TextEditor({
//   name,
//   rules,
//   placeholder,
//   maxLength = 2000,
//   className = ""
// }) {
//   const { setValue, watch, register, formState: { errors } } = useFormContext();

//   // Register the field so RHF knows about it
//   useEffect(() => {
//     register(name, rules);
//   }, [name, register, rules]);

//   const value = watch(name) || "";

//   const handleChange = (content) => {
//     setValue(name, content, { shouldValidate: true });
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//       />
//       <div className="text-right text-sm text-gray-500 mt-1">
//         {value.replace(/<[^>]+>/g, "").trim().length}/{maxLength}
//       </div>
//       {errors[name] && (
//         <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
//       )}
//     </div>
//   );
// }



// "use client";

// import { Controller, useFormContext } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const TextEditor = ({
//   name,
//   label,
//   placeholder = "",
//   maxLength = 200,
//   minLength = 0,
//   rules = {}
// }) => {
//   const { control, formState: { errors } } = useFormContext();

//   // Helper: Get plain text length
//   const getPlainTextLength = (html) => {
//     const div = document.createElement("div");
//     div.innerHTML = html;
//     return div.innerText.length;
//   };

//   return (
//     <div className="relative">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label} {rules.required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           ...rules,
//           validate: (value) => {
//             const length = getPlainTextLength(value);
//             if (minLength && length < minLength) {
//               return `Minimum ${minLength} characters required`;
//             }
//             if (length > maxLength) {
//               return `Maximum ${maxLength} characters allowed`;
//             }
//             return true;
//           }
//         }}
//         render={({ field }) => (
//           <>
//             <ReactQuill
//               theme="snow"
//               value={field.value || ""}
//               onChange={(content, delta, source, editor) => {
//                 const plainText = editor.getText();
//                 if (plainText.trim().length <= maxLength) {
//                   field.onChange(content);
//                 }
//               }}
//               placeholder={placeholder}
//             />
//             <div className="text-xs text-gray-500 mt-1 text-right">
//               {getPlainTextLength(field.value || "")}/{maxLength} characters
//             </div>
//           </>
//         )}
//       />

//       {errors[name] && (
//         <p className="text-sm font-medium text-red-600 mt-2">
//           {errors[name].message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default TextEditor;


"use client";

import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({
  name,
  label,
  placeholder = "",
  maxLength = 200,
  minLength = 0,
  rules = {}
}) => {
  const { control, formState: { errors } } = useFormContext();
  const quillRef = useRef(null);

  // Helper: Get plain text length (excluding HTML tags)
  const getPlainTextLength = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.length;
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      // Listen to text changes
      editor.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          const text = editor.getText();
          if (text.trim().length > maxLength) {
            editor.deleteText(maxLength, editor.getLength()); // remove extra chars
          }
        }
      });
    }
  }, [maxLength]);

  return (
    <div className="relative">
      {label && (
        <label className="app-text-label mb-1">
          {label} {rules.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          validate: (value) => {
            const length = getPlainTextLength(value);
            if (minLength && length < minLength) {
              return `Minimum ${minLength} characters required`;
            }
            if (length > maxLength) {
              return `Maximum ${maxLength} characters allowed`;
            }
            return true;
          }
        }}
        render={({ field }) => (
          <>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
            />
            <div className="app-text-sm mt-1 text-right">
              {getPlainTextLength(field.value || "")}/{maxLength} characters
            </div>
          </>
        )}
      />

      {errors[name] && (
        <p className="text-sm font-medium text-red-600 mt-2">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default TextEditor;

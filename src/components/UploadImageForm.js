import { useState } from "react";
import { FileDrop } from "react-file-drop";
import API from "@/common/API.js";
import ErrorMessage from "@/components/ErrorMessage.js";

export default function UploadImageForm(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [previewFile, setPreviewFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const changeHandler = (event) => {
    setErrorMessage(null);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    setPreview(event.target.files[0]);
  };

  const handleDrop = (files, event) => {
    event.preventDefault();
    setErrorMessage(null);
    setSelectedFile(files[0]);
    setIsSelected(true);
    setPreview(files[0]);
  };

  const setPreview = (file) => {
    let reader = new FileReader();
    reader.onload = function (file) {
      setPreviewFile(file.target.result);
    };
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    setIsLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("file", selectedFile);
    bodyFormData.append("sub_id", props.user["uuid"]);
    API.upload(
      `${process.env.REACT_APP_CAT_API_ENDPOINT}/images/upload`,
      bodyFormData
    )
      .then((response) => {
        let { data } = response;
        if (data.approved) {
          handleSuccess();
        } else {
          handleError(data.message);
        }
      })
      .catch((errorResponse) => {
        let { Error } = errorResponse;
        setErrorMessage(Error);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const handleSuccess = (message) => {
    if (props.onUploadComplete) props.onUploadComplete();
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setIsSelected(false);
  };

  const handleCancel = (event) => {
    setIsSelected(false);
    setErrorMessage(null);
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmission}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <p className="mt-1 text-sm text-gray-500">
              This will be displayed publicly so be careful what you share,{" "}
              <a
                href="https://thecatapi.com/privacy"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                the legal stuff
              </a>
            </p>
          </div>

          {errorMessage && (
            <div className="my-4">
              <ErrorMessage>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
              </ErrorMessage>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              {isSelected && selectedFile && (
                <div className="w-full flex justify-center px-4">
                  <img src={previewFile} className="w-full md:w-72" alt="Preview" />
                </div>
              )}
              {!isSelected && (
                <>
                  <label
                    htmlFor="cover_photo"
                    className="block text-sm font-medium text-gray-700 sr-only"
                  >
                    Your image
                  </label>
                  <FileDrop
                    onFrameDragEnter={(event) =>
                      console.log("onFrameDragEnter", event)
                    }
                    onFrameDragLeave={(event) =>
                      console.log("onFrameDragLeave", event)
                    }
                    onFrameDrop={(event) => console.log("onFrameDrop", event)}
                    onDragOver={(event) => console.log("onDragOver", event)}
                    onDragLeave={(event) => console.log("onDragLeave", event)}
                    onDrop={(files, event) => handleDrop(files, event)}
                  >
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={changeHandler}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </FileDrop>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSelected ? (
        <div className="pt-2">
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Please wait" : "Upload"}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}

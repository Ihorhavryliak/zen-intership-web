import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type UploadPortfolioPhotoType = {
  setSelectedFile: (v: any) => void;
  selectedFile: any;
  setPreview: (v: any) => void;
  preview: string[];
};
export const UploadImg = (props: UploadPortfolioPhotoType) => {
  const { setSelectedFile, selectedFile, preview, setPreview } =
    props;
  const dispatch: AppDispatch = useDispatch();
  function handleChange(event: any) {
    //fre view photo
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile([]);
      return;
    }
    //@ts-ignore
    setSelectedFile([...event.target.files]);
  }
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    const objectUrl = [] as string[];
    Object.keys(selectedFile).forEach((key) => {
      //@ts-ignore
      objectUrl.push(URL.createObjectURL(selectedFile[key]) as string);
    });
    //@ts-ignore
    if (!objectUrl.length > 0) {
    } else {
      //@ts-ignore
      setPreview(objectUrl);
    }
    // free memory when ever this component is unmounted
    //@ts-ignore
    return () =>
      Object.keys(selectedFile).forEach((key) => {
        //@ts-ignore
        URL.revokeObjectURL(objectUrl[key]);
      });
  }, [selectedFile]);
  const onDeletePhoto = () => {
    setPreview([]);
    setSelectedFile([]);
  };

  return (
    <div className="col-12">
      <div className="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
        {/* 		<!-- Image --> */}
        <img
          src="assets/images/element/gallery.svg"
          className="h-50px"
          alt=""
        />
          <div>
            <label>
              <span>
                <input
                  accept="image/gif, image/jpeg, image/png, .txt"
                  type="file"
                  multiple={false}
                  className="form-control stretched-link"
                  onChange={handleChange}
                />
              </span>
            </label>
          </div>
          {preview.length > 0 && (
            <div className="d-flex mt-4 border-top border-bottom pt-2 pb-4">
              {preview &&
                preview.map((m, i) => {
                  return (
                    <div key={`${m}_${i}`} className="w-120px ">
                      <label className="position-relative me-4">
                        <img
                          src={m}
                          key={m}
                          className="avatar-img  border border-white border-3 shadow"
                          alt={m}
                        />

                        <button
                          type="button"
                          className="uploadremove button__index"
                          onClick={() => onDeletePhoto()}
                        >
                          x
                        </button>
                      </label>
                    </div>
                  );
                })}
            </div>
          )}
      </div>
    </div>
  );
};

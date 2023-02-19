import { useEffect, useState } from "react";

export const UploadImg = (props: UploadPortfolioPhotoType) => {
  const { setSelectedFile, selectedFile, preview, setPreview } = props;
  const [validation, setValidation] = useState({ size: "" });
  function handleChange(event: any) {
    const files = event.target.files;
    /* check size */
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size;
    }
    /* check size and type */
    if (event.target.files[0].type === "text/plain" && totalSize > 102400) {
      return setValidation({
        ...validation,
        size: "The text file must not be larger than 100 kb, TXT format.",
      });
    } else {
      setValidation({ size: "" });
    }
    //fre view photo
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile([]);
      return;
    }
    setSelectedFile([...event.target.files]);
  }
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    const stringUrl = [] as string[];
    /* check is txt format */
    if (
      selectedFile &&
      selectedFile[0] &&
      selectedFile[0].name &&
      selectedFile[0].name.slice(selectedFile[0].name.lastIndexOf(".")) ===
        ".txt"
    ) {
      stringUrl.push(selectedFile[0].name);
      setPreview(stringUrl);
      return;
    }
    Object.keys(selectedFile).forEach((key) => {
      stringUrl.push(URL.createObjectURL(selectedFile[key]) as string);
    });
    if (stringUrl.length !== 0) {
      setPreview(stringUrl);
    }
  }, [selectedFile]);

  const onDeletePhoto = () => {
    setPreview([]);
    setSelectedFile([]);
    setValidation({ size: "" });
  };
  console.log(preview, "preview");
  return (
    <div >
      <div >
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
                className="form-control"
                onChange={handleChange}
              />
            </span>
          </label>
        </div>
        {preview.length > 0 && (
          <div className="d-flex mt-4 border-top border-bottom pt-2 pb-4">
            {preview &&
              preview.map((name, i) => {
                return (
                  <div key={`${name}_${i}`} className="w-120px ">
                    <label className="position-relative me-4">
                      {name.slice(name.lastIndexOf(".")) === ".txt" ? (
                        <span>{name}</span>
                      ) : (
                        <img
                          src={name}
                          key={name}
                          className="avatar-img  border border-white border-3 shadow img__added"
                          alt={name}
                        />
                      )}
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
      {validation.size.length > 0 && (
        <div className="error text-light">{validation.size}</div>
      )}
    </div>
  );
};

type UploadPortfolioPhotoType = {
  setSelectedFile: (v: any) => void;
  selectedFile: any;
  setPreview: (v: any) => void;
  preview: string[];
};

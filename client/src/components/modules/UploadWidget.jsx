import { Plus } from "lucide-react";
import { createContext, useEffect, useState } from "react";

const ScriptContext = createContext();

function UploadWidget({ uwConfig, setImages, setImage }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            if (setImage) {
              setImage(result.info.secure_url);
            } else {
              setImages((prev) => [...prev, result.info.secure_url]);
            }
          }
        },
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false,
      );
    }
  };

  return (
    <ScriptContext.Provider value={{ loaded }}>
      <div
        id="upload_widget"
        className="flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-300 p-5"
        onClick={initializeCloudinaryWidget}
      >
        <Plus className="text-gray-500" strokeWidth={1} />
      </div>
    </ScriptContext.Provider>
  );
}

export default UploadWidget;
export { ScriptContext };

import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import User from "@/stores/User";
import Images from "@/stores/Images";
import UploadImageForm from "@/components/UploadImageForm";

const Upload = (props) => {
  const StoredUser = User.get();
  const { addToast } = useToasts();
  const history = useHistory();
  const handleUploadComplete = () => {
    Images.clear();
    addToast("Your image was uploaded!", {
      appearance: "success",
      autoDismiss: true,
    });
    history.push("/");
  };
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            Upload
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <UploadImageForm
            onUploadComplete={handleUploadComplete}
            user={StoredUser}
          />
        </div>
      </main>
    </>
  );
};
export default Upload;

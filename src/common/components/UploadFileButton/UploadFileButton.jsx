import "./UploadFileButton.css";
import FormField from "../FormField/FormField";

const UploadFileButton = ({handleFileChange}) => {
    return (
        <FormField
            name="file"
            type="file"
            onChangeHandler={handleFileChange}
            className="file-upload-input"
        />
    );
};

export default UploadFileButton;
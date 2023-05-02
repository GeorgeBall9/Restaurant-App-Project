import "./UploadFileButton.css";

const UploadFileButton = ({handleFileChange}) => {
    return (
        <input
            name="file"
            type="file"
            accept=".png,.jpeg"
            onChange={handleFileChange}
            className="file-upload-input"
        />
    );
};

export default UploadFileButton;
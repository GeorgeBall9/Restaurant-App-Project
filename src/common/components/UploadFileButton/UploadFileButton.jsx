import "./UploadFileButton.css";

const UploadFileButton = ({handleFileChange}) => {
    return (
        <input
            type="file"
            accept=".png,.jpeg"
            onChange={handleFileChange}
            className="file-upload-input"
        />
    );
};

export default UploadFileButton;
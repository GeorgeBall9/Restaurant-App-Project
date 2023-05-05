import "./UploadFileButton.css";

const UploadFileButton = ({handleFileChange}) => {
    return (
        <input
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleFileChange}
            className="file-upload-input"
        />
    );
};

export default UploadFileButton;
import React, { useState } from "react";
import { Button, Message, Modal, toaster } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValid = (file) => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValid(file)) {
        setImg(file);
        open();
      } else {
        toaster.push(
          <Message type="warning">Wrong file type ${file.type}</Message>
        );
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label htmlFor="avatar-upload" className="d-block cursor-pointer">
          Select a new avatar
          <input
            type="file"
            id="avatar-upload"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and uplaod new avatar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  color={[255, 255, 255, 0.6]}
                  scale={1.2}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;

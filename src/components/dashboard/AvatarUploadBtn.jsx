import React, { useRef, useState } from "react";
import { Button, Message, Modal, toaster } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { set, ref as dbRef } from "firebase/database";

import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "./ProfileAvatar";

const fileInputTypes = ".png, .jpeg, .jpg";

const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValid = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const { profile } = useProfile();
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);

  const avatarEditerRef = useRef();

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

  const onUploadClick = async () => {
    const canvas = avatarEditerRef.current.getImageScaledToCanvas();

    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storageRef(
        storage,
        `/profiles/${profile.uid}/avatar`
      );

      await uploadBytes(avatarFileRef, blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await getDownloadURL(avatarFileRef);

      const userAvatarRef = dbRef(database, `profiles/${profile.uid}/avatar`);

      set(userAvatarRef, downloadUrl);
      toaster.push(<Message type="info">Avatar has been uploaded</Message>);
    } catch (err) {
      toaster.push(<Message type="error">{err.message}</Message>);
      console.log(err.message);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
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
                  ref={avatarEditerRef}
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
            <Button block appearance="ghost" onClick={onUploadClick}>
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;

import React from "react";
import { Button, Divider, Drawer, Message, toaster } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { ref, set } from "firebase/database";
import { database } from "../../misc/firebase";
import AvatarUploadBtn from "./AvatarUploadBtn";

const DashboardComponent = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newdata) => {
    const userNicknameRef = ref(database, `/profiles/${profile.uid}/name`);

    try {
      await set(userNicknameRef, newdata);
      toaster.push(
        <Message type="success">Nickname has been updated </Message>
      );
    } catch (error) {
      toaster.push(<Message type="error">{error.Message}</Message>);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
        <Button color="red" appearance="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Body>
    </>
  );
};

export default DashboardComponent;

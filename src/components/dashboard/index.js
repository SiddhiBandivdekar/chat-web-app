import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";

const DashboardComponent = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = (newdata) => {
    console.log(newdata);
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
        <Button color="red" appearance="primary" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Body>
    </>
  );
};

export default DashboardComponent;

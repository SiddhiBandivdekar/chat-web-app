import React from "react";
import { Button, Drawer } from "rsuite";
import { Dashboard } from "@rsuite/icons";
import { useModalState } from "../../misc/custom-hooks";
import DashboardComponent from ".";

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <Button color="blue" appearance="primary" block onClick={open}>
        <Dashboard /> Dashboard
      </Button>
      <Drawer open={isOpen} onClose={close} placement="left">
        <DashboardComponent />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;

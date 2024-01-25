import React, { useCallback } from "react";
import { Button, Drawer, Message, toaster } from "rsuite";
import { Dashboard } from "@rsuite/icons";
import { useModalState } from "../../misc/custom-hooks";
import DashboardComponent from ".";
import { auth } from "../../misc/firebase";

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModalState();

  const isMobile = window.innerWidth <= 992;

  const onSignOut = useCallback(() => {
    auth.signOut();

    toaster.push(
      <Message type="info" closable>
        Signed out
      </Message>
    );
    close();
  }, [close]);
  return (
    <>
      <Button color="blue" appearance="primary" block onClick={open}>
        <Dashboard /> Dashboard
      </Button>
      <Drawer
        size={isMobile ? "lg" : "md"}
        open={isOpen}
        onClose={close}
        placement="left"
      >
        <DashboardComponent onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;

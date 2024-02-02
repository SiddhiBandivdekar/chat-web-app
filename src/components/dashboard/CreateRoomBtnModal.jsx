import { Creative } from "@rsuite/icons";
import React, { useCallback, useRef, useState } from "react";
import { Button, Form, Message, Modal, Schema, toaster } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import FormGroup from "rsuite/esm/FormGroup";
import { push, ref, serverTimestamp } from "firebase/database";
import { database } from "../../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is required"),
  description: StringType().isRequired("Description is required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};
const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const formRef = useRef();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: serverTimestamp(),
    };

    try {
      await push(ref(database, "rooms"), newRoomData);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      toaster.push(
        <Message type="info">`${formValue.name}` has been created</Message>
      );
    } catch (error) {
      setIsLoading(false);
      toaster.push(<Message type="error">{error.message}</Message>);
    }
  };

  return (
    <div className="mt-2">
      <Button block color="green" appearance="primary" onClick={open}>
        <Creative /> Create new chat room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <Form.ControlLabel>Room name</Form.ControlLabel>
              <Form.Control name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="description"
                placeholder="Enter room description.."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;

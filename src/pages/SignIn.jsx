import React from "react";
import { Button, Col, Container, Grid, Panel, Row } from "rsuite";
import GooglePlusCircleIcon from "@rsuite/icons/legacy/GooglePlusCircle";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, database } from "../misc/firebase";
import { ref, serverTimestamp, set } from "firebase/database";

const SignIn = () => {
  const signInProvider = async (provider) => {
    try {
      const { user, _tokenResponse } = await signInWithPopup(auth, provider);
      if (_tokenResponse.isNewUser) {
        await set(ref(database, `/profiles/${user.uid}`), {
          name: user.displayName,
          createdAt: serverTimestamp(),
        });
        console.log(user);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const onGoogleSignUp = () => {
    signInProvider(new GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to chat</h2>
                <p>Progressive chat platform</p>
              </div>

              <div className="mt-3 text-center">
                <Button
                  color="blue"
                  appearance="primary"
                  startIcon={<GooglePlusCircleIcon />}
                  onClick={onGoogleSignUp}
                >
                  Sign in with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;

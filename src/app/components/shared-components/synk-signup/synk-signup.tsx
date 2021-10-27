import React, { useState } from "react";
import { Split, SplitItem, Button } from "@patternfly/react-core";

type Signprop = {
  isUUID: boolean,
};

type State = {
  signUpText: string,
};

const SignUp = ({ isUUID }: Signprop) => {
  const Text =
    "Sign up for a free Snyk account to find out about the vulnerabilities that have been found, and whether any have a publicly known exploit";
  const [signUpText, setSignUpText] = useState(Text);
  if (isUUID === false) {
    return (
      <Split hasGutter>
        <SplitItem>
          <Button
            component="a"
            href="https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9"
            iconPosition="right"
            className=".pf-m-progress"
            target="_blank"
            id="snyk-sign-up-btn"
            isSmall
          >
            Sign up for Snyk
          </Button>
        </SplitItem>
        <SplitItem isFilled>
          <p className="sign-up-text">{signUpText}</p>
        </SplitItem>
      </Split>
    );
  }
  return null;
};

export default SignUp;

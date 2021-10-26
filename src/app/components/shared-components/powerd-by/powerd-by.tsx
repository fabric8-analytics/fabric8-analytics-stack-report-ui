/* eslint-disable global-require */
import React from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import logo from "./snyk.png";

const PoweredBySynk = () => {
  return (
    <Split hasGutter>
      <SplitItem>
        <p className="title">Powered by:</p>
      </SplitItem>
      <SplitItem>
        <img className="bitmap" id="imgHome" alt="snyk" src={logo} />
      </SplitItem>
    </Split>
  );
};

export default PoweredBySynk;

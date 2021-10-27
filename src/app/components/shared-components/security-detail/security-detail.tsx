import React from "react";
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, SecurityIcon } from "@patternfly/react-icons";

type SecurityProps = {
  vulnerablities: number,
  vulnerable: number,
};

const Security = ({ vulnerablities, vulnerable }: SecurityProps) => {
  const condition = vulnerablities > 0 || vulnerable > 0;
  return (
    <div>
      <Flex
        key="1"
        direction={{ default: "column" }}
        display={{ default: "inlineFlex" }}
      >
        <FlexItem spacer={{ default: "spacerXs" }}>
          <Split hasGutter>
            <SplitItem>
              <SecurityIcon className="icon-class" />
            </SplitItem>
            <SplitItem>
              <Title headingLevel="h6" size="md">
                Security Issues
              </Title>
            </SplitItem>
            {condition && (
              <SplitItem>
                <ExclamationCircleIcon
                  id="warning-security"
                  className="icon-class-exclamation"
                />
              </SplitItem>
            )}
          </Split>
        </FlexItem>
      </Flex>
      <Flex key="2" direction={{ default: "column" }}>
        {vulnerablities >= 0 && (
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>Total vulnerabilities:</SplitItem>
              <SplitItem>
                <Title id="vulnerablities" headingLevel="h6" size="md">
                  {vulnerablities}
                </Title>
              </SplitItem>
            </Split>
          </FlexItem>
        )}
        {vulnerable >= 0 && (
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>Vulnerable dependencies:</SplitItem>
              <SplitItem>
                <Title id="vulnerable" headingLevel="h6" size="md">
                  {vulnerable}
                </Title>
              </SplitItem>
            </Split>
          </FlexItem>
        )}
      </Flex>
    </div>
  );
};

export default Security;

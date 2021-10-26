import React from "react";
import {
  Flex,
  FlexItem,
  FlexProps,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, FileAltIcon } from "@patternfly/react-icons";

type LicensesProps = {
  conflicts: number,
  unknown: number,
};

const Licenses = ({ conflicts, unknown }: LicensesProps) => {
  const condition = conflicts > 0 || unknown > 0;
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
              <FileAltIcon className="icon-class" />
            </SplitItem>
            <SplitItem>
              <Title headingLevel="h6" size="md">
                Licences
              </Title>
            </SplitItem>
            {condition && (
              <SplitItem>
                <ExclamationCircleIcon
                  id="warning-conflicts-unknown"
                  className="icon-class-exclamation"
                />
              </SplitItem>
            )}
          </Split>
        </FlexItem>
      </Flex>
      <Flex key="2" direction={{ default: "column" }}>
        {conflicts >= 0 && (
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>License conflicts:</SplitItem>
              <SplitItem>
                <Title id="confilcts" headingLevel="h6" size="md">
                  {conflicts}
                </Title>
              </SplitItem>
            </Split>
          </FlexItem>
        )}
        {unknown > 0 && (
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>Unknown licenses:</SplitItem>
              <SplitItem>
                <Title id="unknown" headingLevel="h6" size="md">
                  {unknown}
                </Title>
              </SplitItem>
            </Split>
          </FlexItem>
        )}
      </Flex>
    </div>
  );
};

export default Licenses;

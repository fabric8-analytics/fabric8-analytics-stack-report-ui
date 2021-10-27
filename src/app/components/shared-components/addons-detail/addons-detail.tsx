import React from "react";
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import { ZoneIcon } from "@patternfly/react-icons";

type AddonsProps = {
  companion: number,
};

const Addons = ({ companion }: AddonsProps) => {
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
              <ZoneIcon className="icon-class" />
            </SplitItem>
            <SplitItem>
              <Title headingLevel="h6" size="md">
                Add-ons
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
      </Flex>
      <Flex key="2" direction={{ default: "column" }}>
        <FlexItem spacer={{ default: "spacerXs" }}>
          <Split hasGutter>
            <SplitItem>Companion Dependencies:</SplitItem>
            <SplitItem>
              <Title id="companion" headingLevel="h6" size="md">
                {companion}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
      </Flex>
    </div>
  );
};

export default Addons;

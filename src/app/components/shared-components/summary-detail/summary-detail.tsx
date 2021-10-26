import React from "react";
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Title,
} from "@patternfly/react-core";
import { CubeIcon, ExclamationCircleIcon } from "@patternfly/react-icons";

type DependencyProps = {
  analyzed: number,
  transitive: number,
  unknown: number,
};

const Dependency = ({ analyzed, transitive, unknown }: DependencyProps) => {
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
              <CubeIcon className="icon-class" />
            </SplitItem>
            <SplitItem>
              <Title headingLevel="h6" size="md">
                Dependency Details
              </Title>
            </SplitItem>
            {unknown > 0 && (
              <SplitItem>
                <ExclamationCircleIcon
                  id="unknown-deps-warning"
                  className="icon-class-exclamation"
                />
              </SplitItem>
            )}
          </Split>
        </FlexItem>
      </Flex>
      <Flex key="2" direction={{ default: "column" }}>
        <FlexItem spacer={{ default: "spacerXs" }}>
          <Split hasGutter>
            <SplitItem>Analysed dependencies:</SplitItem>
            <SplitItem>
              <Title id="analyzed-deps" headingLevel="h6" size="md">
                {analyzed}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        <FlexItem spacer={{ default: "spacerXs" }}>
          <Split hasGutter>
            <SplitItem>Transitive dependencies:</SplitItem>
            <SplitItem>
              <Title id="transitive-deps" headingLevel="h6" size="md">
                {transitive}
              </Title>
            </SplitItem>
          </Split>
        </FlexItem>
        {unknown > 0 && (
          <FlexItem spacer={{ default: "spacerXs" }}>
            <Split hasGutter>
              <SplitItem>Unknown dependencies:</SplitItem>
              <SplitItem>
                <Title id="unknown-deps" headingLevel="h6" size="md">
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

export default Dependency;

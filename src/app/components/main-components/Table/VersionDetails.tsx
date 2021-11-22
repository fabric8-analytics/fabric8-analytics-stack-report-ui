import { ChartDonut, ChartThemeColor } from "@patternfly/react-charts";
import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Split,
  SplitItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import React, { FC, useState } from "react";
import VulnerabilityCount from "../Overview/Overview";
import GithubStats from "../../shared-components/addons-primary/github_stats";
import { getVulnerabilitiesDetailsObj } from './Table'


function VersionDetails({ dep }: any) {

  const directVulnerabilitiesDetailsObj = getVulnerabilitiesDetailsObj(dep);
  const SummaryDonut = () => (
    <div style={{ height: "300px", width: "300px" }}>
    <ChartDonut
      ariaDesc="Security Issues"
      ariaTitle="Security Issues"
      constrainToVisibleArea
      colorScale={["#7D1007", "#C9190B", "#EC7A08", "#F0AB00", "#6A6E73"]}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
      data={[
        {
          x: "Critical",
          y: directVulnerabilitiesDetailsObj.critical,
        },
        { x: "High", y: directVulnerabilitiesDetailsObj.high },
        { x: "Medium", y: directVulnerabilitiesDetailsObj.medium },
        { x: "Low", y: directVulnerabilitiesDetailsObj.low },
          ]}
      subTitle="Total"
      title={directVulnerabilitiesDetailsObj.total.toString()}
      padding={{
                bottom: 0,
                left: 0,
                right: 140, // Adjusted to accommodate legend
                top: -100,
              }}
        width={280}
        />
    </div>
  );
  return (
        // @ts-ignore
    <Flex justifyContent={{ default: "justifyContentSpaceEvenly" }}>
      <FlexItem>
        <Split>
          <SplitItem>
            <Title headingLevel="h6" size="md" className="title">
              Latest Version
              <div>{dep.latest_version}</div>
            </Title>
            <br/>
          </SplitItem>
        </Split>
        <Split>
          <Title headingLevel="h6" size="md" >
            Licence(s) used
            <div>{dep.licenses}</div>
          </Title>
        </Split>
      </FlexItem>
      <FlexItem>
        <GithubStats
          contributors={Number(dep.github.contributors)}
          dependentRepos={Number(dep.github.dependent_repos)}
          usage={Number(dep.github.used_by.length)}
          forks={Number(dep.github.forks_count)}
          stars={Number(dep.github.stargazers_count)}
        />
      </FlexItem>
      <FlexItem>
          <Title headingLevel="h6" size="md" >
            Security Issues
          </Title>
        <SummaryDonut />
     </FlexItem>
  </Flex>
  );
}

export default VersionDetails;

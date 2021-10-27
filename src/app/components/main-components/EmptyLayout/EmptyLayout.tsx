import React, { useEffect, useState, useContext } from "react";
import {
  Title,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  PageSection,
  Page,
  Skeleton,
  Grid,
  GridItem,
  Card,
  CardBody,
  Backdrop,
  Bullseye,
  Spinner,
  Nav,
  NavItem,
  NavList,
  PageHeader,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/js/icons/cubes-icon";
import "./EmptyLayout.scss";

const PercentageWidths = () => (
  <div>
    <Skeleton width="100%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="95%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="85%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="75%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="65%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="55%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="45%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="35%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="25%" screenreaderText="Loading contents" />
    <br />
    <Skeleton width="15%" screenreaderText="Loading contents" />
    <br />
  </div>
);
type BasicProps = {
  Header: JSX.Element,
};
const Header = () => {
  const nav = <Nav variant="horizontal" />;
  return <PageHeader topNav={nav} />;
};

const Basic = () => (
  <Backdrop className="myBackdrop">
    <Page header={Header}>
      <PageSection height="1340px">
        <Grid hasGutter>
          <GridItem className="GridCard" span={6}>
            <PercentageWidths />
          </GridItem>
          <GridItem className="GridCard" span={6}>
            <PercentageWidths />
          </GridItem>
          <Bullseye>
            <Spinner className="Spinner" isSVG />
          </Bullseye>
          <GridItem span={12}>
            <PercentageWidths />
          </GridItem>
        </Grid>
      </PageSection>
    </Page>
  </Backdrop>
);
type Loader = {
  loading: boolean,
};
const CRDALoader = ({ loading }: Loader) => {
  if (loading) {
    return <Basic />;
  }
  return (
    <EmptyState>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel="h4" size="lg">
        Oops The Page you are Looking for Doesn’t Exists.
      </Title>
      <EmptyStateBody>
        This represents an the empty state. you can Try giving the proper Stack
        id.
      </EmptyStateBody>
      <Button variant="primary">Go Home</Button>
    </EmptyState>
  );
};

export default CRDALoader;

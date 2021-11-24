/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ExpandableRowContent,
  sortable,
} from "@patternfly/react-table";
import { SecurityIcon } from "@patternfly/react-icons";
import { ServerityColors } from "./TableInterfaces";
import Snyklogo from '../../../images/snyk.png'
// https://github.com/patternfly/patternfly-react/blob/master/packages/react-table/src/components/Table/examples/DemoSortableTable.js
import Context from "../../../store/context";
import DemoSortableTable from "./DemoSortableTable.js";
import VersionDetails from "./VersionDetails";
import VulnerabilitiesRowDetails from "./VulnerabilitiesRowDetails";
import "./Table.scss";
import DependencyCheck from "./DependencyCheck";

const Table = () => {
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);
  const [rowz, setRowz] = useState([]);
  const [activeChild, setActiveChild] = useState([null]);
  const [rows, setRows] = useState([]);
  const [childData, setChildDataTest] = useState({});
  useEffect(() => {
    const analyzedDependencies = globalState.APIData?.analyzed_dependencies;
    const rowData: ((prevState: never[]) => never[]) | any[][] = [];
    let childDataObj = {};
    // @ts-ignore
    analyzedDependencies?.sort((b, a) => {
      if (
        a.public_vulnerabilities.length + a.private_vulnerabilities.length <
        b.public_vulnerabilities.length + b.private_vulnerabilities.length
      ) {
        return -1;
      }
      if (
        a.public_vulnerabilities.length + a.private_vulnerabilities.length >
        b.public_vulnerabilities.length + b.private_vulnerabilities.length
      ) {
        return 1;
      }
      return 0;
    });
    
    analyzedDependencies?.forEach((dep: any, index: any) => {
      // eslint-disable-next-line no-console
      const tempRowData = [];
      const tempIssuesData = [];
      tempRowData.push(dep.name);
      if (
        dep.private_vulnerabilities.length ||
        dep.public_vulnerabilities.length ||
        dep.vulnerable_dependencies.length
      ) {
        tempIssuesData.push("Security Issues");
      }
      tempRowData.push(tempIssuesData);
      tempRowData.push(dep.version);

      const directVulnerabilitiesDetailsObj = getVulnerabilitiesDetailsObj(dep);
      const cumalativeTransitiveVulnerabilitiesDetailsObj = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        total: 0,
      };

      dep.vulnerable_dependencies?.forEach((transitiveDep: any, depIndex: any) => {
        const transitiveVulnerabilities = getVulnerabilitiesDetailsObj(transitiveDep);
        cumalativeTransitiveVulnerabilitiesDetailsObj.critical += transitiveVulnerabilities.critical;
        cumalativeTransitiveVulnerabilitiesDetailsObj.high += transitiveVulnerabilities.high;
        cumalativeTransitiveVulnerabilitiesDetailsObj.medium += transitiveVulnerabilities.medium;
        cumalativeTransitiveVulnerabilitiesDetailsObj.low += transitiveVulnerabilities.low;
        cumalativeTransitiveVulnerabilitiesDetailsObj.total+= transitiveVulnerabilities.total;
      });

      tempRowData.push(directVulnerabilitiesDetailsObj);
      tempRowData.push(cumalativeTransitiveVulnerabilitiesDetailsObj);
      if (dep.recommended_version !== "") {
        tempRowData.push(dep.recommended_version);
      } else {
        tempRowData.push("N/A");
      }
      rowData.push(tempRowData);
      
      const childRowData = directvulnerabilityDetails(dep, globalState.APIData?.registration_status);
      const transitiveChildRowData = transitiveVulnerabilityDetail(dep, globalState.APIData?.registration_status);
      const childArrayLength = index;
      const child = {
        [`${childArrayLength}_2`]: {
          // @ts-ignore
          component: <VersionDetails dep={dep} />,
        },
        [`${childArrayLength}_3`]: {
          component: (
            <DemoSortableTable
              columns={[
                {
                  title: "Direct Vulnerability",
                  transforms: [sortable],
                },
                "Severity",
                "Exploit Information",
                {
                  title: "CVSS Score",
                  transforms: [sortable],
                },
                "",
                "",
              ]}
              rows={childRowData}
            />
          ),
        },
        [`${childArrayLength}_4`]: {
          component: (
            <DemoSortableTable
              columns={[
                { title: "Transitive Vulnerability", transforms: [sortable] },
                "Severity",
                "CVSS Score",
                "Transitive dependency",
                "Exploit Information",
                "Current Version",
                "Latest Version"
              ]}
              rows={transitiveChildRowData}
            />
          ),
        },
      };
      // @ts-ignore
      childDataObj = { ...childDataObj, ...child };
    });
    // @ts-ignore
    setRows(rowData);
    // @ts-ignore
    setChildDataTest(childDataObj);
    // @ts-ignore
    setActiveChild(new Array(globalState.APIData?.analyzed_dependencies === undefined? 0:globalState.APIData?.analyzed_dependencies.length).fill(null));
  }, [globalState]);

  const columns = [
    "Dependencies",
    "Dependency Check",
    "Current Version",
    "Direct Vulnerabilities",
    "Transitive Vulnerabilities",
    "Recommended Version",
  ];

<<<<<<< HEAD
  // const rows = [
  //   [
  //     "aniso8601",
  //     ["Security Issues", "Exploit present", "Licence conflict"],
  //     "7.2.0",
  //     { critical: 3, high: 2, medium: 4, low: 2 },
  //     { critical: 1, high: 0, medium: 0, low: 4 },
  //     "9.0.1",
  //   ],
  //   [
  //     "Seville",
  //     [],
  //     "0.2.0",
  //     { critical: 0, high: 2, medium: 3, low: 2 },
  //     { critical: 1, high: 3, medium: 1, low: 4 },
  //     "0.3.1",
  //   ],
  // ];

  // index corresponds to row index, and value corresponds to column index of the expanded, null means no cell is expanded
  // key = row_col of the parent it corresponds to
  // const childData = {
  //   "0_2": {
  //     component: <VersionDetails />,
  //   },
  //   "0_3": {
  //     component: (
  //       <DemoSortableTable
  //         rows={[
  //           ["Man-in-the-Middle (MitMM)", "High", "8.8/10", "sny", ""],
  //           ["Cross site scripting (XSS)", "Medium", "5.5/10", "", ""],
  //         ]}
  //         columns={[
  //           { title: "Direct Vulnerability", transforms: [sortable] },
  //           "Severity",
  //           { title: "CVSS Score", transforms: [sortable] },
  //           "",
  //           "",
  //         ]}
  //       />
  //     ),
  //   },
  //   "0_4": {
  //     component: (
  //       <DemoSortableTable
  //         columns={[
  //           { title: "Transitive Vulnerability", transforms: [sortable] },
  //           "Severity",
  //           "CVSS Score",
  //           "Transitive dependency",
  //           "Current Version",
  //           "Latest Version",
  //         ]}
  //         rows={[
  //           [
  //             "XML External Entity (XXE) Injection",
  //             "High",
  //             "8.8/10",
  //             "com.fasterxml.jackson.core:jackson-databind",
  //             "4.8",
  //             "5.8",
  //           ],
  //           [
  //             "Remote Memory Exposure",
  //             "Medium",
  //             "5.8/10",
  //             "org.eclipse.jetty:jetty-server",
  //             "4.8",
  //             "5.1",
  //           ],
  //         ]}
  //       />
  //     ),
  //   },
  //   "1_2": {
  //     component: <VersionDetails />,
  //   },
  //   "1_3": {
  //     component: (
  //       <DemoSortableTable
  //         rows={[
  //           ["Man-in-the-Middle (MitM)", "High", "8.8/10", "", ""],
  //           ["Cross site scripting (XSS)", "Medium", "5.5/10", "", ""],
  //         ]}
  //         columns={[
  //           { title: "Direct Vulnerability", transforms: [sortable] },
  //           "Severity",
  //           { title: "CVSS Score", transforms: [sortable] },
  //           "",
  //           "",
  //         ]}
  //         id="compound-expansion-table-1_3"
  //         key="1_3"
  //       />
  //     ),
  //   },
  //   "1_4": {
  //     component: (
  //       <DemoSortableTable
  //         columns={[
  //           { title: "Transitive Vulnerability", transforms: [sortable] },
  //           "Severity",
  //           "CVSS Score",
  //           "Transitive dependency",
  //           "Current Version",
  //           "Latest Version",
  //         ]}
  //         rows={[
  //           [
  //             "XML External Entity (XXE) Injection",
  //             "High",
  //             "8.8/10",
  //             "com.fasterxml.jackson.core:jackson-databind",
  //             "4.8",
  //             "5.8",
  //           ],
  //           [
  //             "Remote Memory Exposure",
  //             "Medium",
  //             "5.8/10",
  //             "org.eclipse.jetty:jetty-server",
  //             "4.8",
  //             "5.1",
  //           ],
  //         ]}
  //         id="compound-expansion-table-1_4"
  //         key="1_4"
  //       />
  //     ),
  //   },
  // };

=======
>>>>>>> 7b513cc... display dependency information for all rows
  const customRender = (cell: {} | null | undefined, index: number) => {
    if (index === 0) {
      return <h6>{cell}</h6>;
    }
    if (index === 1) {
      // @ts-ignore
      return <DependencyCheck dependencyCheckArray={cell} />;
    }
    if (index === 2) {
      return <>{cell}</>;
    }
    if (index === 3) {
      // @ts-ignore
      return <VulnerabilitiesRowDetails {...cell} />;
    }
    if (index === 4) {
      // @ts-ignore
      return <VulnerabilitiesRowDetails {...cell} />;
    }
    if (index === 5) {
      return cell;
    }
    return cell;
  };
  const isCompoundExpanded = (rowIndex: number, cellIndex: number) => {
    // only columns 1 - 3 are compound expansion toggles in this example
    if (cellIndex >= 2 && cellIndex <= 4) {
      return activeChild[rowIndex] === cellIndex;
    }
    return null;
  };
  return (
    <TableComposable aria-label="Compound expandable table">
      <Thead>
        <Tr>
          {columns.map((column, columnIndex) => (
            <Th key={columnIndex}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      {rows?.map((row, rowIndex) => {
        const isRowExpanded = activeChild[rowIndex] !== null;
        return (
          <Tbody key={rowIndex} isExpanded={isRowExpanded}>
            <>
              <Tr>
                {/* @ts-ignore */}
                {row?.map((cell, cellIndex) => {
                  // for this example, only columns 1 - 3 are clickable
                  const compoundExpandParams =
                    cellIndex >= 2 && cellIndex <= 4
                      ? {
                          compoundExpand: {
                            isExpanded: isCompoundExpanded(rowIndex, cellIndex),
                            onToggle: () => {
                              if (activeChild[rowIndex] === cellIndex) {

                                // closing the expansion on the current toggle
                                // set the corresponding item to null
                                const updatedActiveChild = activeChild.map(
                                  (item, index) =>
                                    index === rowIndex ? null : item,
                                );
                                setActiveChild(updatedActiveChild);
                              } else {
                                // expanding
                                // set the corresponding cell index
                                const updatedActiveChild = activeChild.map(
                                  (item, index) =>
                                    index === rowIndex ? cellIndex : item,
                                );

                                // @ts-ignore
                                setActiveChild(updatedActiveChild);
                              }
                            },
                          },
                        }
                      : {};
                  return (
                    // @ts-ignore
                    <Td
                      key={`${rowIndex}_${cellIndex}`}
                      
                      dataLabel={columns[cellIndex]}
                      component={cellIndex === 0 ? "th" : "td"}
                      {...compoundExpandParams}
                    >
                      {customRender(cell, cellIndex)}
                    </Td>
                  );
                })}
              </Tr>
              {isRowExpanded && (
                <Tr key={`${rowIndex}-child`} isExpanded={isRowExpanded}>
                  <Td dataLabel={columns[0]} noPadding colSpan={6}>
                    <ExpandableRowContent>
                      {
                        // @ts-ignore
                        childData[`${rowIndex}_${activeChild[rowIndex]}`]
                          ?.component
                      }
                    </ExpandableRowContent>
                  </Td>
                </Tr>
              )}
            </>
          </Tbody>
        );
      })}
    </TableComposable>
  );
};

export function getVulnerabilitiesDetailsObj(dep: any) {
  const VulnerabilitiesDetailsObj = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    total: 0,
  };
  const allVuls = [
    ...dep.public_vulnerabilities,
    ...dep.private_vulnerabilities,
  ];
  if (allVuls.length) {
    let total = 0;
    allVuls.forEach((vul: { severity: any }) => {
      const { severity } = vul;
      if (severity === "critical") {
        VulnerabilitiesDetailsObj.critical += 1;
        total += 1;
      }
      if (severity === "high") {
        VulnerabilitiesDetailsObj.high += 1;
        total += 1;
      }
      if (severity === "medium") {
        VulnerabilitiesDetailsObj.medium += 1;
        total += 1;
      }
      if (severity === "low") {
        VulnerabilitiesDetailsObj.low += 1;
        total += 1;
      }
    });
    VulnerabilitiesDetailsObj.total = total;
  }
  return VulnerabilitiesDetailsObj;
}

function directvulnerabilityDetails(dep: any, registrationStatus: string) {
  const childRowData: any[][] = [];
      let totalVulnerabilities = [];
      if (registrationStatus === "FREETIER") {
        totalVulnerabilities = dep.public_vulnerabilities;
      } 
      else {
      totalVulnerabilities = [
        ...dep.public_vulnerabilities,
        ...dep.private_vulnerabilities,
      ];
    }
      const severityColors: ServerityColors = {};   
      severityColors.Critical = "#7D1007";
      severityColors.High = "#C9190B";
      severityColors.Medium = "#EC7A08";
      severityColors.Low = "#F0AB00";
      dep.public_vulnerabilities?.forEach(
        (vul: { title: any, severity: any, cvss: any, exploit: any }) => {
          const tempDepRowData = [];
          tempDepRowData.push(vul.title);
          const severity = vul.severity[0].toUpperCase() + vul.severity.slice(1);
          tempDepRowData.push(
           <div><SecurityIcon className="security-icon" color={severityColors[severity]}/>{severity}</div>,
          );
          tempDepRowData.push(vul.exploit)
          tempDepRowData.push(vul.cvss);
          childRowData.push(tempDepRowData);
        },
      );

      dep.private_vulnerabilities?.forEach(
        (vul: { title: any, severity: any, cvss: any, exploit: any }) => {
          const tempDepRowData = [];
          const vulnerability =<div>{vul.title}<img className="bitmap" id="imgHome" alt="snyk" src={Snyklogo} /></div>
          tempDepRowData.push(vulnerability);
          const severity = vul.severity[0].toUpperCase() + vul.severity.slice(1);
          tempDepRowData.push(
           <div><SecurityIcon className="security-icon" color={severityColors[severity]}/>{severity}</div>,
          );
          tempDepRowData.push(vul.exploit)
          tempDepRowData.push(vul.cvss);
          childRowData.push(tempDepRowData);
        },
      );
      return childRowData;

}

function transitiveVulnerabilityDetail(dep: any, registrationStatus: string) {
  const childRowData: any[][] = [];
  const severityColors: ServerityColors = {};   
  severityColors.Critical = "#7D1007";
  severityColors.High = "#C9190B";
  severityColors.Medium = "#EC7A08";
  severityColors.Low = "#F0AB00";
  dep.vulnerable_dependencies?.forEach((transitiveDep: any, depIndex: any) => {
      let totalVulnerabilities = [];
      if (registrationStatus === "FREETIER") {
        totalVulnerabilities = transitiveDep.public_vulnerabilities;
      } 
      else {
      totalVulnerabilities = [
        ...transitiveDep.public_vulnerabilities,
        ...transitiveDep.private_vulnerabilities,
      ];
    }

    transitiveDep.public_vulnerabilities?.forEach(
        (vul: { name: any, title: any, severity: any, cvss: any, exploit: any, version:any, latestversion: any }) => {
        const tempDepRowData = [];
          tempDepRowData.push(vul.title);
          const severity = vul.severity[0].toUpperCase() + vul.severity.slice(1);
          tempDepRowData.push(
           <div><SecurityIcon className="security-icon" color={severityColors[severity]}/>{severity}</div>,
          );
          tempDepRowData.push(vul.cvss);
          tempDepRowData.push(transitiveDep.name);
          tempDepRowData.push(vul.exploit);
          tempDepRowData.push(transitiveDep.version);
          tempDepRowData.push(transitiveDep.latest_version);
          childRowData.push(tempDepRowData);
        },
      );

      transitiveDep.private_vulnerabilities?.forEach(
        (vul: { name: any, title: any, severity: any, cvss: any, exploit: any, version:any, latestversion: any }) => {
          const tempDepRowData = [];
          const vulnerability =<div>{vul.title}<img className="bitmap" id="imgHome" alt="snyk" src={Snyklogo} /></div>
          tempDepRowData.push(vulnerability);
          const severity = vul.severity[0].toUpperCase() + vul.severity.slice(1);
          tempDepRowData.push(
           <div><SecurityIcon className="security-icon" color={severityColors[severity]}/>{severity}</div>,
          );
          tempDepRowData.push(vul.cvss);
          tempDepRowData.push(transitiveDep.name);
          tempDepRowData.push(vul.exploit);
          tempDepRowData.push(transitiveDep.version);
          tempDepRowData.push(transitiveDep.latest_version);
          childRowData.push(tempDepRowData);
        },
      );
    });
      return childRowData;
}

export default Table;
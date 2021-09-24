import React from "react";
import { render } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import SummaryCard from "../app/components/main-components/Summary/Summary";
import { GetStackDetails } from "../app/utils/apiCalls";
import Licenses from "../app/components/shared-components/licenses-detail/licenses-detail";

describe("Summary Card components Unit Tests ", () => {
  test("Should be able to render the Summary Card component", async () => {
    GetStackDetails("5264cdab4838457d9c7ce2a420039dd2", "valid-uuid");
    const component = shallow(<SummaryCard />);
    expect(component).toMatchSnapshot();
  });
  test("I Should be able to render the licenses component", async () => {
    const MocLicenseProps = { conflicts: 7, unknown: 8 };
    const component = shallow(<Licenses conflicts={0} unknown={0} />);
    component.setProps(MocLicenseProps);
    // expect(component.prop("unknown")).toBeDefined();
    expect(toJson(component)).toMatchSnapshot();
    expect(toJson(component.find("#unknown").children())).toBe(
      MocLicenseProps.unknown,
    );
    expect(toJson(component.find("#confilcts").children())).toBe(
      MocLicenseProps.conflicts,
    );
  });
});

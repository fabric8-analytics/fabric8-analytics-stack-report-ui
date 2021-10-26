import React from "react";
import { render } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import SummaryCard from "../app/components/main-components/Summary/Summary";
import { GetStackDetails } from "../app/utils/apiCalls";
import Licenses from "../app/components/shared-components/licenses-detail/licenses-detail";
import PoweredBySynk from "../app/components/shared-components/powerd-by/powerd-by";
import SignUp from "../app/components/shared-components/synk-signup/synk-signup";
import BTSynktoken from "../app/components/shared-components/synk-token-button/synk-token-button";
import Dependency from "../app/components/shared-components/summary-detail/summary-detail";
import Security from "../app/components/shared-components/security-detail/security-detail";
import Addons from "../app/components/shared-components/addons-detail/addons-detail";

describe("Summary Card components Unit Tests ", () => {
  test("Should be able to render the Summary Card component", async () => {
    GetStackDetails("5264cdab4838457d9c7ce2a420039dd2", "valid-uuid");
    const component = shallow(<SummaryCard />);
    expect(component).toMatchSnapshot();
  });
  describe("I Should be able to render the licenses component", () => {
    test("I Should be able to render the licenses component", async () => {
      const MocLicenseProps = { conflicts: 7, unknown: 8 };
      const component = shallow(<Licenses conflicts={0} unknown={0} />);
      component.setProps(MocLicenseProps);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#unknown").children())).toBe(
        MocLicenseProps.unknown,
      );
      expect(toJson(component.find("#confilcts").children())).toBe(
        MocLicenseProps.conflicts,
      );
    });
    test("Warning sign is shown when conflicts is greater", async () => {
      const component = shallow(<Licenses conflicts={7} unknown={0} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(
        toJson(component.find("#warning-conflicts-unknown")),
      ).toBeDefined();
    });
    test("Warning sign is shown when unknown is greater", async () => {
      const component = shallow(<Licenses conflicts={0} unknown={7} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(
        toJson(component.find("#warning-conflicts-unknown")),
      ).toBeDefined();
    });
    test("Warning sign is not shown when unknown/conflicts is zero", async () => {
      const component = shallow(<Licenses conflicts={0} unknown={0} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#warning-conflicts-unknown"))).toBe(null);
    });
  });
  describe("I should be able to render the snyk logo", () => {
    test("Render Powered By Snyk Component", async () => {
      const component = shallow(<PoweredBySynk />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#imgHome"))).toBeDefined();
    });
  });
  describe("I should be able to render the security component", () => {
    test("Render Basic Security component", async () => {
      const SecurityProps = { vulnerablities: 5, vulnerable: 3 };
      const component = shallow(<Security vulnerablities={0} vulnerable={0} />);
      component.setProps(SecurityProps);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#vulnerablities").children())).toBe(
        SecurityProps.vulnerablities,
      );
      expect(toJson(component.find("#vulnerable").children())).toBe(
        SecurityProps.vulnerable,
      );
      expect(toJson(component.find("#warning-security"))).toBeDefined();
    });
    test("I should see no warning when component has no vulns/vulnerable", async () => {
      const component = shallow(<Security vulnerablities={0} vulnerable={0} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#warning-security"))).toBe(null);
    });
  });
  describe("Summary Addons Test", () => {
    test("I should be able to render Addons Card", async () => {
      const AddonsProps = { companion: 1 };
      const component = shallow(<Addons companion={0} />);
      component.setProps(AddonsProps);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#companion").children())).toBe(
        AddonsProps.companion,
      );
    });
  });
  describe("snyk signup button test", () => {
    test("I should be able to render the sign up component and check for signup btn", async () => {
      const component = shallow(<SignUp isUUID={false} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#snyk-sign-up-btn"))).toBeDefined();
    });
    test("I should be able to see no snyk btn when uuid is not set", async () => {
      const component = shallow(<SignUp isUUID />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#snyk-sign-up-btn"))).toBe(null);
    });
  });
  describe("Dependency component tests", () => {
    test("I should be able to render the Dependency component", async () => {
      const DependencyProps = { analyzed: 5, transitive: 100, unknown: 0 };
      const component = shallow(
        <Dependency analyzed={0} transitive={0} unknown={0} />,
      );
      component.setProps(DependencyProps);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#transitive-deps").children())).toBe(
        DependencyProps.transitive,
      );
      expect(toJson(component.find("#analyzed-deps").children())).toBe(
        DependencyProps.analyzed,
      );
      // unknown should not be shown if zero
      expect(toJson(component.find("#unknown-deps"))).toBe(null);
    });
    test("I should be able to render the Dependency component with unknowns", async () => {
      const DependencyProps = { analyzed: 5, transitive: 100, unknown: 5 };
      const component = shallow(
        <Dependency analyzed={0} transitive={0} unknown={0} />,
      );
      component.setProps(DependencyProps);
      expect(toJson(component)).toMatchSnapshot();
      // i should see unknowns count
      expect(toJson(component.find("#unknown-deps").children())).toBe(
        DependencyProps.unknown,
      );
      // i should see the warning
      expect(toJson(component.find("#unknown-deps-warning"))).toBeDefined();
    });
  });
  describe("Sign up button and Modal Tests", () => {
    test("[un-registered user] I should be able to render he Sign up button Component", async () => {
      const component = shallow(<BTSynktoken isUUID={false} />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#yellow-sign-btn"))).toBeDefined();
    });
    test("[registered user] I should be able to render he Sign up button Component", async () => {
      const component = shallow(<BTSynktoken isUUID />);
      expect(toJson(component)).toMatchSnapshot();
      expect(toJson(component.find("#green-sign-btn"))).toBeDefined();
    });
    // TODO: implement Modal Tests
  });
});

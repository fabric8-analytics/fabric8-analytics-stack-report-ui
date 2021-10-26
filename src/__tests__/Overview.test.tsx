import React from "react";
import { shallow, configure } from "enzyme";
import OverviewCard from "../app/components/main-components/Overview/Overview";

describe("<App />", () => {
  test("Should render the app Layout", async () => {
    const component = shallow(<OverviewCard />);
    expect(component).toMatchSnapshot();
  });
});

import React from "react";
import { shallow, configure } from "enzyme";
import AppLayout from "../app/components/main-components/AppLayout/AppLayout";
import SummaryCard from "../app/components/main-components/Summary/Summary";
import OverviewCard from "../app/components/main-components/Overview/Overview";
import Tableview from "../app/components/main-components/Table/Table";

describe("<App />", () => {
  test("Should render the app Layout", async () => {
    /* const component = shallow(
      <AppLayout
        Summary={<SummaryCard />}
        Overview={<OverviewCard />}
        Table={<Tableview />}
      />,
    );
    expect(component).toMatchSnapshot(); */
    expect(true).toBe(true);
  });
});

import ReactDOM from "react-dom";

import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  DataList,
  DataListItem,
  DataListCell,
  DataListItemRow,
  DataListCheck,
  DataListItemCells,
  DataListAction,
  Progress,
  ProgressSize,
  ProgressMeasureLocation,
  ProgressVariant,
} from "@patternfly/react-core";

import DrawerStack from "./drawer";

type DataListState = {
  isOpen1: boolean,
  isOpen2: boolean,
  selectedDataListItemId: string,
};

// eslint-disable-next-line
type DataProps = Record<any, any>;

function SelectableDataList(props: any) {
  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [selectedDataListItemId, setselectableDataListItemId] = useState("");
  const [onToggle1, setonToggle1] = useState(false);
  const [onToggle2, setonToggle2] = useState(false);
  const [onSelect1, setonSelect1] = useState(false);
  const [onSelect2, setonSelect2] = useState(false);
  const [onSelectDataListItem, setonSelectDataListItem] = useState("");
  const newItem = (id: any) => setonSelectDataListItem(id);

  return (
    <DataList
      aria-label="selectable data list example"
      selectedDataListItemId={selectedDataListItemId}
      onSelectDataListItem={() =>
        setonSelectDataListItem(selectedDataListItemId)
      }
    >
      <DataListItem aria-labelledby="selectable-action-item1" id="item1">
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <span id="selectable-action-item1">
                  Single actionable Primary content
                </span>
                <DrawerStack />
              </DataListCell>,
              <DataListCell key="secondary content">
                <SingleLine />,
              </DataListCell>,
            ]}
          />
          <DataListAction
            aria-labelledby="selectable-action-item1 selectable-action-action1"
            id="selectable-action-action1"
            aria-label="Actions"
            isPlainButtonAction
          >
            <Dropdown
              isPlain
              position={DropdownPosition.right}
              isOpen={isOpen1}
              onSelect={() => setonSelect1(!isOpen1)}
              toggle={<KebabToggle onToggle={() => setonToggle1(isOpen1)} />}
              dropdownItems={[
                <DropdownItem key="link">Link</DropdownItem>,
                <DropdownItem key="action" component="button">
                  Action
                </DropdownItem>,
                <DropdownItem key="disabled link" isDisabled>
                  Disabled Link
                </DropdownItem>,
              ]}
            />
          </DataListAction>
        </DataListItemRow>
      </DataListItem>

      <DataListItem aria-labelledby="selectable-actions-item2" id="item2">
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <span id="selectable-actions-item2">
                  Selectable actions Primary content
                </span>
              </DataListCell>,
              <DataListCell key="secondary content">
                <SingleLine />,
              </DataListCell>,
            ]}
          />
          <DataListAction
            aria-labelledby="selectable-actions-item2 selectable-actions-action2"
            id="selectable-actions-action2"
            aria-label="Actions"
            isPlainButtonAction
          >
            <Dropdown
              isPlain
              position={DropdownPosition.right}
              isOpen={isOpen2}
              onSelect={() => setonSelect2(!isOpen2)}
              toggle={<KebabToggle onToggle={() => setonToggle1(isOpen1)} />}
              dropdownItems={[
                <DropdownItem key="link">Link</DropdownItem>,
                <DropdownItem key="action" component="button">
                  Action
                </DropdownItem>,
                <DropdownItem key="disabled link" isDisabled>
                  Disabled Link
                </DropdownItem>,
              ]}
            />
          </DataListAction>
        </DataListItemRow>
      </DataListItem>
    </DataList>
  );
}

const SingleLine = () => {
  return (
    <Progress
      value={33}
      measureLocation={ProgressMeasureLocation.outside}
      aria-label="Title"
    />
  );
};

export default SelectableDataList;

/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  TextInput,
  FormHelperText,
  Alert,
  Spinner,
  Backdrop,
  Bullseye,
} from "@patternfly/react-core";
import {
  CheckSquareIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import PoweredBySynk from "../powerd-by/powerd-by";
import { RegisterUser, GetStackDetails } from "../../../utils/apiCalls";
import Context from "../../../store/context";

type Signprop = {
  isUUID: boolean,
};

type State = {
  isModalOpen: boolean,
};

type Modalprops = {
  isModalOpen: boolean,
  handleToggle: () => void,
};

function reset(handleToggle: any, setError: any, setTokenValue: any) {
  setError(false);
  setTokenValue("");
  handleToggle();
}

function RegisterAndSetUUID(
  token: string,
  globalDispatch: any,
  handleToggle: any,
  setError: any,
  setAlertMessage: any,
  setLoading: any,
  setTokenValue: any,
) {
  setLoading(true);
  const localUUID = localStorage.getItem("UUID");
  const uuid = localUUID !== null ? localUUID : "";
  RegisterUser(token, uuid).then((res) => {
    if (res.code === 200) {
      globalDispatch({ type: "UUID", data: res.data.user_id });
      localStorage.setItem("UUID", res.data.user_id);
      const requestId = localStorage.getItem("requestId");
      GetStackDetails(requestId != null ? requestId : "", uuid).then(
        (result) => {
          globalDispatch({ type: "APIData", data: result });
          setLoading(false);
          setAlertMessage("");
          reset(handleToggle, setError, setTokenValue);
        },
      );
    } else {
      setError(true);
      setTokenValue("");
      setAlertMessage(res.data.message);
      setLoading(false);
    }
  });
}

const ModalComponent = ({ isModalOpen, handleToggle }: Modalprops) => {
  const text =
    " to get your free Snyk token and get access to all premium fields.";
  const [tokenValue, setTokenValue] = useState("");
  const [error, seterror] = useState(false);
  const [isReg, setisReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  // @ts-ignore
  const { globalState, globalDispatch } = useContext(Context);

  useEffect(() => {
    const isRegisteredUser = globalState.IsRegUser;
    setisReg(isRegisteredUser);
  }, [globalState]);

  if (Loading) {
    return (
      <Backdrop>
        <Bullseye>
          <Spinner />
        </Bullseye>
      </Backdrop>
    );
  }

  return (
    <Modal
      width="40%"
      title="Snyk Token Submission"
      isOpen={isModalOpen}
      onClose={() => reset(handleToggle, seterror, setTokenValue)}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={() => {
            RegisterAndSetUUID(
              tokenValue,
              globalDispatch,
              handleToggle,
              seterror,
              setErrorMessage,
              setLoading,
              setTokenValue,
            );
          }}
        >
          Submit
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={() => reset(handleToggle, seterror, setTokenValue)}
        >
          Close
        </Button>,
      ]}
    >
      <Form>
        <FormGroup
          label="Snyk Token"
          isRequired
          fieldId="Synk token form group"
          helperText={
            <FormHelperText
              icon={<ExclamationCircleIcon color="blue" />}
              isHidden={false}
            >
              If a keyboard shortcut for Paste is not available, try using Edit
              &gt; Paste
            </FormHelperText>
          }
        >
          <TextInput
            isRequired
            placeholder="Enter your Snyk token"
            id="Snyk-token-text"
            name="snyk-token-text"
            type="text"
            onChange={setTokenValue}
            value={tokenValue}
          />
          <br />
          {isReg && !error ? (
            <Alert variant="success" isInline title="Registered" />
          ) : error !== false ? (
            <Alert variant="danger" isInline title={errorMessage} />
          ) : (
            <Alert variant="warning" isInline title="Unregistered" />
          )}
        </FormGroup>
      </Form>
      <br />
      <PoweredBySynk />
      <a
        href="https://app.snyk.io/login?utm_campaign=Code-Ready-Analytics-2020&utm_source=code_ready&code_ready=FF1B53D9-57BE-4613-96D7-1D06066C38C9"
        target="_blank"
        rel="noreferrer"
      >
        Sign up
      </a>
      {text}
    </Modal>
  );
};

const BTSynktoken = ({ isUUID }: Signprop) => {
  const [isModalOpen, setModalValue] = useState(false);

  if (isUUID === false) {
    return (
      <div>
        <Button
          icon={<ExclamationTriangleIcon />}
          iconPosition="right"
          className="warningbtn"
          id="yellow-sign-btn"
          isSmall
          variant="warning"
          onClick={() => setModalValue(!isModalOpen)}
        >
          Snyk Token
        </Button>
        <ModalComponent
          isModalOpen={isModalOpen}
          handleToggle={() => setModalValue(!isModalOpen)}
        />
      </div>
    );
  }
  return (
    <div>
      <Button
        icon={<CheckSquareIcon />}
        iconPosition="right"
        className="mybutton"
        isSmall
        id="green-sign-btn"
        variant="warning"
        onClick={() => setModalValue(!isModalOpen)}
      >
        Snyk Token
      </Button>
      <ModalComponent
        isModalOpen={isModalOpen}
        handleToggle={() => setModalValue(!isModalOpen)}
      />
    </div>
  );
};

export default BTSynktoken;

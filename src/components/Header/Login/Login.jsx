import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
// import { AppContext } from "../../App";
import { withAuth } from "../../../hoc/withAuth";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  render() {
    const { showModal } = this.props.auth;
    const { toggleShowLogin } = this.props.authActions;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleShowLogin}
        >
          Login
        </button>

        <Modal isOpen={showModal} toggle={toggleShowLogin} {...this.props}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default withAuth(Login);

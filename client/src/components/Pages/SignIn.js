import React from "react";
import { Route } from "react-router-dom";

import gqlFetch from "../../utils/gqlFetch";

import Menu from "../Elements/Menu";
import Navbar from "../Elements/Navbar";
import Sidebar from "../Elements/Sidebar";

import Awards from "../SecurePages/Awards";
import Certifications from "../SecurePages/Certifications";
import Education from "../SecurePages/Education";
import GoalsObjectives from "../SecurePages/GoalsObjectives";
import NewGoal from "../SecurePages/Goals/NewGoal";
import Skills from "../SecurePages/Skills";
import Summary from "../SecurePages/Summary";
import WorkHistory from "../SecurePages/WorkHistory";

class SignIn extends React.Component {
  state = {
    id: "5bc730206fa804038634de7d",
    singinName: ""
  };

  componentDidMount() {
    this.nameLookup();
  };

  nameLookup = () => {
    const query = 
    `query Employee($id: ID) {
      employee(id: $id) {
        firstName
        lastName
      }
    }`
    gqlFetch.fetchById(this.state.id, query)
      .then(res => res.json())
      .then(res => this.setState({ singinName: res.data.employee.firstName }));
  };
  
  render() {
    return (
      <>
        <Navbar
          imageSrc={"images/mycompany.png"}
          imageAlt={"My Company Logo"}
          navLinks={["home", "profile", "signout"]}
          signIn={false}
          userName={this.state.singinName}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex align-items-start">
              <Sidebar />
              <Menu />
              <div>
                <Route exact path="/signin/summary"   render={() => <Summary id={this.state.id} />} />
                <Route exact path="/signin/education" component= { Education }      />
                <Route exact path="/signin/awards"    component= { Awards }         />
                <Route exact path="/signin/certs"     component= { Certifications } />
                <Route exact path="/signin/goals"     component= { GoalsObjectives }/>
                <Route exact path="/signin/skills"    component= { Skills }         />
                <Route exact path="/signin/whistory"  component= { WorkHistory }    />
                <Route exact path="/signin/newgoal"   component= { NewGoal }        />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }; 
};

export default SignIn;
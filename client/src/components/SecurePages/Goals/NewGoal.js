import React from 'react';
import Navbar from '../../Elements/Navbar'
import Menu from '../../Elements/Menu'
import NewGoalHeader from './NewGoalHeader';
import EmpList from  './EmpList';
import Specific from './Specific';
import Measurable from './Measurable';
import Actions from './Actions';
import Relevant from './Relevant';
import Time from './Time';
import Bam from './Bam';

const NewGoal = () => (
  <div>
    <Navbar
      imageSrc={"../images/mycompany.png"}
      imageAlt={"My Company Logo"}
      navLinks={["home", "profile", "signout"]}
      signIn={false}
      userName={"Dan"}
    />
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Menu />
        </div>
        <div className="col-sm-10">
          <NewGoalHeader />
          <EmpList />
          <Specific />
          <Measurable />
          <Actions />
          <Relevant />
          <Time />
          <Bam />
        </div>
      </div>

    </div>
  </div>
)

export default NewGoal;
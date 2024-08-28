import React from "react";
import Navbar from "../Navbar";
import Templates from "../TemplatesComponents/Index";
import RequestForm from "../../Utils/RequestForm";


export default function Dashboard() {
  return (
    <div>
  
      <RequestForm title="Create An Account" cancelBtn={true} />
      {/* <RequestForm/> */}
      

    </div>
  );
}

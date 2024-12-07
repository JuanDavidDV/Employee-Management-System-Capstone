import { useEffect, useState } from "react";
import axios from "axios";


const baseUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [salaryTotal, setSalaryTotal] = useState();
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();

  const numAdmins = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/dashboard");
      console.log(data);
      setAdminCount(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    numAdmins();
  }, []);

  return (
<section>
  <div className="p-3 d-flex flex-wrap justify-content-around mt-3">
    <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h4>Salary</h4>
      </div>
      <hr />
      <div>
        <h5>Total: </h5>
      </div>
    </div>

    <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h4>Administrators</h4>
      </div>
      <hr />
      <div>
        <h5>Total: {adminCount} </h5>
      </div>
    </div>

    <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h4>Employees</h4>
      </div>
      <hr />
      <div>
        <h5>Total: </h5>
      </div>
    </div>
  </div>
</section>

  )
}

export default Dashboard;

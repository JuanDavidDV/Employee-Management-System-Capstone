import { useParams } from "react-router";
import { useState, useEffect } from "react";

const EmployeeInformation = () => {
  const {id} = useParams();

  const fetchEmployee = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/employee/information/" + id);
      console.log(data)
      
    }
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <section>
      helloghnm
    </section>
  )
};

export default EmployeeInformation;

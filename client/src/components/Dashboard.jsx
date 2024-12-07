const Dashboard = () => {
  return (
<section>
  <div className="p-3 d-flex flex-wrap justify-content-around mt-3">
    <div className="px-3 pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h3>Salary</h3>
      </div>
      <hr />
      <div>
        <h4>Total: </h4>
      </div>
    </div>

    <div className="px-3 pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h3>Administrators</h3>
      </div>
      <hr />
      <div>
        <h4>Total: </h4>
      </div>
    </div>

    <div className="px-3 pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <h3>Employees</h3>
      </div>
      <hr />
      <div>
        <h4>Total: </h4>
      </div>
    </div>
  </div>
</section>

  )
}

export default Dashboard;

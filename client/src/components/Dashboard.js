import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
		if (!user.isAuthenticated || !user.user.role === "user") {
      navigate("/");
    }
	}, []);

  

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;
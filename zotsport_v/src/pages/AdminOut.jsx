import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function AdminOut() {
  const { logOut } = useContext(CartContext);

  const navigate = useNavigate();

  logOut();
  navigate("/");
  return null;
}

export default AdminOut;

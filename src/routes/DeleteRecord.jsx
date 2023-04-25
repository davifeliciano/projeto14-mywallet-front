import axios from "axios";
import { redirect } from "react-router-dom";
import { getToken } from "../utils/sessionUtils";

export async function action({ params }) {
  const { id } = params;
  const token = getToken();
  const config = { headers: { authorization: `Bearer ${token}` } };

  try {
    await axios.delete(`/transactions/${id}`, config);
    return redirect("/home");
  } catch (err) {
    if (err.response.status === 401) {
      return redirect("/?reason=denied");
    }

    throw err;
  }
}

import axios from "axios";
import {_token} from "../components/utils";

export const _get_meetings = async () => {
  try {
    return await axios
      .get("https://api.cluster.dyte.in/v2/meetings", {headers: {Authorization: `Basic ${_token}`}})
      .then(({data}) => data);
  } catch (err) {
    console.log(err);
  }
};

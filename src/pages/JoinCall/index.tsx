import {useEffect, useState} from "react";
import axios from "axios";
import {useDyteClient} from "@dytesdk/react-web-core";
import {DyteMeeting} from "@dytesdk/react-ui-kit";
import {_token} from "../../components/utils";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {_getMeetings, _showNotif} from "../../store/meetings/actions";

export default function JoinCall() {
  const [meetId, setMeetId] = useState("");
  const [token, setToken] = useState("");
  const [meeting, initMeeting] = useDyteClient();
  const {meetId: existingMeetId} = useParams();
  let clientId = crypto.randomUUID();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Boolean(existingMeetId)) {
      // @ts-ignore
      setMeetId(existingMeetId);
      return;
    }

    axios.post("https://api.cluster.dyte.in/v2/meetings", {
      title: "Customer support - " + crypto.randomUUID(),
    }, {
      headers: {
        Authorization: `Basic ${_token}`,
      },
    })
      .then(({data}) => {
        setMeetId(data.data.id);
      });
  }, []);

  useEffect(() => {
    if (!Boolean(meetId)) return;

    axios.post(`https://api.cluster.dyte.in/v2/meetings/${meetId}/participants`, {
      name: "Enter your name...",
      preset_name: "group_call_host",
      client_specific_id: clientId,
    }, {
      headers: {
        Authorization: `Basic ${_token}`,
        "Content-Type": "application/json",
      },
    })
      .then(({data}) => {
        setToken(data.data.token);
        dispatch(_getMeetings());
        dispatch(_showNotif());
      });
  }, [meetId]);

  useEffect(() => {
    if (!Boolean(token)) return;
    initMeeting({
      authToken: token,
    });
  }, [token]);

  return <DyteMeeting meeting={meeting!}/>;
}

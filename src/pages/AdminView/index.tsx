import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  HStack,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Key, useEffect, useState } from "react";
import { _token } from "../../components/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  _getMeetings,
  _hideNotif,
  _showNotif,
} from "../../store/meetings/actions";
import { io } from "socket.io-client";

// const ENDPOINT = "https://dyte-webhook-tut.r0nz-29.repl.co";
const ENDPOINT = "https://dyte-webhook.onrender.com";

export default function AdminView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [meeting, setMeeting] = useState({ title: null, id: null });
  const { showNotification } = useSelector((state: any) => state.meetings);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connection", () => console.log("connected"));
    socket.on("new_meet", (data) => {
      console.log(data);
      setMeeting(data.meeting);
      dispatch(_showNotif());
    });

    return function cleanup() {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!showNotification) return;
    toast({
      title: "New Meeting started",
      description: "A client has created a meeting",
      status: "info",
      isClosable: true,
      duration: 100000000,
      position: "bottom",
      onCloseComplete: () => {
        dispatch(_hideNotif());
      },
    });
  }, [showNotification]);

  function handleClick(id: Key | null | undefined) {
    navigate("/join-call/" + id);
  }

  if (!!meeting.id && !!meeting.title) {
    return (
      <Box>
        <Container>
          {
            // @ts-ignore
            !!meeting ? (
              <Card my={4}>
                <CardBody>
                  <HStack justifyContent="space-between">
                    <Text>{meeting.title || meeting.id}</Text>
                    <Button
                      colorScheme="blue"
                      onClick={(e) => handleClick(meeting.id)}
                    >
                      Join
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            ) : (
              <Progress isIndeterminate={true} isAnimated={true} />
            )
          }
        </Container>
      </Box>
    );
  } else {
    return (
      <Box>
        <Container>
          <Text fontSize="4xl">No active meetings yet</Text>
        </Container>
      </Box>
    );
  }
}

import React from "react";
import CreateEvent from "../components/ui/create-event";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditEventPage = () => {
  const { id } = useParams();

  const eventInfo = useSelector((state) => state.events.currentEvent);

  return <CreateEvent id={id} path={"update"} eventData={eventInfo} />;
};

export default EditEventPage;

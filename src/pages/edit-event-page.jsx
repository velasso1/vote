import React, { useEffect } from "react";
import CreateEvent from "../components/ui/create-event";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentEvent } from "../store/slices/events";

const EditEventPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCurrentEvent(id));
  }, []);

  const eventInfo = useSelector((state) => state.events.currentEvent);

  return <CreateEvent id={id} path={"update"} eventData={eventInfo} />;
};

export default EditEventPage;

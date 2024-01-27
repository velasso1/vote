import React from "react";
import { useSelector } from "react-redux";
import DataNotFound from "../components/ui/data-not-found";

const EventsChecker = (Component) => {
  return () => {
    //   const events = useSelector((state) => state.events.events);
    const events = [];

    return events.length ? <Component events={events} /> : <DataNotFound />;
  };
};

export default EventsChecker;

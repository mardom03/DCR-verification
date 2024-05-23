import { useState, useEffect } from "react";
import "../styles/rightSidebar.css";

function RightSidebar({ selectedEventId, events, updateEventLabel, setEvents }) {
  const [newLabel, setNewLabel] = useState("");
  // const [pending, setPending] = useState(false);

  useEffect(() => {
    if (selectedEventId) {
      setNewLabel(events.find((event) => event.id === selectedEventId).label);
    }
  }, [selectedEventId]);

  function updateLabel(e) {
    const updatedLabel = e.target.value;
    setNewLabel(updatedLabel);
    updateEventLabel(selectedEventId, updatedLabel);
  }


  function handleSubmit(e) {
    e.preventDefault();
  }

  function handlePending() {
    setEvents(events.map((event) => event.id === selectedEventId ? {...event, pending: !event.pending} : event))
  }

  function handleIncluded() {
    setEvents(events.map((event) => event.id === selectedEventId ? {...event, included: !event.included} : event))
  }

  function handleExecuted() {
    setEvents(events.map((event) => event.id === selectedEventId ? {...event, executed: !event.executed} : event))
  }

  function toggleEventProperty(property) {
    setEvents(events.map(event =>
      event.id === selectedEventId ? { ...event, [property]: !event[property] } : event
    ));
  }

  return (
    <div className="right-sidebar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputField">Label</label>
        <input
          type="text"
          value={newLabel}
          onChange={updateLabel}
          id="inputField"
          className="input-field"
        />
      </form>
      <ul className="event-properties">
        <li><input type="checkbox"
                   checked={events.find((event) => event.id === selectedEventId) ? events.find((event) => event.id === selectedEventId).pending : false }
                   onChange={handlePending}
                   />Pending</li>
        <li><input type="checkbox"
                  checked={events.find((event) => event.id === selectedEventId) ? events.find((event) => event.id === selectedEventId).included : false}
                  onChange={handleIncluded}
                  />Included</li>
        <li><input type="checkbox"
                  checked={events.find((event) => event.id === selectedEventId) ? events.find((event) => event.id === selectedEventId).executed : false}
                  onChange={handleExecuted}
                  />Executed</li>
      </ul>
      
    </div>
  );
}

export default RightSidebar;

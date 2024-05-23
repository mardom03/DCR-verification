import { useState } from "react";
import { execute, getEnabled } from "../../BitDCRAlign-main/src/bitAlign";
import {
  bitDCRtoLabelDCR,
  bitGraphToGraphPP,
  dcrToBitDCR,
  bitToRegularDCR,
} from "../../BitDCRAlign-main/src/utility";
import { convertToDCRGraph } from "../utils";
import TestsSidebar from "./TestsSidebar";
import SimulatorSidebar from "./SimulatorSidebar";

function Simulator({ events, relations, tests, setTests, testsActive }) {
  const [trace, setTrace] = useState([]);
  const [simulatorState, setSimulatorState] = useState({
    currDCRGraph: convertToDCRGraph(events, relations),
    enabledEvents:
      events.length == 0
        ? new Set()
        : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
  });
  const [simulationValid, setsimulationValid] = useState(true);

  function eventClick(event) {
    setTrace([...trace, event.label]);
    if (!simulationValid) return;
    if (!simulatorState.enabledEvents.has(event.label)) {
      setsimulationValid(false);
      return;
    }
    const graph = bitGraphToGraphPP(
      bitDCRtoLabelDCR(dcrToBitDCR(simulatorState.currDCRGraph))
    );
    execute(event.label, graph);
    const {
      labels,
      labelMap,
      labelMapInv,
      conditions,
      includesFor,
      excludesFor,
      ...DCRGraph
    } = graph;
    setSimulatorState({
      currDCRGraph: bitToRegularDCR(DCRGraph),
      enabledEvents: getEnabled(DCRGraph),
    });
  }

  function clearSimulation() {
    setSimulatorState({
      currDCRGraph: convertToDCRGraph(events, relations),
      enabledEvents:
        events.length == 0
          ? new Set()
          : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
    });
    setsimulationValid(true);
    setTrace([]);
  }

  function addTest() {
    setTests([
      ...tests,
      {
        name: `Test${tests.length + 1}`,
        polarity: "+",
        trace: trace,
        context: new Set(
          events.map((event) => {
            return event.label;
          })
        ),
        status: true,
      },
    ]);
  }

  return (
    <div className="simulator">
      <div className="simulator-canvas">
        {trace.map((event, index) => (
          <div key={index}>{event}</div>
        ))}
      </div>
      <div>
        {testsActive ? (
          <TestsSidebar tests={tests} />
        ) : (
          <SimulatorSidebar
            events={events}
            simulatorState={simulatorState}
            simulationValid={simulationValid}
            eventClick={eventClick}
            clearSimulation={clearSimulation}
            addTest={addTest}
          />
        )}
      </div>
    </div>
  );
}

export default Simulator;

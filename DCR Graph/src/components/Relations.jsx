import { Arrow } from "react-konva";
import { RELATION_TYPES } from "../RelationTypes";

function Relations({ relations, setArrowEndpoints }) {
  function setArrowEndpoints(fromEvent, toEvent, type) {
    const shift =
      type === RELATION_TYPES.CONDITION
        ? 0
        : type === RELATION_TYPES.RESPONSE
        ? -10
        : type === RELATION_TYPES.INCLUDE
        ? 10
        : type === RELATION_TYPES.MILESTONE
        ? -20
        : 20;

    const eventWidth = 80;
    const eventHeight = 100;




    const fromX = fromEvent.position.x + eventWidth / 2;
    const fromY = fromEvent.position.y + eventHeight / 2;

    const toX = toEvent.position.x + eventWidth / 2;
    const toY = toEvent.position.y + eventHeight / 2;

    const angle = Math.atan2(toY - fromY, toX - fromX);

    // let fromArrowX = fromX + (Math.cos(angle) * eventWidth) / 2;
    // let fromArrowY = fromY + (Math.sin(angle) * eventHeight) / 2;
    // let toArrowX = toX - (Math.cos(angle) * eventWidth) / 2;
    // let toArrowY = toY - (Math.sin(angle) * eventHeight) / 2;

    let fromArrowX = fromX;
    let fromArrowY = fromY;
    let toArrowX = toX;
    let toArrowY = toY;


    if (angle <= 0.25*Math.PI && angle >= -0.25*Math.PI){ // Right Side
      fromArrowY = fromY + shift;
      fromArrowX = fromX + eventWidth/2;
      toArrowX = toX - eventWidth/2;
      toArrowY = toY + shift;
    }
    else if (angle >= 0.25*Math.PI && angle <= 0.75*Math.PI){ // Bottom Side
      fromArrowX = fromX + shift;
      fromArrowY = fromY + eventHeight/2;
      toArrowY = toY - eventHeight/2;
      toArrowX = toX + shift;
    }
    else if (angle <= -0.25*Math.PI && angle >= -0.75*Math.PI){ // Top Side
      fromArrowX = fromX + shift;
      fromArrowY = fromY - eventHeight/2;
      toArrowX = toX + shift;
      toArrowY = toY + eventHeight/2;
    }
    else if (angle >= 0.75*Math.PI || angle <= -0.75*Math.PI){ // Left Side
      fromArrowX = fromX - eventWidth/2;
      fromArrowY = fromY + shift;
      toArrowX = toX + eventWidth/2;
      toArrowY = toY + shift;
    }
    else {
      console.warn("Invalid Angle Value in setArrowEndpoints() function.");
    }

    return [fromArrowX, fromArrowY, toArrowX, toArrowY];

    // if (Math.abs(fromArrowX - toArrowX) < Math.abs(fromArrowY - toArrowY))
    //   return [fromArrowX + shift, fromArrowY, toArrowX + shift, toArrowY];

    // const fromArrowX = fromX + (Math.cos(angle) * eventWidth) / 2;
    // const fromArrowY = fromY + (Math.sin(angle) * eventHeight) / 2;
    // const toArrowX = toX - (Math.cos(angle) * eventWidth) / 2;
    // const toArrowY = toY - (Math.sin(angle) * eventHeight) / 2;
    // if (Math.abs(fromArrowX - toArrowX) < Math.abs(fromArrowY - toArrowY))
    //   return [fromArrowX + shift, fromArrowY, toArrowX + shift, toArrowY];
  }

  return (
    <>
      {relations.map((relation) => {
        const color =
          relation.type === RELATION_TYPES.CONDITION
            ? "orange"
            : relation.type === RELATION_TYPES.RESPONSE
            ? "blue"
            : relation.type === RELATION_TYPES.INCLUDE
            ? "green"
            : relation.type === RELATION_TYPES.MILESTONE
            ? "purple"
            : "red";

        return (
          <Arrow
            key={relation.id}
            points={setArrowEndpoints(
              relation.fromEvent,
              relation.toEvent,
              relation.type
            )}
            stroke={color}
            fill={color}
          />
        );
      })}
    </>
  );
}

export default Relations;
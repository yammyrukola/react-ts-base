import React, { FC, useRef, useState } from "react";

interface EventsExampleProps {}

const EventsExample: FC<EventsExampleProps> = (props) => {
  const [value, setValue] = useState<string>("");
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(
      crypto.randomUUID().toString().slice(0, 6) +
        "--" +
        inputRef.current?.value
    );
  };

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("DRAG");
  };

  const leaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
  };

  const dragWithPreventHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={inputHandler}
        placeholder="Управляемый"
      />
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={inputHandler}
        placeholder="Не управляемый"
      />
      <button type="button" onClick={clickHandler}>
        Log value
      </button>
      <div
        draggable
        onDrag={dragHandler}
        style={{ width: 200, height: 200, background: "pink" }}
      ></div>
      <div
        onDrop={dropHandler}
        onDragOver={dragWithPreventHandler}
        onDragLeave={leaveHandler}
        style={{
          width: 200,
          height: 200,
          background: isDrag ? "lightblue" : "pink",
          marginTop: 15,
        }}
      ></div>
    </div>
  );
};

export default EventsExample;

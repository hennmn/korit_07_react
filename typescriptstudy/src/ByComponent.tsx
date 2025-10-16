import HelloProps from "./types/types";

function ByComponent({ name }: HelloProps) {
  return (
    <>
      <h1>Bye {name} ! </h1>
    </>
  );
}

export default ByComponent;

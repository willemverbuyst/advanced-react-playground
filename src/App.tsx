import React, { ReactElement } from "react";
import { FaRegHourglass } from "react-icons/fa6";
import "./App.css";

type IconProps = {
  color?: string;
  size?: "large" | "medium" | "small";
};
const Loading = ({ color, size }: IconProps) => (
  <FaRegHourglass style={{ color }} fontSize={size} />
);

type ButtonProps = {
  icon: ReactElement;
  size?: "large" | "normal";
  appearance?: "primary" | "secondary";
};
const ButtonWrong = ({
  icon,
  size = "normal",
  appearance = "primary",
}: ButtonProps) => {
  // create default props
  const defaultIconProps = {
    size: size === "large" ? "large" : "medium",
    color: appearance === "primary" ? "white" : "black",
  };

  const clonedIcon = React.cloneElement(icon, defaultIconProps);

  return (
    <button className={`button ${appearance}`}>Submit {clonedIcon}</button>
  );
};

const ButtonCorrect = ({
  icon,
  size = "normal",
  appearance = "primary",
}: ButtonProps) => {
  // create default props
  const defaultIconProps = {
    size: size === "large" ? "large" : "medium",
    color: appearance === "primary" ? "white" : "black",
  };

  const newIconProps = {
    ...defaultIconProps,
    ...icon.props,
  };

  const clonedIcon = React.cloneElement(icon, newIconProps);

  return (
    <button className={`button ${appearance}`}>Submit {clonedIcon}</button>
  );
};

export default function App() {
  return (
    <>
      <h4>
        Color "red" won't work here - I never passed those props to the cloned
        icon
      </h4>
      <div style={{ border: "1px solid black", padding: "1rem" }}>
        <h3>Wrong</h3>
        <ButtonWrong size="large" icon={<Loading color="red" />} />
        <h4>But if I use it outside of the button, it will work</h4>
        <Loading color="red" />
      </div>
      <div style={{ border: "1px solid black", padding: "1rem" }}>
        <h3>Correct</h3>
        <ButtonCorrect size="large" icon={<Loading color="red" />} />
      </div>
      <div style={{ border: "1px solid black", padding: "1rem" }}>
        <h3>With default values</h3>
        <h4>primary button will have white icons</h4>
        <ButtonCorrect appearance="primary" icon={<Loading />} />

        <h4>secondary button will have black icons</h4>
        <ButtonCorrect appearance="secondary" icon={<Loading />} />

        <h4>large button will have large icons</h4>
        <ButtonCorrect size="large" icon={<Loading />} />

        <h4>override default icons</h4>
        <ButtonCorrect size="large" icon={<Loading color="red" />} />
      </div>
    </>
  );
}

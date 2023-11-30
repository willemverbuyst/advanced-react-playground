import { ReactElement, useState } from "react";

import { FaHome } from "react-icons/fa";
import "./App.css";

type IconProps = {
  color: string;
  size?: "large" | "medium" | "small";
};
const HomeIcon = ({ color, size }: IconProps) => (
  <FaHome style={{ color }} fontSize={size} />
);

type ButtonProps = {
  renderIcon: (props: IconProps, state: { isHovered: boolean }) => ReactElement;
  size?: "large" | "normal";
  appearance?: "primary" | "secondary";
};
const Button = ({
  appearance = "primary",
  size = "normal",
  renderIcon,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // create default props as before
  const defaultIconProps: IconProps = {
    size: size === "large" ? "large" : "medium",
    color: appearance === "primary" ? "white" : "black",
  };

  // and just pass them to the function
  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`button ${appearance}`}
    >
      Submit {renderIcon(defaultIconProps, { isHovered })}
    </button>
  );
};
export default function App() {
  return (
    <>
      <h4>Pass all icon default props</h4>
      <Button renderIcon={(props) => <HomeIcon {...props} />} />
      <h4>Override size</h4>
      <Button
        renderIcon={(props, state) => (
          <HomeIcon
            {...props}
            size="large"
            color={state.isHovered ? "green" : "red"}
          />
        )}
      />
      <h4>Use the actual Fa icon</h4>
      <Button
        renderIcon={(props, state) => (
          <FaHome
            fontSize={props.size}
            style={{ color: state.isHovered ? "green" : props.color }}
          />
        )}
      />
    </>
  );
}

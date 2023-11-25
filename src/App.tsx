import "./App.css";
import { ReactNode, useEffect, useState } from "react";

const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

const BunchOfStuff = () => {
  console.log("bunch of stuff");
  return <div className="bunch-of-stuff">Bunch of stuff</div>;
};

const VerySlowComponent = () => {
  console.log("very slow component");
  wait(500);
  return <div className="bunch-of-stuff">Very slow component</div>;
};

const AnotherVerySlowComponent = () => {
  console.log("another very slow component");
  wait(500);
  return <div className="bunch-of-stuff">Another very slow component</div>;
};

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
const Button = ({ onClick, children }: ButtonProps) => {
  console.log("button");
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

type ModalDialogProps = {
  onClose: () => void;
};

const ModalDialog = ({ onClose }: ModalDialogProps) => {
  console.log("modal dialog");
  return (
    <div className="modal-dialog">
      <div className="content">modal content</div>
      <div className="footer">
        <Button onClick={onClose}>close dialog</Button>
      </div>
    </div>
  );
};

const useResizeDetector = () => {
  console.log("use resize detector");
  const [, setWidth] = useState(0);

  useEffect(() => {
    const listener = () => {
      setWidth(window.outerWidth);
    };

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  return null;
};

const useModalDialogHook = () => {
  console.log("use modal dialog hook");

  const [isOpen, setIsOpen] = useState(false);
  useResizeDetector();

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

const ButtonWithModalDialog = () => {
  console.log("button with modal dialog");
  const { isOpen, open, close } = useModalDialogHook();

  return (
    <div>
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
    </div>
  );
};

function App() {
  console.log("app");
  return (
    <>
      <h1>Advanced React</h1>
      <ButtonWithModalDialog />
      <div style={{ paddingTop: "1rem" }}>
        <BunchOfStuff />
        <VerySlowComponent />
        <AnotherVerySlowComponent />
      </div>
    </>
  );
}

export default App;

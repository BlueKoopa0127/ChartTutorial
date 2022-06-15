import { useState } from "react";
import Presenter from "./Presenter";
import Forms from "./Form";
import Chart from "./Chart";

export default function App() {
  const url = "https://assets.codepen.io/2004014/iris.json";
  const svgWidth = 600,
    svgHeight = 500;
  const data = Presenter(url);
  const [xProperty, setXProperty] = useState(null);
  const [yProperty, setYProperty] = useState(null);

  if (data == null) {
    return Loading();
  }

  const keys = getAttributes(data);

  if (xProperty == null) {
    setXProperty(keys[0]);
  }

  if (yProperty == null) {
    setYProperty(keys[1]);
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Title titleName="Scatter Plot of Iris Dataset" />

      <section className="section">
        <div className="container is-max-desktop">
          <a href={"https://assets.codepen.io/2004014/iris.json"}>
            Dataset used
          </a>
          <Forms
            {...{
              keys,
              xProperty,
              setXProperty,
              yProperty,
              setYProperty,
            }}
          />
          <Chart
            {...{
              data,
              keys,
              xProperty,
              yProperty,
              svgWidth,
              svgHeight,
            }}
          />
        </div>
      </section>
    </div>
  );
}

function getAttributes(data) {
  const k = Object.keys(data[0]);
  k.map((item, index) => {
    if (item == "species") {
      delete k[index];
    }
  });
  return k;
}

function Loading() {
  return <div>Loading...</div>;
}

function Title(props) {
  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container is-max-desktop">
          <p className="title">{props.titleName}</p>
        </div>
      </div>
    </section>
  );
}

export function Example() {
  const [x, setX] = useState(100);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setX((x + 200) % 400);
          }}
        >
          click me
        </button>
      </div>
      <div>
        <svg width="400" height="400">
          <circle
            transform={`translate(${x},200)`}
            r="50"
            style={{ transition: "transform 0.5s" }}
          />
        </svg>
      </div>
    </div>
  );
}

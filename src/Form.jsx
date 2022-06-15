import "bulma/css/bulma.css";

export default function Forms(props) {
  return (
    <div>
      <form className="columns">
        <Form
          labelName="x property"
          keys={props.keys}
          property={props.xProperty}
          setProerty={props.setXProperty}
        />
        <Form
          labelName="y property"
          keys={props.keys}
          property={props.yProperty}
          setProerty={props.setYProperty}
        />
      </form>
    </div>
  );
}

function Form(props) {
  return (
    <div className="field column">
      <label className="label">{props.labelName}</label>
      <div className="control">
        <div className="select is-fullwidth is-primary is-medium">
          <Select
            callback={props.setProerty}
            keys={props.keys}
            select={props.property}
          />
        </div>
      </div>
    </div>
  );
}

function Select(props) {
  return (
    <select
      value={props.select}
      onChange={(event) => props.callback(event.target.value)}
    >
      {props.keys.map((item) => {
        return <option key={item}>{item}</option>;
      })}
    </select>
  );
}

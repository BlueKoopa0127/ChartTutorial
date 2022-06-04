import "bulma/css/bulma.css";

export default function Forms(props) {
    const {keys, xProperty, setXProperty, yProperty, setYProperty} = props;
    return (
        <div>
            <form>
                <Form labelName="x property" property={xProperty} setProerty={setXProperty}/>
                <Form labelName="y property" property={yProperty} setProerty={setYProperty}/>
            </form>
        </div>
    );

    function Form(props) {
        const {labelName, property, setProerty} = props;
        return(
            <div className="field">
                <label className="label">{labelName}</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <Select callback={setProerty} keys={keys} select={property} />
                    </div>
                </div>
            </div>
        );
    }
}



function Select(props) {
    const {callback, keys, select} = props;
    return (
        <select value={select} onChange={ (event) => callback(event.target.value)}>
            {
                keys.map( (item) => {
                    return <option key={item}>{item}</option>
                })
            }
        </select>
    );
}
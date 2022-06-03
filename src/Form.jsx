export default function Form(props) {
    const {keys, xProperty, setXProperty, yProperty, setYProperty} = props;
    return (
        <div>
            <div>x property</div>
            <Select callback={setXProperty} keys={keys} defaultSelect={xProperty} />
            
            <div>y property</div>
            <Select callback={setYProperty} keys={keys} select={yProperty} />
        </div>
    );
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
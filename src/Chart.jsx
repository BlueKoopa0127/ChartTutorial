import * as d3 from 'd3';

export default function Chart(props) {
    //todo data,xProperty,yPropertyを受け取ってチャートを描画する
    const {data, xProperty, yProperty, svgWidth:width, svgHeight:height} = props;
    const marginX = 50, marginY = 50, circleSize = 5, tickMarkLength = 10, tickTextSpace = 5, 
    legendSpace = 110, legendRectSize = 20, legendMargin = 20, legendRectmargin = legendMargin * 1.5, legendTextMargin = 5;

    const contentWidth = width - (marginX + legendMargin) - legendSpace, contentHeight = height - (marginY * 2);
    
    const species = Array.from(new Set(data.map(({ species }) => species)));
    const col = d3.scaleOrdinal(d3.schemeCategory10);

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data.map(item => item[xProperty])))
    .range([0, contentWidth]).nice();
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data.map(item => item[yProperty])))
    .range([contentHeight, 0]).nice();

    const xTicks = xScale.ticks();
    const yTicks = yScale.ticks();

    function Content() {
        return (
            <g transform={`translate(${marginX} ${marginY})`}>
                {
                    data.map( (item, index) => {
                        return <circle key={index} cx={xScale(item[xProperty])} cy={yScale(item[yProperty])} r={circleSize} fill={col(item.species)}/>
                    })
                }
            </g>
        );
    }

    function XAxis() {
        return(
            <g transform={`translate(${marginX} ${contentHeight + marginY})`}>
                <line x1={0} y1={0} x2={contentWidth} y2={0} stroke="black" />
                {
                    xTicks.map( (item) => {
                        return (
                            <g key={item}>
                                <line x1={xScale(item)} y1={0} x2={xScale(item)} y2={tickMarkLength} stroke="black" />
                                <text x={xScale(item)} y={tickMarkLength + tickTextSpace} textAnchor="middle" dominantBaseline="hanging">{item}</text>
                            </g>
                        )
                    })
                }
            </g>
        );
    }

    function YAxis() {
        return (
            <g transform={`translate(${marginX} ${marginY})`}>
                <line x1={0} y1={0} x2={0} y2={contentHeight} stroke="black" />
                {
                    yTicks.map( (item) => {
                        return (
                            <g key={item}>
                                <line x1={0} y1={yScale(item)} x2={-tickMarkLength} y2={yScale(item)} stroke="black" />
                                <text x={-tickMarkLength - tickTextSpace} y={yScale(item)} textAnchor="end" dominantBaseline="central">{item}</text>
                            </g>
                        )
                    })
                }
            </g>
        );
    }

    function Legend() {
        return (
            <g transform={`translate(${contentWidth + (marginX + legendMargin)} ${marginY})`}>
                {
                    species.map( (item, index) => {
                        return (
                            <g key={item}>
                                <rect x={0} y={index * legendRectmargin} width={legendRectSize} height={legendRectSize} fill={col(item)}/>
                                <text x={legendRectSize + legendTextMargin} y={index * legendRectmargin + (legendRectSize / 2)} textAnchor="start" dominantBaseline="middle">{item}</text>
                            </g>
                        ) 
                    })
                }
            </g>
        );
    }

    return(
        <svg width={width} height={height}>
            <Content />
            <XAxis />
            <YAxis />
            <Legend/>
        </svg>
    );
}
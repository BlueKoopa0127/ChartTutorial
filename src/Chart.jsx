import * as d3 from "d3";
import { useState } from "react";

export default function Chart(props) {
  //todo data,xProperty,yPropertyを受け取ってチャートを描画する
  const {
    data,
    xProperty,
    yProperty,
    svgWidth: width,
    svgHeight: height,
  } = props;
  const marginX = 60,
    marginY = 50,
    circleSize = 5,
    tickMarkLength = 10,
    tickTextSpace = 5,
    legendSpace = 110,
    legendRectSize = 20,
    legendMargin = 20,
    legendRectmargin = legendMargin * 1.5,
    legendTextMargin = 5;

  const [shows, setShows] = useState([1, 1, 1]);
  const [showCoordinate, setShowCoordinate] = useState(null);

  const contentWidth = width - (marginX + legendMargin) - legendSpace,
    contentHeight = height - marginY * 2;

  const species = Array.from(new Set(data.map(({ species }) => species)));
  const col = d3.scaleOrdinal(d3.schemeCategory10);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((item) => item[xProperty])))
    .range([0, contentWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((item) => item[yProperty])))
    .range([contentHeight, 0])
    .nice();

  const xTicks = xScale.ticks();
  const yTicks = yScale.ticks();

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <XAxis
          {...{
            xProperty,
            marginX,
            marginY,
            contentWidth,
            contentHeight,
            xTicks,
            xScale,
            tickMarkLength,
            tickTextSpace,
          }}
        />
        <YAxis
          {...{
            yProperty,
            marginX,
            marginY,
            contentHeight,
            yTicks,
            yScale,
            tickMarkLength,
            tickTextSpace,
          }}
        />
        <Content
          {...{
            data,
            species,
            shows,
            marginX,
            marginY,
            xScale,
            yScale,
            xProperty,
            yProperty,
            circleSize,
            col,
            setShowCoordinate,
          }}
        />
        <Legend
          {...{
            species,
            shows,
            setShows,
            col,
            marginX,
            marginY,
            contentWidth,
            legendMargin,
            legendRectmargin,
            legendRectSize,
            legendTextMargin,
          }}
        />
        {
          <ShowCoordinate
            {...{
              marginX,
              marginY,
              showCoordinate,
              xScale,
              yScale,
              circleSize,
            }}
          />
        }
      </svg>
    </div>
  );
}

function Content(props) {
  return (
    <g transform={`translate(${props.marginX} ${props.marginY})`}>
      {props.data.map((item, index) => {
        const isShow =
          props.shows[
            props.species.findIndex((i) => {
              return i === item.species;
            })
          ];
        return (
          <circle
            key={index}
            transform={`translate(${props.xScale(
              item[props.xProperty]
            )}, ${props.yScale(item[props.yProperty])})`}
            r={props.circleSize}
            fill={props.col(item.species)}
            opacity={isShow === 1 ? 1 : 0}
            style={{
              transitionProperty: "transform, opacity",
              transitionDuration: "0.5s, 0.5s",
            }}
            onMouseOver={() => {
              if (isShow === 1) {
                props.setShowCoordinate({
                  x: item[props.xProperty],
                  y: item[props.yProperty],
                });
              }
              /*console.log(
                `(${item[props.xProperty]}, ${item[props.yProperty]})`
              );*/
            }}
            onMouseLeave={() => {
              props.setShowCoordinate(null);
              /*console.log(
                `Leave:(${item[props.xProperty]}, ${item[props.yProperty]})`
              );*/
            }}
          />
        );
      })}
    </g>
  );
}

function ShowCoordinate(props) {
  if (props.showCoordinate === null) {
    return <div></div>;
  }

  const x = props.xScale(props.showCoordinate.x),
    y = props.yScale(props.showCoordinate.y) - props.circleSize * 1.5,
    w = 75,
    h = 30;

  return (
    <g transform={`translate(${props.marginX}, ${props.marginY})`}>
      <rect
        transform={`translate(${x - w / 2}, ${y - h})`}
        width={w}
        height={h}
        fill="gray"
        opacity={0.9}
      />
      <text
        transform={`translate(${x}, ${y - props.circleSize * 2})`}
        textAnchor="middle"
        dominantBaseline="auto"
        fill="white"
      >{`(${props.showCoordinate.x}, ${props.showCoordinate.y})`}</text>
    </g>
  );
}

function XAxis(props) {
  return (
    <g
      transform={`translate(${props.marginX} ${
        props.contentHeight + props.marginY
      })`}
    >
      <line x1={0} y1={0} x2={props.contentWidth} y2={0} stroke="gray" />
      <text
        x={props.contentWidth / 2}
        y={props.tickMarkLength + props.tickTextSpace + 20}
        textAnchor="middle"
        dominantBaseline="hanging"
      >
        {props.xProperty}
      </text>
      {props.xTicks.map((item) => {
        return (
          <g key={item}>
            <line
              x1={props.xScale(item)}
              y1={0}
              x2={props.xScale(item)}
              y2={props.tickMarkLength}
              stroke="gray"
            />
            <text
              x={props.xScale(item)}
              y={props.tickMarkLength + props.tickTextSpace}
              textAnchor="middle"
              dominantBaseline="hanging"
            >
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function YAxis(props) {
  const x = -props.tickMarkLength - props.tickTextSpace - 40,
    y = props.contentHeight / 2;
  return (
    <g transform={`translate(${props.marginX} ${props.marginY})`}>
      <line x1={0} y1={0} x2={0} y2={props.contentHeight} stroke="gray" />
      <text
        x={x}
        y={y}
        transform={`rotate(-90, ${x}, ${y})`}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {props.yProperty}
      </text>
      {props.yTicks.map((item) => {
        return (
          <g key={item}>
            <line
              x1={0}
              y1={props.yScale(item)}
              x2={-props.tickMarkLength}
              y2={props.yScale(item)}
              stroke="gray"
            />
            <text
              x={-props.tickMarkLength - props.tickTextSpace}
              y={props.yScale(item)}
              textAnchor="end"
              dominantBaseline="central"
            >
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Legend(props) {
  return (
    <g
      transform={`translate(${
        props.contentWidth + (props.marginX + props.legendMargin)
      } ${props.marginY})`}
    >
      {props.species.map((item, index) => {
        return (
          <g
            key={item}
            opacity={props.shows[index] === 1 ? 1 : 0.5}
            onClick={() => {
              props.setShows(
                props.shows.map((show, i) => {
                  return i === index ? show * -1 : show;
                })
              );
            }}
            style={{ cursor: "pointer", transition: "opacity 0.5s" }}
          >
            <rect
              x={0}
              y={index * props.legendRectmargin}
              width={props.legendRectSize}
              height={props.legendRectSize}
              fill={props.col(item)}
            />
            <text
              x={props.legendRectSize + props.legendTextMargin}
              y={index * props.legendRectmargin + props.legendRectSize / 2}
              textAnchor="start"
              dominantBaseline="middle"
            >
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

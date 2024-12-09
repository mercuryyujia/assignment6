import React from "react";


function YAxis (props) {
    const { yScale, height, offsetX } = props;
    return (
        <g>
            {/* y-axis */}
            <line x1={0} x2={0} y1={0} y2={height } stroke="black" />
            {/* ticks and text */}
            {yScale.ticks(5).map((tickValue) => (
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line x2={-5} stroke="black" />
                    <text
                        style={{ textAnchor: "end", fontSize: "10px" }}
                        x={-10}
                        dy="0.3em"
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}

function XAxis(props) {
    const { xScale, width, height} = props;
    return (
        <g transform={`translate(0, ${height})`}>
            {/* x-axis */}
            <line x1={xScale.range()[0]} x2={xScale.range()[1]} stroke="black" />
            {/* ticks and text */}
            {xScale.domain().map((tickValue) => (
                <g
                    key={tickValue}
                    transform={`translate(${xScale(tickValue)}, 0)`}
                >
                    <line y2={5} stroke="black" />
                    <text
                        style={{ textAnchor: "middle", fontSize: "10px" }}
                        dy="1em"
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}

export { XAxis, YAxis };
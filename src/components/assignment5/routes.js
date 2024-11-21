import React from "react";

function Routes(props){
    const {projection, routes, selectedAirline} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.
    if (selectedAirline) {
        // Only proceed if an airline is selected
        const airlineRoutes = routes.filter(routes => routes.AirlineID === selectedAirline);

        const paths = airlineRoutes.map((routes, idx) => {
            // Use the projection to transform geographic coordinates into SVG coordinates
            const [startX, startY] = projection([routes.SourceLongitude, routes.SourceLatitude]);
            const [endX, endY] = projection([routes.DestLongitude, routes.DestLatitude]);

            // Render a line for each route
            return (
                <line
                    key={idx}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#992a5b" 
                    strokeWidth="0.3"
                    opacity="0.4"
                />
            );
        });
        return <g>{paths}</g>;
    }
    else {
        // Return an empty group if no airline is selected
        return <g></g>;
    }
}

export { Routes };
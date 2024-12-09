import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { csv, json } from "d3";
import { Row, Col, Container } from "react-bootstrap";
import { groupByGenre, groupByYear } from "../components/project/utils";
import styles from "../styles/assignment6_styles.module.css";
import { GenreBubble} from "../components/project/genreBubble";
import { BarChart } from "../components/project/barChart";
import { LineChart } from "../components/project/lineChart";
import { Heatmap } from "../components/project/heatmap";

const csvUrl = 'https://gist.githubusercontent.com/QianweiYu/01062f70ebbd58fdca4b69bf0f5c2bd0/raw/53c4d9f216ab89fe5e028f6d67190d1686217cf4/updated_songs.csv';

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);

    React.useEffect(() => { 
        csv(csvPath).then(data => {
            setData(data);
        });
    }, []);

    return dataAll;
};


function SpotifyAnalysis() {
    const [selectedYear, setSelectedYear] = React.useState(null);
    const barchart_width = 400;
    const barchart_height = 400;
    const barchart_margin = { top: 10, bottom: 30, left: 50, right: 20 };
    const barchart_inner_width = barchart_width - barchart_margin.left - barchart_margin.right;
    const barchart_inner_height = barchart_height - barchart_margin.top - barchart_margin.bottom;
    const genre_width = 400;
    const genre_height = 400;
    const heat_width = 400;
    const heat_height = 400;
    const linechart_width = 400;
    const linechart_height = 400;
    const linechart_margin = { top: 20, right:20, bottom: 40, left:50 };
    const songs = useData(csvUrl);
    if(songs==null){
        return <>Loading data</>
    }
    let genres = groupByGenre(songs);
    let years = groupByYear(songs);

    return (
        <Container>
            {/* Page Header */}
            <Row className={"justify-content-md-left"}>
                <Col lg={12}>
                    <h1 className={styles.h1Style}>Analysis of Hit Songs from 2000 to 2019 on Spotify</h1>
                </Col>
            </Row>

            {/* Bar Chart and Year Filter */}
            <Row className={"justify-content-md-left"}>
                <Col lg={6}>
                    <h2>Barchart</h2>
                    <svg className={styles.svgStyle} id={"barchart"} width={barchart_width} height={barchart_height}>
                        <BarChart offsetX={barchart_margin.left} offsetY={barchart_margin.top} 
                            height={barchart_inner_height} width={barchart_inner_width} data={years}
                            selectedYear={selectedYear} setSelectedYear={setSelectedYear}
                        />
                    </svg>
                </Col>

                {/* Genre Bubble and Year Filter */}
                <Col lg={6}>
                    <h2>Bubble</h2>
                    <svg className={styles.svgStyle} id={"bubble"} width={genre_width} height={genre_height}>
                        <GenreBubble width={genre_width} height={genre_height} 
                            data={songs} selectedYear={selectedYear}
                        />
                    </svg>
                </Col>
            </Row>

            {/* Line Chart */}
            <Row>
                <Col lg={6}>
                    <h2>Linechart</h2>
                    <svg className={styles.svgStyle} id={"line-chart"} width={linechart_width} height={linechart_height}>
                        <LineChart width={linechart_width} height={linechart_height} data={songs} 
                        top={linechart_margin.top} right={linechart_margin.right} 
                        bottom={linechart_margin.bottom} left={linechart_margin.left}
                        />
                    </svg>
                </Col>
            
                {/* Heatmap */}
                <Col lg={6}>
                    <h2>Heatmap</h2>
                    <svg className={styles.svgStyle} id={"heatmap"} width={heat_width} height={heat_height}>
                        <Heatmap width={heat_width} height={heat_height} data={songs} />
                    </svg>
                </Col>
            </Row>
        </Container>
    );
}

export default SpotifyAnalysis;



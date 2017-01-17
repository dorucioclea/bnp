import React from 'react';
import {Tabs, Tab, TabContent, Col, Row, Image, ButtonToolbar, Button} from 'react-bootstrap';
import {AreaChart, PieChart, BarChart, LineChart} from 'react-d3-components';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Dashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };

  // charts in order: Area, pie, stack, bar+line
  // actions in order: invoice, rfq, stamp, news

  areaData=[{label:"eInvoice",values:[{x:1,y:453},{x:2,y:670},{x:3,y:660},{x:4,y:920},{x:5,y:1050},{x:6,y:1080},{x:7,y:1230},{x:8,y:1100},{x:9,y:1250},{x:10,y:1370},{x:11,y:1400},{x:12,y:1350}]},{label:"PDF",values:[{x:1,y:30},{x:2,y:250},{x:3,y:260},{x:4,y:340},{x:5,y:360},{x:6,y:366},{x:7,y:420},{x:8,y:390},{x:9,y:450},{x:10,y:550},{x:11,y:555},{x:12,y:540}]},{label:"Keyin",values:[{x:1,y:0},{x:2,y:10},{x:3,y:15},{x:4,y:40},{x:5,y:50},{x:6,y:48},{x:7,y:70},{x:8,y:65},{x:9,y:90},{x:10,y:105},{x:11,y:108},{x:12,y:102}]},{label:"Paper",values:[{x:1,y:1600},{x:2,y:1100},{x:3,y:1120},{x:4,y:750},{x:5,y:600},{x:6,y:650},{x:7,y:540},{x:8,y:550},{x:9,y:430},{x:10,y:240},{x:11,y:230},{x:12,y:210}]},{label:"Total",values:[{x:1,y:2083},{x:2,y:2030},{x:3,y:2055},{x:4,y:2050},{x:5,y:2060},{x:6,y:2144},{x:7,y:2260},{x:8,y:2105},{x:9,y:2220},{x:10,y:2265},{x:11,y:2293},{x:12,y:2202}]}];

  pieData = {
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
  };

  barData = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];

  barStackedData = [
    {
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    },
    {
    label: 'somethingB',
    values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
    },
    {
    label: 'somethingC',
    values: [{x: 'SomethingA', y: 6}, {x: 'SomethingB', y: 8}, {x: 'SomethingC', y: 5}]
    }
];

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <h3>Document flow</h3>
            <Row>
              <Col>
                <AreaChart
                  data={this.areaData}
                  width={550}
                  height={300}
                  yOrientation='left' // if you do not provide right default left orientation for yAxis will be used
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}/></Col>
              <Col>
                <PieChart
                  data={this.pieData}
                  width={550}
                  height={300}
                  margin={{top: 10, bottom: 10, left: 100, right: 100}}
                  sort={null}
                  />
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h3>eTransaction Pipeline</h3>
            <Row>
              <Col>
              <ComposedChart width={550} height={320} data={this.barData}
                    margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                  <XAxis dataKey="name"/>
                  <YAxis />
                  <Tooltip/>
                  <Legend/>
                  <CartesianGrid stroke='#f5f5f5'/>
                  <Area type='monotone' dataKey='amt' fill='#A7C9E8' stroke='#007AB3'/>
                  <Bar dataKey='pv' barSize={20} fill='#FF7903'/>
               </ComposedChart>
              </Col>
              <Col>
                <BarChart width={550} height={300} data={this.barStackedData}
                      margin={{top: 20, right: 30, left: 80, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis/>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                   <Legend />
                   <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                   <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                </BarChart>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

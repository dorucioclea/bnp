/* eslint-disable */
import React from 'react';
import {Tabs, Tab, TabContent, Col, Row, Image, ButtonToolbar, Button, Panel} from 'react-bootstrap';
import {AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Pie, Cell, PieChart, Tooltip, Legend, BarChart} from 'recharts';
import ReactHighcharts from 'react-highcharts';

require('highcharts-more')(ReactHighcharts.Highcharts)
require('highcharts-funnel')(ReactHighcharts.Highcharts)

export default class BuyerDashboard extends React.Component {
  static contextTypes = {
    simUrl: React.PropTypes.string
  };


  pieColors = ['#459FD2', '#F7783A', '#A5A5A5', '#FFBB30'];
  // charts in order: Area, pie, stack, bar+line
  // actions in order: invoice, rfq, stamp, news

  areaData=[{label:"eInvoice",values:[{x:1,y:453},{x:2,y:670},{x:3,y:660},{x:4,y:920},{x:5,y:1050},{x:6,y:1080},{x:7,y:1230},{x:8,y:1100},{x:9,y:1250},{x:10,y:1370},{x:11,y:1400},{x:12,y:1350}]},{label:"PDF",values:[{x:1,y:30},{x:2,y:250},{x:3,y:260},{x:4,y:340},{x:5,y:360},{x:6,y:366},{x:7,y:420},{x:8,y:390},{x:9,y:450},{x:10,y:550},{x:11,y:555},{x:12,y:540}]},{label:"Keyin",values:[{x:1,y:0},{x:2,y:10},{x:3,y:15},{x:4,y:40},{x:5,y:50},{x:6,y:48},{x:7,y:70},{x:8,y:65},{x:9,y:90},{x:10,y:105},{x:11,y:108},{x:12,y:102}]},{label:"Paper",values:[{x:1,y:1600},{x:2,y:1100},{x:3,y:1120},{x:4,y:750},{x:5,y:600},{x:6,y:650},{x:7,y:540},{x:8,y:550},{x:9,y:430},{x:10,y:240},{x:11,y:230},{x:12,y:210}]}];
  areaDataRecharts = [
    {
      "month": 1,
      "eInvoice": 453,
      "PDF": 30,
      "Keyin": 0,
      "Paper": 1600
    },
    {
      "month": 2,
      "eInvoice": 670,
      "PDF": 250,
      "Keyin": 10,
      "Paper": 1100
    },
    {
      "month": 3,
      "eInvoice": 660,
      "PDF": 260,
      "Keyin": 15,
      "Paper": 1120
    },
    {
      "month": 4,
      "eInvoice": 920,
      "PDF": 340,
      "Keyin": 40,
      "Paper": 750
    },
    {
      "month": 5,
      "eInvoice": 1050,
      "PDF": 360,
      "Keyin": 50,
      "Paper": 600
    },
    {
      "month": 6,
      "eInvoice": 1080,
      "PDF": 366,
      "Keyin": 48,
      "Paper": 650
    },
    {
      "month": 7,
      "eInvoice": 1230,
      "PDF": 420,
      "Keyin": 70,
      "Paper": 540
    },
    {
      "month": 8,
      "eInvoice": 1100,
      "PDF": 390,
      "Keyin": 65,
      "Paper": 550
    },
    {
      "month": 9,
      "eInvoice": 1250,
      "PDF": 450,
      "Keyin": 90,
      "Paper": 430
    },
    {
      "month": 10,
      "eInvoice": 1370,
      "PDF": 550,
      "Keyin": 105,
      "Paper": 240
    },
    {
      "month": 11,
      "eInvoice": 1400,
      "PDF": 555,
      "Keyin": 108,
      "Paper": 230
    },
    {
      "month": 12,
      "eInvoice": 1350,
      "PDF": 540,
      "Keyin": 102,
      "Paper": 210
    }
  ];

  funnelConfig = {
    chart: {
      type: 'funnel',
      marginRight: 100,
      height: 300
    },
    title: null,
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: {
            colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
              '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
              backgroundColor: null,
              style: {
                fontFamily: 'Dosis, sans-serif'
              }
            },
            title: {
              style: {
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }
            },
            tooltip: {
              borderWidth: 0,
              backgroundColor: 'rgba(219,219,216,0.8)',
              shadow: false
            },
            legend: {
              itemStyle: {
                fontWeight: 'bold',
                fontSize: '13px'
              }
            },
            xAxis: {
              gridLineWidth: 1,
              labels: {
                style: {
                  fontSize: '12px'
                }
              }
            },
            yAxis: {
              minorTickInterval: 'auto',
              title: {
                style: {
                  textTransform: 'uppercase'
                }
              },
              labels: {
                style: {
                  fontSize: '12px'
                }
              }
            },
            plotOptions: {
              candlestick: {
                lineColor: '#404048'
              }
            },


            // General
            background2: '#F0F0EA'

          },
          softConnector: true
        },
        neckWidth: '0%',
        neckHeight: '0%'

      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Unique users',
      data: [
        ['Identified', 3154],
        ['Contacted', 2501],
        ['Discussion', 2146],
        ['Won', 1860]
      ]
    }]
  };


  pieData = {
    label: 'somethingA',
    values: [{x: 'Identified', y: 3154}, {x: 'Contacted', y: 2501}, {x: 'Discusion', y: 2146}, {x: 'Won', y: 1860}]
  };

  barData = [ {name: 'wave 1', bounced: 12, read: 20, loaded: 35, onboarded: 283},
              {name: 'wave 2', bounced: 2, read: 47, loaded: 68, onboarded: 123},
              {name: 'wave 3', bounced: 5, read: 23, loaded: 10, onboarded: 162},
              {name: 'wave 4', bounced: 0, read: 0, loaded: 0, onboarded: 0}];

  barStackedData = [
    {
    label: 'bounced',
    values: [{x: 'wave1', y: 12}, {x: 'wave2', y: 2}, {x: 'wave3', y: 5}, {x: 'wave4', y: 0}]
    },
	 {
    label: 'read',
    values: [{x: 'wave1', y: 20}, {x: 'wave2', y: 47}, {x: 'wave3', y: 10}, {x: 'wave4', y: 0}]
    },
 	{
    label: 'loaded',
    values: [{x: 'wave1', y: 35}, {x: 'wave2', y: 68}, {x: 'wave3', y: 10}, {x: 'wave4', y: 0}]
    },
	  {
    label: 'onboarded',
    values: [{x: 'wave1', y: 283}, {x: 'wave2', y: 123}, {x: 'wave3', y: 162}, {x: 'wave4', y: 0}]
    }
  ];

  lastWaveData = [{name: 'eInvoice', value: 1350},{name: 'pdf', value: 540},{name: 'key in', value: 102},{name: 'paper', value: 210}]


  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {payload.name+": "+payload.value}
      </text>
    );
  };

  render() {
    return (
      <div>
      <br/>
        <Row>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>eTransition Development</h4></div>
              <div className="panel-body">
                <AreaChart width={750} height={300} data={this.areaDataRecharts}
                           margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                  <XAxis dataKey="month"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend />
                  <Area type="monotone" stackId='1' dataKey="Paper"    stroke="#00B1D4" fill="#00B1D4" />
                  <Area type="monotone" stackId='1' dataKey="PDF"      stroke="#F75F1B" fill="#F75F1B" />
                  <Area type="monotone" stackId='1' dataKey="Keyin"    stroke="#E81319" fill="#E81319" />
                  <Area type="monotone" stackId='1' dataKey="eInvoice" stroke="#FFC53C" fill="#FFC53C" />
                </AreaChart>
              </div>
            </div>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>eTransition Today</h4></div>
              <div className="panel-body">
                <PieChart width={750} height={300} onMouseEnter={this.onPieEnter}>
                  <Pie
                    data={this.lastWaveData}
                    cx={375}
                    cy={150}
                    labelLine={false}

                    label={this.renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8">
                    {
                      this.lastWaveData.map((entry, index) => <Cell fill={this.pieColors[index % this.pieColors.length]}/>)
                    }
                  </Pie>
                </PieChart>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>eTransition Today</h4></div>
              <div className="panel-body">
                <BarChart width={750} height={300} data={this.barData}
                          margin={{top: 20, right: 0, left: 0, right: 0}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend />
                  <Bar stackId="a" dataKey='bounced' barSize={20} fill='#459FD2'/>
                  <Bar stackId="a" dataKey='read' barSize={20} fill='#F7783A'/>
                  <Bar stackId="a" dataKey='loaded' barSize={20} fill='#A5A5A5'/>
                  <Bar stackId="a" dataKey='onboarded' barSize={20} fill='#FFBB30'/>
                </BarChart>
              </div>
            </div>
            <div className="panel panel-success">
              <div className="panel-heading"><h4>eTransition Pipeline</h4></div>
              <div className="panel-body">
                <ReactHighcharts config={this.funnelConfig}></ReactHighcharts>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

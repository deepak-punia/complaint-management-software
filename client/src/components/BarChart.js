import * as React from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { EventTracker } from '@devexpress/dx-react-chart';



export default class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      data: props.data,
      targetItem: undefined,
    };

    this.changeTargetItem = targetItem => this.setState({ targetItem });
    
  }

  render() {
    const { data: chartData, targetItem } = this.state;

    return (
      <div className="card">
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="data"
            argumentField="field"
          />
          <Title
            text="Complaints Status"
          />
          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
        </Chart>
      </div>
    );
  }
}

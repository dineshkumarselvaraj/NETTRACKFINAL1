import React,{Component} from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

// const data = [
//   { name: '11.00', UploadSpeed: 2200, DownloadSpeed: 3400, Alert: 1000 },
//   { name: '11.05', UploadSpeed: 1280, DownloadSpeed: 2398, Alert: 1000 },
//   { name: '11.10', UploadSpeed: 5000, DownloadSpeed: 4300, Alert: 1000 },
//   { name: '11.35', UploadSpeed: 4780, DownloadSpeed: 2908, Alert: 1000 },
//   { name: '11.20', UploadSpeed: 5890, DownloadSpeed: 4800, Alert: 1000 },
//   { name: '11.25', UploadSpeed: 4390, DownloadSpeed: 3800, Alert: 1000 },
//   { name: '11.30', UploadSpeed: 4490, DownloadSpeed: 4300, Alert: 1000 },
// ];

export default class SimpleLineChart extends Component {

    render(){

      const {values} = this.props;  
      return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={values}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="9 9" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="UploadSpeed" stroke="#82ca9d"  activeDot={{ r: 16 }} />
            <Line type="monotone" dataKey="DownloadSpeed" stroke="#8884d8" activeDot={{ r: 16 }} />
            <Line type="monotone" dataKey="Alert" stroke="#FF0000" />
          </LineChart>
        </ResponsiveContainer>
      );
      }
}
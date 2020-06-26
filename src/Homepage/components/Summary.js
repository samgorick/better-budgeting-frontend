import React from 'react';
import {Text, Dimensions} from 'react-native';
import {
  LineChart,
  // BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {BarChart, Grid} from 'react-native-svg-charts';
import {ScrollView} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  style: {
    borderRadius: 1,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: 'blue',
  },
};

const progressData = {
  labels: ['Expenses'], // optional
  data: [0.85],
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [12, 15, 80, 50, 5],
    },
  ],
};

const barData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
  ],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80]
    },
  ],
};

const stackedData = {
  labels: ['Test1', 'Test2'],
  legend: ['L1', 'L2', 'L3'],
  data: [[60, 60, 60], [30, 30, 60]],
  barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
};

const pieData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const fill = 'rgb(134, 65, 244)';
const newBarData = [20, 45, 28, 80, 99, 43, 20, 45, 28, 80]

class Summary extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text>Progress Chart</Text>
        <ProgressChart
          data={progressData}
          width={screenWidth}
          height={220}
          strokeWidth={26}
          radius={64}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={lineData}
          width={screenWidth} // from react-native
          height={250}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text>Pie Chart</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        {/* <Text>Bar Chart</Text>
      <BarChart
        data={barData}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      /> */}
        <Text>Horizontal Bar Chart</Text>
        <BarChart
          style={{height: 500}}
          data={newBarData}
          svg={{fill}}
          horizontal={true}
          spacingInner={'0.5'}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>
        <Text>Stacked Bar</Text>
        <StackedBarChart
          data={stackedData}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    );
  }
}

export default Summary;

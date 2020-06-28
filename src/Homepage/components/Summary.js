import React from 'react';
import {Text, Dimensions, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
// import {BarChart, Grid} from 'react-native-svg-charts';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0, // optional, defaults to 2dp
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

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [12, 15, 80, 50, 5],
    },
  ],
};

const barDataCalc = transactions => {
  const labels = []
  const data = []
  const groupedTransactions = sorted(groupTransactions(transactions))
  groupedTransactions.forEach(transaction => {
    labels.push(transaction.spending_category)
    data.push(transaction.amount)
  })
  return {
    labels: labels,
    datasets: [
      {
        data: data
      }
    ]
  }
}

const fill = 'rgb(134, 65, 244)';
const newBarData = [20, 45, 28, 80, 99, 43, 20, 45, 28, 80];

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const sorted = transactionsArray => {
  return transactionsArray.sort((a, b) => (a.amount < b.amount ? 1 : -1));
}

// Group transactions by spending_category
const groupTransactions = transactions => {
  const holder = {};
  const groupedTransactions = [];
  transactions.forEach(function(d) {
    if (holder.hasOwnProperty(d.spending_category)) {
      holder[d.spending_category] = holder[d.spending_category] + d.amount;
    } else {
      holder[d.spending_category] = d.amount;
    }
  });

  for (let txn in holder) {
    groupedTransactions.push({
      spending_category: txn,
      amount: holder[txn],
    });
  }
  return groupedTransactions;
};

const getTotal = (transactions) => {
  return groupTransactions(transactions).map(txn => txn.amount).reduce(reducer)
}

// Expenses vs Income This Month (Progress Bar)
const progressDataCalc = (transactions, budget) => {
  const total = getTotal(transactions)
  const income = budget.find(category => category.spending_category === "Income")
  const final = total / income.amount; //This will be replaced by the budgeted income
  return {labels: [''], data: [final]};
};
// Pie-Chart - top 4 spending categories plus other
const pieDataCalc = transactions => {
  const colors = ['#0835ff', '#e200be', '#ff0074', '#ff5c36']
  
  const groupedTransactions = groupTransactions(transactions);
  const total = groupedTransactions.map(txn => txn.amount).reduce(reducer);
  const topFour = sorted(groupedTransactions).slice(0, 4);
  const totalTopFour = topFour.map(txn => txn.amount).reduce(reducer);
  const otherAmount = total - totalTopFour;
  const other = {
    name: 'Other',
    amount: otherAmount,
    color: '#ffa600',
    legendFontColor: '#ffa600',
    legendFontSize: 15,
  };
  const pieData = topFour.map((obj, index) => ({
    name: obj.spending_category,
    amount: obj.amount,
    color: colors[index],
    legendFontColor: colors[index],
    legendFontSize: 15,
  }));
  pieData.push(other);
  return pieData;
};

const stackedBarCalc = (transactions, budget) => {
  const groupedTransactions = groupTransactions(transactions);
  //TODO: more elegant algorithm for matching transactions to budget
  const alphabeticalTransactions = spendingTransactions.sort((a, b) => (a.spending_category > b.spending_category ? 1: -1))
  // Need to remove income from spending categories
  const spendingBudget = budget.filter(cat => cat.spending_category !== 'Income')
  const alphabeticalBudget = spendingBudget.sort((a, b) => a.spending_category > b.spending_category ? 1: -1)

  const labels = alphabeticalTransactions.map(txn => txn.spending_category)

  const data = []
  // This only works if user has a budget for each category, and if they have not exceeded this budget
  for(let i=0; i < alphabeticalTransactions.length; i++){
    let spending = Math.round(alphabeticalTransactions[i].amount)
    let budget = Math.round(alphabeticalBudget[i].amount)
    let remainingBudget = budget - spending
    let figure = remainingBudget < 0 ? 0 : remainingBudget // App breaks if remainingBudget is < 0
    let holder = [spending, figure]
    data.push(holder)
  }
  
  const stackedData = {
    labels: labels,
    data: data,
    barColors: ['#33cc33', '#ced6e0'],
  };
  return stackedData
}

const Summary = props => (
  <ScrollView contentContainerStyle={styles.container}>
    {props.transactions && props.budget ? (
      <>
        <Text style={styles.header}>You have spent ${Math.round(getTotal(props.transactions))} so far this month</Text>
        <ProgressChart
          data={progressDataCalc(props.transactions, props.budget)}
          width={screenWidth}
          height={220}
          strokeWidth={26}
          radius={64}
          chartConfig={chartConfig}
          hideLegend={false}
          style={styles.chart}
        />
        {/* <Text>Bezier Line Chart</Text>
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
        /> */}
        <Text style={styles.header}>Here's how your spending breaks down this month</Text>
        <PieChart
          data={pieDataCalc(props.transactions)}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="white"
          paddingLeft="15"
          style={styles.chart}
        />
        <Text style={styles.header}>Here's Your Spending Against Your Budget</Text>
      <BarChart
        data={barDataCalc(props.transactions)}
        width={screenWidth}
        height={440}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={80}
        showValuesOnTopOfBars={true}
        fromZero={true}
        style={styles.chart}
      />
        {/* <Text>Horizontal Bar Chart</Text>
        <BarChart
          style={{height: 500}}
          data={newBarData}
          svg={{fill}}
          horizontal={true}
          // spacingInner={'0.5'}
          contentInset={{top: 30, bottom: 30}}>
          <Grid />
        </BarChart>*/}
        <Text>Stacked Bar</Text>
        <StackedBarChart
          data={stackedBarCalc(props.transactions, props.budget)}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          showLegend={false}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    ) : (
      <Text style={styles.header}>Loading</Text>
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 18,
    marginHorizontal: 10
  },
  chart: {
    borderRadius: 16,
  }
})

const mapStateToProps = state => {
  return {transactions: state.transactions, budget: state.budget};
};

export default connect(mapStateToProps)(Summary);

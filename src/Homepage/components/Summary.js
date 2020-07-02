import React from 'react';
import {Text, Dimensions} from 'react-native';
import {Container, Content} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
} from 'victory-native';
import numeral from 'numeral';
import styles from '../../../Styles/styles';

const screenWidth = Dimensions.get('window').width;

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const sorted = transactionsArray => {
  return transactionsArray.sort((a, b) => (a.amount < b.amount ? 1 : -1));
};

// Group transactions by spending_category
const groupTransactions = transactions => {
  if(transactions.length > 0){
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
  }
};

const getTotal = transactions => {
  return groupTransactions(transactions)
    .map(txn => txn.amount)
    .reduce(reducer);
};

const pieDataCalc = transactions => {
  const groupedTransactions = groupTransactions(transactions);
  const total = groupedTransactions.map(txn => txn.amount).reduce(reducer);
  const topFour = sorted(groupedTransactions).slice(0, 4);
  const totalTopFour = topFour.map(txn => txn.amount).reduce(reducer);
  const otherAmount = total - totalTopFour;
  const other = {
    x: 'Other',
    y: otherAmount,
  };
  const pieData = topFour.map((obj, index) => ({
    x: obj.spending_category,
    y: obj.amount,
  }));
  pieData.push(other);
  return pieData;
};

const barDataCalc = transactions => {
  const data = [];
  const groupedTransactions = sorted(groupTransactions(transactions));
  groupedTransactions.forEach(transaction => {
    const obj = {
      spendingCategory: transaction.spending_category,
      amount: transaction.amount,
    };
    data.push(obj);
  });
  const alphabetical = data.sort((a, b) =>
    a.spendingCategory < b.spendingCategory ? 1 : -1,
  );
  return alphabetical;
};

const percentBudgetSpent = (transactions, budget) => {
  const spendingBudget = budget.filter(
    cat => cat.spending_category !== 'Income',
  );
  const txnData = barDataCalc(transactions);
  const data = spendingBudget.map(budgetItem => {
    let txn = txnData.find(
      txn => txn.spendingCategory === budgetItem.spending_category,
    );
    const spend = txn ? txn.amount / budgetItem.amount : 0
    return {spendingCategory: budgetItem.spending_category, percent: spend};
  });
  const alphabetical = data.sort((a, b) =>
    a.spendingCategory < b.spendingCategory ? 1 : -1,
  );
  return alphabetical;
};

const percentBudgetRemaining = (transactions, budget) => {
  const spent = percentBudgetSpent(transactions, budget);

  return spent.map(category =>
    category.percent > 1
      ? {spendingCategory: category.spendingCategory, percent: 0}
      : {
          spendingCategory: category.spendingCategory,
          percent: 1 - category.percent,
        },
  );
};

const progressDataCalc = (transactions, budget) => {
  const total = getTotal(transactions);
  const income = budget.find(
    category => category.spending_category === 'Income',
  );
  const final = total / income.amount;
  return [
    {x: 'Spent', y: Math.round(final * 100)},
    {x: 'Remaining', y: 100 - Math.round(final * 100)},
  ];
};

class CustomLabel extends React.Component {
  render() {
    return (
      <>
        <VictoryLabel {...this.props} />
        <VictoryTooltip
          {...this.props}
          x={screenWidth / 2}
          y={200}
          orientation="middle"
          pointerLength={0}
          cornerRadius={60}
          flyoutWidth={120}
          flyoutHeight={120}
          flyoutStyle={{fill: 'white', borderWidth: 0}}
        />
      </>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

class Summary extends React.Component {
  state = {
    progressData: [{x: 'Spent', y: 0}, {x: 'Remaining', y: 100}],
  };

  componentDidUpdate(prevProps) {
    if (this.props.transactions !== prevProps.transactions && this.props.budget.length > 0 && this.props.transactions.length > 0) {
      this.setState({
        progressData: progressDataCalc(
          this.props.transactions,
          this.props.budget,
        ),
      });
    }
  }

  render() {
    console.log(this.props)
    return (
      <Container>
        {this.props.transactions.length > 0 && this.props.budget.length > 0 ? (
          <Content style={styles.nativeContainer}>
            <Text style={styles.header}>
              {numeral(Math.round(getTotal(this.props.transactions))).format(
                '$0,0',
              )}
            </Text>
            <Text style={{...styles.chartHeader, marginTop: -20}}>
              spent over the last month
            </Text>
            <Text style={styles.header}>
              {
                progressDataCalc(this.props.transactions, this.props.budget)[0]
                  .y
              }
              %
            </Text>
            <Text
              style={{
                ...styles.chartHeader,
                marginTop: -20,
                marginBottom: -40,
              }}>
              total budget
            </Text>
            <VictoryPie
              data={this.state.progressData}
              labelComponent={<CustomLabel />}
              animate={{delay: 1000, duration: 1000}}
              cornerRadius={25}
              labelRadius={400}
              innerRadius={120}
              style={{
                data: {
                  fill: ({datum}) => {
                    return datum.x === 'Spent' ? '#00b5ec' : '#f0f4f7';
                  },
                },
              }}
            />
            <Text style={{...styles.chartHeader, marginBottom: -30}}>
              Here's your top categories of spending
            </Text>
            <VictoryPie
              data={pieDataCalc(this.props.transactions)}
              colorScale={'cool'}
              innerRadius={120}
              labelComponent={<CustomLabel />}
              labelRadius={400}
            />
            <Text style={styles.chartHeader}>
              You have spent ${Math.round(getTotal(this.props.transactions))} in
              these categories:
            </Text>
            <VictoryChart
              padding={{left: 70, right: 15, bottom: 30}}
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={20}>
              <VictoryAxis 
              />
              <VictoryAxis
                dependentAxis
                tickFormat={x => `${x * 100}%`}
                style={{
                  grid: {stroke: ({tick}) => (tick > 0.5 ? 'grey' : 'grey')},
                }}
              />
              <VictoryStack colorScale={['red', 'green']}>
                <VictoryBar
                  data={percentBudgetSpent(
                    this.props.transactions,
                    this.props.budget,
                  )}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                />
                <VictoryBar
                  data={percentBudgetRemaining(
                    this.props.transactions,
                    this.props.budget,
                  )}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                />
              </VictoryStack>
            </VictoryChart>
          </Content>
        ) : (
          <Content contentContainerStyle={styles.container}>
            <Text style={styles.header}>Welcome!</Text>
            <Text style={styles.chartHeader}>
              Get started by clicking an option below:
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Add Budget')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddTransaction')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddSavings')}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Savings</Text>
            </TouchableOpacity>
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {transactions: state.transactions, budget: state.budget };
};

export default connect(mapStateToProps)(Summary);

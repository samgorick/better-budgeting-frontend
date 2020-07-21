import React from 'react';
import {Dimensions} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {connect} from 'react-redux';
import {
  VictoryContainer,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
  VictoryAnimation
} from 'victory-native';
import numeral from 'numeral';
import styles from '../../../Styles/styles';
import NewUserHomepage from './NewUserHomepage';

const mapStateToProps = state => {
  return {transactions: state.transactions, budget: state.budget, savings: state.savings};
};

const screenWidth = Dimensions.get('window').width;

// Addition reducer used in methods (helper method)
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Sort transactions in descending order of amount (helper method)
const sorted = transactionsArray => {
  return transactionsArray.sort((a, b) => (a.amount < b.amount ? 1 : -1));
};

// Group transactions by spending_category (helper method)
const groupTransactions = transactions => {
  if (transactions.length > 0) {
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
        spendingCategory: txn,
        amount: holder[txn]
      });
    }
    return groupedTransactions;
  }
};

// Returns total of all transactions - used in main page header
const getTotal = transactions => {
  return groupTransactions(transactions)
    .map(txn => txn.amount)
    .reduce(reducer);
};

// Data and labels for pie chart. Returns top 4 categories, plus all other categories combined as 'other'
const pieDataCalc = transactions => {
  // Groups one value for each category
  const groupedTransactions = groupTransactions(transactions);
  // Return largest 4 categories by amount spent
  const topFour = sorted(groupedTransactions).slice(0, 4);
  // Total of 4 categories
  const totalTopFour = topFour.map(txn => txn.amount).reduce(reducer);
  // Remainder - i.e. 'other' category
  const otherAmount = getTotal(transactions) - totalTopFour;
  const other = {
    x: 'Other',
    y: otherAmount,
    label: `Other\n${numeral(otherAmount).format('$0,0')}`
  };
  const pieData = topFour.map((obj, index) => ({
    x: obj.spending_category,
    y: obj.amount,
    label: `${obj.spending_category}\n${numeral(obj.amount).format('$0,0')}`
  }));
  // Add 'other' key/value pair into pieData object
  pieData.push(other);
  return pieData;
};

// Return percent spent for bar graph
const percentBudgetSpent = (transactions, budget) => {
  const spendingBudget = budget.filter(cat => cat.spending_category !== 'Income');
  const txnData = groupTransactions(transactions);
  // Map over each category, return % spend from spent / budget. If no spend or no budget, return 0
  const data = spendingBudget.map(budgetItem => {
    let txn = txnData.find(txn => txn.spendingCategory === budgetItem.spending_category);
    const spend = txn && budgetItem.amount > 0 ? txn.amount / budgetItem.amount : 0;
    return {spendingCategory: budgetItem.spending_category, percent: spend};
  });
  const alphabetical = data.sort((a, b) => (a.spendingCategory < b.spendingCategory ? 1 : -1));
  return alphabetical;
};

// Return percent remaining by subtracting percent spent from 1
const percentBudgetRemaining = (transactions, budget) => {
  const spent = percentBudgetSpent(transactions, budget);

  // If more than 100% spent, return 0% remaining to avoid breaking with negative numbers
  return spent.map(category =>
    category.percent > 1
      ? {spendingCategory: category.spendingCategory, percent: 0}
      : {
          spendingCategory: category.spendingCategory,
          percent: 1 - category.percent
        }
  );
};

// Returns percent spent of total income, assumption this is equal/more important than budget total
const percentSpent = (transactions, budget) => {
  const total = getTotal(transactions);
  const income = budget.find(category => category.spending_category === 'Income');
  return income.amount > 0 ? total / income.amount : 1;
};

// Returns data for progress bar, amount remaining vs spent in total
const progressDataCalc = (transactions, budget) => {
  const percent = percentSpent(transactions, budget);
  return [
    {x: 'Spent', y: Math.round(percent * 100)},
    {x: 'Remaining', y: 100 - Math.round(percent * 100)}
  ];
};

class Summary extends React.Component {
  state = {
    spent: 0,
    progressData: [{x: 'Spent', y: 0}, {x: 'Remaining', y: 100}]
  };

  // Required for animation. If there are transactions and a budget, update state to percentSpent
  componentDidUpdate(prevProps) {
    if (
      this.props.transactions !== prevProps.transactions &&
      this.props.budget.length > 0 &&
      this.props.transactions.length > 0
    ) {
      this.setState({
        progressData: progressDataCalc(this.props.transactions, this.props.budget),
        spent: percentSpent(this.props.transactions, this.props.budget)
      });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.props.transactions.length > 0 && this.props.budget.length > 0 ? (
          <Content style={styles.nativeContainer}>
            <Text style={styles.header}>
              {numeral(Math.round(getTotal(this.props.transactions))).format('$0,0')}
            </Text>
            <Text
              style={{
                ...styles.chartHeader,
                marginTop: -20,
                marginBottom: -30
              }}>
              spent since the start of the month
            </Text>
            <VictoryContainer responsive={false} height={400}>
              <VictoryAnimation duration={1000} delay={500} data={this.state}>
                {newProps => {
                  return (
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={205}
                      y={190}
                      text={`${numeral(newProps.spent).format('0%')}`}
                      style={{fontSize: 50, fontFamily: '', fill: '#235789'}}
                    />
                  );
                }}
              </VictoryAnimation>
              <VictoryLabel
                textAnchor="middle"
                x={205}
                y={230}
                text={'total budget'}
                style={{fontSize: 16, fontFamily: '', fill: '#235789'}}
              />
              <VictoryPie
                data={this.state.progressData}
                animate={{delay: 500, duration: 1000}}
                cornerRadius={25}
                labelRadius={400}
                innerRadius={120}
                style={{
                  data: {
                    fill: ({datum}) => {
                      return datum.x === 'Spent' ? '#235789' : '#f0f4f7';
                    }
                  },
                  zIndex: 0
                }}
              />
            </VictoryContainer>
            <Text style={{...styles.chartHeader, marginBottom: -30}}>
              Here are your top categories of spending
            </Text>
            <VictoryPie
              data={pieDataCalc(this.props.transactions)}
              colorScale={['#235789', '#43C59E', '#228CDB', '#0B7189', '#e15554']}
              innerRadius={120}
              labelComponent={
                <VictoryTooltip
                  x={screenWidth / 2}
                  y={200}
                  orientation="center"
                  renderInPortal={false}
                  cornerRadius={60}
                  flyoutWidth={120}
                  flyoutHeight={120}
                  flyoutStyle={{fill: '#f5f9ff', strokeWidth: 0}}
                  style={{fontSize: 20, fontFamily: '', fill: '#235789'}}
                />
              }
              labelRadius={400}
            />
            <Text style={styles.chartHeader}>
              You have spent {numeral(getTotal(this.props.transactions)).format('$0,0')} in these
              categories:
            </Text>
            <VictoryChart
              padding={{left: 70, right: 15, bottom: 30}}
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={20}>
              <VictoryAxis />
              <VictoryAxis
                dependentAxis
                tickFormat={x => `${x * 100}%`}
                style={{
                  grid: {stroke: ({tick}) => (tick > 0.5 ? 'grey' : 'grey')}
                }}
              />
              <VictoryStack colorScale={['#235789', '#43C59E']}>
                <VictoryBar
                  data={percentBudgetSpent(this.props.transactions, this.props.budget)}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                  labels={({datum}) => `Spent: ${numeral(datum.percent).format('0%')}`}
                  labelComponent={
                    <VictoryTooltip
                      constrainToVisibleArea
                      flyoutStyle={{stroke: '#235789', strokeWidth: 2}}
                      style={{fontSize: 12, fontFamily: '', fill: '#235789'}}
                      renderInPortal={false}
                    />
                  }
                />
                <VictoryBar
                  data={percentBudgetRemaining(this.props.transactions, this.props.budget)}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                  labels={({datum}) => `Remaining: ${numeral(datum.percent).format('0%')}`}
                  labelComponent={
                    <VictoryTooltip
                      constrainToVisibleArea
                      flyoutStyle={{stroke: '#43C59E', strokeWidth: 2}}
                      style={{fontSize: 12, fontFamily: '', fill: '#235789'}}
                      renderInPortal={false}
                    />
                  }
                />
              </VictoryStack>
            </VictoryChart>
          </Content>
        ) : (
          <NewUserHomepage navigation={this.props.navigation} />
        )}
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Summary);
import React from 'react';
import {Text, Dimensions} from 'react-native';
import {Container, Content} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  VictoryAnimation,
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
    label: `Other\n${numeral(otherAmount).format('$0,0')}`,
  };
  const pieData = topFour.map((obj, index) => ({
    x: obj.spending_category,
    y: obj.amount,
    label: `${obj.spending_category}\n${numeral(obj.amount).format('$0,0')}`,
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
    const spend = txn ? txn.amount / budgetItem.amount : 0;
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

const percentSpent = (transactions, budget) => {
  const total = getTotal(transactions);
  const income = budget.find(
    category => category.spending_category === 'Income',
  );
  return total / income.amount;
};

const progressDataCalc = (transactions, budget) => {
  const percent = percentSpent(transactions, budget);
  return [
    {x: 'Spent', y: Math.round(percent * 100)},
    {x: 'Remaining', y: 100 - Math.round(percent * 100)},
  ];
};

class Summary extends React.Component {
  state = {
    spent: 0,
    progressData: [{x: 'Spent', y: 0}, {x: 'Remaining', y: 100}],
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.transactions !== prevProps.transactions &&
      this.props.budget.length > 0 &&
      this.props.transactions.length > 0
    ) {
      this.setState({
        progressData: progressDataCalc(
          this.props.transactions,
          this.props.budget,
        ),
        spent: percentSpent(this.props.transactions, this.props.budget),
      });
    }
  }

  render() {
    return (
      <Container>
        {this.props.transactions.length > 0 && this.props.budget.length > 0 ? (
          <Content style={styles.nativeContainer}>
            <Text style={styles.header}>
              {numeral(Math.round(getTotal(this.props.transactions))).format(
                '$0,0',
              )}
            </Text>
            <Text
              style={{
                ...styles.chartHeader,
                marginTop: -20,
                marginBottom: -30,
              }}>
              spent over the last month
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
                    },
                  },
                  zIndex: 0,
                }}
              />
            </VictoryContainer>
            <Text style={{...styles.chartHeader, marginBottom: -30}}>
              Here's your top categories of spending
            </Text>
            <VictoryPie
              data={pieDataCalc(this.props.transactions)}
              colorScale={[
                '#235789',
                '#43C59E',
                '#228CDB',
                '#0B7189',
                '#e15554',
              ]}
              innerRadius={120}
              labelComponent={
                <VictoryTooltip
                  x={screenWidth / 2}
                  y={200}
                  orientation="center"
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
              You have spent {numeral(getTotal(this.props.transactions)).format('$0,0')} in
              these categories:
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
                  grid: {stroke: ({tick}) => (tick > 0.5 ? 'grey' : 'grey')},
                }}
              />
              <VictoryStack colorScale={['#235789', '#43C59E']}>
                <VictoryBar
                  data={percentBudgetSpent(
                    this.props.transactions,
                    this.props.budget,
                  )}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                  labels={({datum}) => `Spent: ${numeral(datum.percent).format('0%')}`}
                  labelComponent={
                    <VictoryTooltip constrainToVisibleArea
                      flyoutStyle={{stroke: '#235789', strokeWidth: 2}}
                      style={{fontSize: 12, fontFamily: '', fill: '#235789'}}
                    />
                  }
                />
                <VictoryBar
                  data={percentBudgetRemaining(
                    this.props.transactions,
                    this.props.budget,
                  )}
                  x="spendingCategory"
                  y="percent"
                  horizontal={true}
                  labels={({datum}) => `Remaining: ${numeral(datum.percent).format('0%')}`}
                  labelComponent={
                    <VictoryTooltip constrainToVisibleArea
                      flyoutStyle={{stroke: '#43C59E', strokeWidth: 2}}
                      style={{fontSize: 12, fontFamily: '', fill: '#235789'}}
                    />
                  }
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
            {this.props.budget.length === 0 ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Add Budget')}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add Budget</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={{...styles.buttonContainer, backgroundColor: '#43C59E'}}>
                <Text style={styles.buttonText}>Budget Added</Text>
              </TouchableOpacity>
            )}
            {this.props.transactions.length === 0 ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddTransaction')}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Add Transaction</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={{...styles.buttonContainer, backgroundColor: '#43C59E'}}>
                <Text style={styles.buttonText}>Transaction Added</Text>
              </TouchableOpacity>
            )}

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
  return {transactions: state.transactions, budget: state.budget};
};

export default connect(mapStateToProps)(Summary);

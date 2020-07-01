import React from 'react';
import {Text, Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryLabel,
  VictoryPie,
} from 'victory-native';

const screenWidth = Dimensions.get('window').width;

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const sorted = transactionsArray => {
  return transactionsArray.sort((a, b) => (a.amount < b.amount ? 1 : -1));
};

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
    let spend = txn.amount / budgetItem.amount;
    return {spendingCategory: txn.spendingCategory, percent: spend};
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

const remainingBudgetCalc = (transactions, budget) => {
  const spendingBudget = budget.filter(
    cat => cat.spending_category !== 'Income',
  );
  const txnData = barDataCalc(transactions); // [{spendingCategory: 'housing', amount: 500}]
  const data = spendingBudget.map(budgetItem => {
    // find the matching txn in txnData
    let txn = txnData.find(
      txn => txn.spendingCategory === budgetItem.spending_category,
    );
    // Calculate remaining budget or return 0 if exceeded
    let remainingBudget =
      budgetItem.amount - txn.amount > 0 ? budgetItem.amount - txn.amount : 0;
    // return an object with the category and remaining budget
    return {
      spendingCategory: budgetItem.spending_category,
      amount: remainingBudget,
    };
  });
  const alphabetical = data.sort((a, b) =>
    a.spendingCategory < b.spendingCategory ? 1 : -1,
  );
  return alphabetical;
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

class Summary extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.props.transactions && this.props.budget ? (
          <>
            <Text style={styles.header}>
              You have spent ${Math.round(getTotal(this.props.transactions))} so
              far this month
            </Text>
            <VictoryPie
              data={progressDataCalc(
                this.props.transactions,
                this.props.budget,
              )}
              innerRadius={120}
              style={{
                data: {
                  fill: ({datum}) => {
                    return datum.x === 'Spent' ? 'green' : 'grey';
                  },
                },
              }}
            />
            <Text style={styles.header}>
              Here's how your spending breaks down this month
            </Text>
            <VictoryPie
              data={pieDataCalc(this.props.transactions)}
              colorScale={'cool'}
              innerRadius={120}
            />
            <Text style={styles.header}>
              You have spent ${Math.round(getTotal(this.props.transactions))} so
              far this month in these categories:
            </Text>
            <VictoryChart
              padding={{left: 65, right: 30, bottom: 30, top: 10}}
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={20}>
              <VictoryAxis style={{tickLabels: {angle: -50}}} />
              <VictoryAxis
                dependentAxis
                tickFormat={x => `$${x / 1000}k`}
                style={{
                  grid: {stroke: ({tick}) => (tick > 0.5 ? 'grey' : 'grey')},
                }}
              />
              <VictoryStack colorScale={['red', 'green']}>
                <VictoryBar
                  data={barDataCalc(this.props.transactions)}
                  x="spendingCategory"
                  y="amount"
                  horizontal={true}
                />
                <VictoryBar
                  data={remainingBudgetCalc(
                    this.props.transactions,
                    this.props.budget,
                  )}
                  x="spendingCategory"
                  y="amount"
                  horizontal={true}
                />
              </VictoryStack>
            </VictoryChart>
            <VictoryChart
              padding={{left: 65, right: 30, bottom: 30, top: 10}}
              width={screenWidth}
              theme={VictoryTheme.material}
              domainPadding={20}>
              <VictoryAxis style={{tickLabels: {angle: -50}}} />
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
          </>
        ) : (
          <Text style={styles.header}>Loading</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 18,
    marginHorizontal: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

const mapStateToProps = state => {
  return {transactions: state.transactions, budget: state.budget};
};

export default connect(mapStateToProps)(Summary);

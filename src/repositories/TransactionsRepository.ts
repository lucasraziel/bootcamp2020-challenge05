import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

type Type = 'income' | 'outcome';

interface Request {
  title: string;
  value: number;
  type: Type;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'income' ? acc + transaction.value : acc,
      0,
    );

    const outcome = this.transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'outcome' ? acc + transaction.value : acc,
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

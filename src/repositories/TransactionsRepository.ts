import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
export default class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    if (transactions.length > 0) {
      const income = transactions
        .map(transaction =>
          transaction.type === 'income' ? transaction.value : 0,
        )
        .reduce((total, amount) => total + amount);

      const outcome = transactions
        .map(transaction =>
          transaction.type === 'outcome' ? transaction.value : 0,
        )
        .reduce((total, amount) => total + amount);

      const total = income - outcome;

      const balance = {
        income,
        outcome,
        total,
      };

      return balance;
    }
    return { income: 0, outcome: 0, total: 0 };
  }
}

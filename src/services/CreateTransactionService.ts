import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: Type;
  value: number;
}

interface RequestBalance {
  type: Type;
  value: number;
}

type Type = 'income' | 'outcome';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  private hasBalance({ type, value }: RequestBalance): boolean {
    const hasBalance = true;

    const balance = this.transactionsRepository.getBalance().total;

    if (type === 'outcome' && balance < value) {
      return false;
    }
    return hasBalance;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!this.hasBalance({ value, type })) {
      throw Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;

import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactionToBeDeleted = await transactionRepository.findOne(id);

    if (!transactionToBeDeleted) {
      throw new AppError("Couldn't find this transaction.");
    }

    await transactionRepository.remove(transactionToBeDeleted);

    return transactionToBeDeleted;
  }
}

export default DeleteTransactionService;

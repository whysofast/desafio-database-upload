import { getCustomRepository, getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    let categoryFound = await categoryRepository.findOne({ where: { title: category } });

    if (!categoryFound) {
      categoryFound = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(categoryFound);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: categoryFound,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

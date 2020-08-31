import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = await getCustomRepository(
      TransactionsRepository,
    );

    const transactionExists = await transactionsRepository.findOne({
      where: { id },
    });

    if (!transactionExists) {
      throw new AppError('Invalid Id');
    }

    await transactionsRepository.delete({ id });
  }
}

export default DeleteTransactionService;

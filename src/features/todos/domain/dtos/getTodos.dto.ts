import { AppError, ZERO, type ValidationType } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class GetTodosDto implements CoreDto<GetTodosDto> {
	private constructor(
		public readonly page: number,
		public readonly limit: number,
		public readonly completed?: boolean
	) {
		this.validate(this);
	}

	public validate(dto: GetTodosDto): void {
		const errors: ValidationType[] = [];

		if (isNaN(dto.page) || isNaN(dto.limit)) {
			errors.push({ fields: ['page', 'limit'], constraint: 'Page and limit must be numbers' });
		}

		if (dto.page <= ZERO) {
			errors.push({ fields: ['page'], constraint: 'Page must be greater than zero' });
		}

		if (dto.limit <= ZERO) {
			errors.push({ fields: ['limit'], constraint: 'Limit must be greater than zero' });
		}

		if (dto.completed !== undefined && typeof dto.completed !== 'boolean') {
			errors.push({ fields: ['completed'], constraint: 'Completed must be a valid value (true or false)' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get todos', errors);
	}

	public static create(object: Record<string, unknown>): GetTodosDto {
		const { page, limit, completed } = object;
		const normalizedCompleted = completed === 'true' ? true : completed === 'false' ? false : completed;
		return new GetTodosDto(page as number, limit as number, normalizedCompleted as boolean | undefined);
	}
}

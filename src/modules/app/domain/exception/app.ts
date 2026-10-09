export class AppException {
  constructor(
    readonly message: string,
    readonly field?: string,
  ) {}
}

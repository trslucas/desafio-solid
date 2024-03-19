export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Email Already Exists')
  }
}

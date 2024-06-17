export interface IFindBy {
  key: "email" | "email" | "id";
  value: string;
}

export interface IStudentRepo {
  find_by({ key, value }: IFindBy): Promise<null>;
}

import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategories {
    name: string;
}
@Table({tableName: "categories"})
export class Categories extends Model<Categories, ICategories>{
    @Column({
        type: DataType.STRING
    })
    declare name: string;
}

import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IGenre {
    name: string;
}
@Table({tableName: "genre"})
export class Genre extends Model<Genre, IGenre>{
    @Column({
        type: DataType.STRING
    })
    declare name: string;
}

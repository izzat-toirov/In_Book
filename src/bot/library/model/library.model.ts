import { AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript";

interface ILibrary {
    last_state: string;
}

@Table({tableName: "library"})
export class Library extends Model<Library, ILibrary>{
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare address: string;
    @Column({
        type: DataType.STRING,
    })
    declare location: string;

    @Column({
        type: DataType.STRING(15),
    })
    declare phone_number: string;

    @Column({
        type: DataType.STRING(50),
    })
    declare last_state: string;
}
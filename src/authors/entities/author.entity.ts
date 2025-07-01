
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Books } from "../../books/entities/book.entity";

interface IAuthor {
    full_name: string;
    bio: string;
    photo_url: string;
}
@Table({tableName: "authors"})
export class Author extends Model<Author, IAuthor>{
    @Column({
        type: DataType.STRING
    })
    declare full_name: string;
    @Column({
        type: DataType.STRING
    })
    declare bio: string;
    @Column({
        type: DataType.STRING
    })
    declare photo_url: string;

    @HasMany(() => Books)
    declare books: Books[];
}

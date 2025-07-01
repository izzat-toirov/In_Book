import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AudioBook } from "../../audio_book/entities/audio_book.entity";

interface IAudioPart {
    audio_book_id: number;
    title: string;
    file_url: string;
    duration: number;
    size_mb: number;
    order_index:number;
}
@Table({tableName: "audioPart"})
export class AudioPart extends Model<AudioPart, IAudioPart>{
    @ForeignKey(()=> AudioBook)
     @Column({
            type: DataType.INTEGER
        })
        declare audio_book_id: number;
    @Column({
            type: DataType.STRING
        })
        declare title: string;
    @Column({
            type: DataType.STRING
        })
        declare file_url: string;

    @Column({
        type: DataType.DECIMAL(15, 2)
    })
        declare size_mb: number;

    @Column({
        type: DataType.INTEGER
    })
        declare duration: number;

    @Column({
            type: DataType.INTEGER
        })
            declare order_index: number;

    @BelongsTo(() => AudioBook)
    declare audioBook: AudioBook;
}

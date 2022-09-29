import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 9999,
    username: "postgres",
    password: "kali2001",
    database: "E_commerce",
    synchronize: false,
    logging: false,
    entities: [
        'src/entity/*Entity{.js,.ts}'
     ],
     migrations: [
        'src/migration/*{.js,.ts}'
     ]

    
})



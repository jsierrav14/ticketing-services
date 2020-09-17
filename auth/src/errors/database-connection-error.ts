export class DatabaseConnectionError extends Error {

    reason = "Database error connection"
    constructor(){
     super()
     Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serealizeErrors(){
        return [
            {
                message: "Error connecting to database"
            }
        ]
    }
}
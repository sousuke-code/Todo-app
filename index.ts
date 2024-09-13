import express, { Application, Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";
import { uid } from "uid";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "miwa0417",
  database: "todos",
});

const app: Application = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', (req: Request, res: Response) => {
  console.log("getリクエストを受け付けました");
  const sql = "SELECT * FROM todo";
  connection.query(sql, (error, result) => {
    if(error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ todos: result })
    }
  });
});

app.post("/add", (req: Request, res: Response) => {
  console.log(req.body.data.todo);
  const { todo } = req.body.data;
  const uidValue = uid();
  const sql = `INSERT INTO todo VALUES ("${uidValue}", "${todo}")`;
  connection.query(sql, (error,results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to add todo"});
    }
    return res.status(200).json({ id: uidValue, todo});
  })
})

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
import { MongoClient } from "mongodb";

export default async function handler(req,res){
    if(req.method ==="POST"){
        const url = "mongodb+srv://varunTodo:varunTodo@todo.6nudbnu.mongodb.net/todolist?retryWrites=true&w=majority";
        const client = new MongoClient(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        try {
            await client.connect();

            const {todo} = req.body;

            const database = client.db('todolist');
            const collection = database.collection('todos');

            await collection.insertOne({text:todo});

            res.status(201).json({ message: "Todo item added successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong." });
        }
        finally{
            await client.close();
        }
    }

    if(req.method === "DELETE"){
        const url = "mongodb+srv://varunTodo:varunTodo@todo.6nudbnu.mongodb.net/todolist?retryWrites=true&w=majority";
        const client = new MongoClient(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        try {
            await client.connect();
            const {todo} = req.body;

            const database = client.db('todolist');
            const collection = database.collection('todos');
            await collection.deleteOne({text : todo});

            res.status(200).json({ message: "Todo item deleted successfully!" });
            
        } catch (error) {
            res.status(500).json({ error: "Something went wrong." });
        }finally{
            await client.close();
        }
    }

    if (req.method === "GET") {
        
        const url = "mongodb+srv://varunTodo:varunTodo@todo.6nudbnu.mongodb.net/todolist?retryWrites=true&w=majority";
        const client = new MongoClient(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    
        try {
          await client.connect();
    
          const database = client.db("todolist");
          const collection = database.collection("todos");
          const todos = await collection.find().toArray();
    
          res.status(200).json({ todos });
        } catch (error) {
          res.status(500).json({ error: "Something went wrong." });
        } finally {
          await client.close();
        }
      }
}
import React from 'react'
import { MongoClient } from "mongodb";

export default async function handler(req,res){
    if(req.method ==="POST"){
        const url = "mongodb+srv://varunTodo:varunTodo@todo.6nudbnu.mongodb.net/completedtodos?retryWrites=true&w=majority";
        const client = new MongoClient(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        try {
            await client.connect();
            const {todo} = req.body;

            const database = client.db("completedtodos");
            const collection = database.collection("todos");

            await collection.insertOne({text: todo});

            res
            .status(201)
            .json({message: "Completed Todo item added Succesfully!!"});
        } catch (error) {
            res.status(500).json({error: "Something Went wrong"});

        }
        finally{
            await client.close()
        }
    }

    if(req.method === "GET"){
        const url = "mongodb+srv://varunTodo:varunTodo@todo.6nudbnu.mongodb.net/completedtodos?retryWrites=true&w=majority";
        const client = new MongoClient(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        try {
            await client.connect();

            const database = client.db('completedtodos');
            const collection = database.collection('todos');
            const todos = await collection.find().toArray();

            res.status(200).json({ todos });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong." });
        }
        finally{
            await client.close();
        }
    }   
}
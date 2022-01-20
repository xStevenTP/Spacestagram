import { posts } from "../../../posts/posts";


export default function handler(req, res) {
    if (req.method === 'GET'){
        res.status(200).json(posts)
    }
    else if (req.method === 'POST'){
        const spacePics = req.body.spacePics
        var bool = true
        for (var i = 0; i < posts.length; i ++){
            if (posts[i].date === spacePics.date){
                bool = false
                break
            }
            else{
                bool = true
            }
        }
        if (bool){
            posts.push(spacePics) 
        }
        res.status(201).json(spacePics)
    }
}
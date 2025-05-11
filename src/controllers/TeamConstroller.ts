import {Request,Response} from 'express'
import User from '../models/User';
import Project from '../models/Project';

export class TeamMemberController {

    static findMemberByEmail = async (req:Request, res:Response)=>{
        const {email} = req.body
        const user = await User.findOne({email}).select('id username email')
        if(!user){
            res.status(404).send('Usuario no encontrado')
            return
        }
        res.send(user)
    }

    static addMemberById = async (req:Request, res:Response)=>{
        const {id} = req.body
        const user = await User.findById(id).select('id username')
        if(!user){
            res.status(404).send('Usuario no encontrado')
            return
        }
       
        if(req.project.team.some(team => team.toString() === user.id.toString())){
            res.status(409).send('El usuario ya está en el proyecto')
            return
        }
        req.project.team.push(user.id)
        await req.project.save()
        res.send(`Se agregó ${user.username} al proyecto ${req.project.projectName}`)
    }
    static getMembersProject = async (req:Request, res:Response)=>{
        const {projectId} = req.params
        const project = await Project.findById(projectId).populate({
            path:'team',
            select:'id email username'
        })
        res.send(project.team)
    }

    static removeMemberById = async (req:Request, res:Response)=>{
        const {userId} = req.params
        if(!req.project.team.some(team => team.toString() === userId)){
            res.status(404).send('El usuario no existe en el proyecto')
            return
        }
        req.project.team = req.project.team.filter(team => team.toString() !== userId)
        await req.project.save()
        res.send('Usuario eliminado del proyecto')
    }

   
}
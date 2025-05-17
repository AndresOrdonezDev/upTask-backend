import { Request, Response } from 'express'
import Note, { INote } from '../models/Note'
import { Types } from 'mongoose'

type NoteParams ={
    noteId:Types.ObjectId
}

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        try {
            const { content } = req.body
            const data = {
                content,
                createdBy: req.user.id,
                task: req.task.id
            }
            const note = new Note(data)
            req.task.notes.push(note.id)
            await Promise.allSettled([req.task.save(), note.save()])
            res.send('Nota creada')
        } catch (error) {
            res.status(500).send('Error al crear la nota')
        }
    }

    static getAllNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task:req.task.id})
            res.json(notes)
        } catch (error) {
            res.status(500).send('Error al obtener las notas')
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
         
        try {
            const {noteId} = req.params
            const note = await Note.findById(noteId)
            
            if(!note){
                res.status(404).send('Nota no encontrada')
                return
            }
            if(note.createdBy.toString() !== req.user.id.toString()){
                res.status(401).send('Acción no válida')
                return
            }
            req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())
            await Promise.allSettled([req.task.save(),note.deleteOne()])
            res.send('Nota eliminada')
        } catch (error) {
            res.status(500).send('Error al eliminar la nota')
        }
    }
}
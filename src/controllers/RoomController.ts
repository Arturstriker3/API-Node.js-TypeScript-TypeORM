import { Request, Response } from 'express'
import { roomRepository } from '../repositories/roomRepositories';
import { videoRepository } from '../repositories/videoRepositories';
import { subjectRepository } from '../repositories/subjectRepositories';
import { error } from 'console';

export  class RoomController {
    async create(req: Request, res: Response) {
        const {name, description} = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        try {

            const newRoom = roomRepository.create({ name, description })

            await roomRepository.save(newRoom)

            return res.status(201).json(newRoom)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' }) 
        }
    }

    async createVideo(req: Request, res: Response) {
        const {title, url} = req.body;
        const { idRoom } = req.params;

        if (!title || !url) {
            return res.status(400).json({ message: 'Title and Url is required' })
        }

        try {

            const room = await roomRepository.findOneBy({ id: Number(idRoom) })

            if (!room) {
                return res.status(404).json({ message: 'Room not found' })
            }

            const newVideo = videoRepository.create({
                title,
                url,
                room
            })

            await videoRepository.save(newVideo)

            return res.status(201).json(newVideo)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' }) 
        }
    }

    async roomSubject(req: Request, res: Response) {
        const {subject_id} = req.body;
        const { idRoom } = req.params;

        try {

            const room = await roomRepository.findOneBy({ id: Number(idRoom) })

            if (!room) {
                return res.status(404).json({ message: 'Room not found' })
            }

            const subject = await subjectRepository.findOneBy({ id: subject_id })

            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' })
            }

            const roomUpdate = {
                ...room,
                subjects: [subject],
            }

            await roomRepository.save(roomUpdate)

            return res.status(204).json({ 
                message: 'Subject added to Room',
                room: room
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' }) 
        }
    }

    async list(req: Request, res: Response){

        try {

            const rooms = await roomRepository.find({
                relations: {
                    subjects: true,
                    videos: true
                }
            })

            return res.status(200).json(rooms)

        } catch (error){
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}
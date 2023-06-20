const { nanoid } = require('nanoid');
require('../utils/db');
const Notes = require('../model/notes');

const addNoteHandler = async (request, h) => {
    const {title, tags, body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = new Notes({
        title, tags, body, id, createdAt, updatedAt,
    });

    try {
        await newNote.save();

        const response = h.response({
            status: 'success',
            message: 'Note added successfully!',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to add note',
        });
        response.code(500);
        return response;
    }
};

const getAllNotesHandler = async () => {
    try {
        const notes = await Notes.find();
        return {
            status: 'success',
            data: {
                notes,
            },
        }
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to fetch note',
        });
        response.code(500);
        return response;
    }
};

const getNoteByIdHandler = async (request, h) => {
    const {id} = request.params;
    
    try {
        const note = await Notes.findOne({id});
    
        if(note){
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        }
    
        const response = h.response({
            status: 'fail',
            message: 'Note not found',
        });
        response.code(404);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to fetch note',
        });
        response.code(500);
        return response;
    }
};

const editNoteByIdHandler = async (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    try {
        const updateNote = await Notes.updateOne(
            {id},
            {
                title,
                tags,
                body,
                updatedAt
            }
        );

        if(updateNote.modifiedCount === 1){
            const response = h.response({
                status: 'success',
                message: 'Note successfully updated!',
            });
            response.code(200);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Failed to update note. Id not found'
        });
        response.code(404);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to update note',
        });
        response.code(500);
        return response;
    }
};

const deleteNoteByIdHandler = async (request, h) => {
    const {id} = request.params;

    try {
        const deleteNote = await Notes.deleteOne({id});
        
        if(deleteNote.deletedCount === 1){
            const response = h.response({
                status: 'success',
                message: 'Note successfully deleted!',
            });
            response.code(200);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Failed to delete note. Id not found',
        });
        response.code(404);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to delete note',
        });
        response.code(500);
        return response;
    }
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
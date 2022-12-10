const fileService = require('../services/fileManagerService')
const fs = require('fs')
const db = require('../db')

class FileController {
    async createDir(req, res) {
        const {name, parent_id, student_id} = req.body

        const file = await fileService.createDir({
            name, parent_id, student_id, user_id: req.user.id
        })

        return res.json(file)
    }

    async getFiles(req, res) {
        let {sort, parent_id} = req.query

        let sortParam = {}
        sortParam[`${sort}`] = 1

        let files = await fileService.getFiles(parent_id)

        if (sort in ['name', 'type', 'date'])
            files = files.sort(sortParam)

        return res.json(files)
    }

    async uploadFile(req, res) {
        await fileService.uploadFiles(req.files, req.body.parent_id, req.user.id)

        return res.json({message: "Файлы успешно добавлены"})
    }

    async downloadFile(req, res) {
        const filePath = await fileService.getFilePath(req.query.id)

        return res.download(filePath)
    }

    async deleteFiles(req, res) {
        const ids = [].concat(req.body)
        await fileService.deleteFiles(ids)

        return res.json({message: 'Файлы удалены'})
    }

    async searchFile(req, res) {
        const files = await fileService.searchFile(req.query.search)
        return res.json(files)
    }
}

module.exports = new FileController()
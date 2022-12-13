const fileService = require('../services/fileManagerService')

// TODO:
//  add rename folder/file
//  move folders/files
class FileController {
    async createDir(req, res) {
        const {name, parent_id, student_id} = req.body

        const file = await fileService.createDir({
            name, parent_id, student_id, user_id: req.user.id
        })

        return res.json(file)
    }

    async getFiles(req, res) {
        let {sort, parent_id, student_id} = req.query

        if (!parent_id) {
            const studentFile = await fileService.createStudentDir(student_id, req.user.id)
            parent_id = studentFile.id
        }

        let sortParam = {}
        sortParam[`${sort}`] = 1

        let files = await fileService.getFiles(parent_id)

        if (sort in ['name', 'type', 'date'])
            files = files.sort(sortParam)

        return res.json(files)
    }

    async uploadFile(req, res) {
        const files = await fileService.uploadFiles(req.files, req.body.parent_id, req.body.student_id, req.user.id)

        return res.json(files)
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
const fs = require("fs");
const path = require("path");

const File = require('../models/File')
const db = require('../db')
const mv = require("mv")

const uploadPath = process.env.UPLOAD_PATH

module.exports = new class FileManagerService {
    async createDir(file) {
        const studentFile = await this.createStudentDir(file.student_id, file.user_id)

        let parentFile = await db.files.where({id: file.parent_id}).first();

        if (!parentFile) {
            parentFile = studentFile
            file.parent_id = studentFile.id;
        }

        const filePath = path.join(parentFile.path, file.name)

        // TODO:
        //  Check for directory creation bug if it exists in the uploads folder but is not in the `files` table
        if (fs.existsSync(filePath))
            throw new Error("Директория уже существует")

        file = new File({
            name: file.name,
            type: "dir",
            path: filePath,
            date: new Date(),
            user_id: file.user_id,
            student_id: file.student_id,
            parent_id: file.parent_id
        })

        await db.files.insert(file).onConflict('path').merge()
        fs.mkdirSync(filePath)

        return file
    }

    getStudentDirPath(student_id) {
        return path.join(uploadPath, student_id.toString())
    }

    async createStudentDir(student_id, user_id) {
        const student = await db.students.where({id: student_id}).first()

        if (!student)
            throw new Error("Студент не найден")

        const studentPath = this.getStudentDirPath(student.id)

        if (!fs.existsSync(studentPath))
            fs.mkdirSync(studentPath)

        let model = new File({
            name: student.id,
            type: "dir",
            path: studentPath,
            date: new Date(),
            user_id: user_id,
            student_id: student.id
        })

        const [studentFileId] = await db.files.insert(model).onConflict('path').merge()
        return db.files.where({id: studentFileId}).first()
    }

    async deleteStudentDirs(student_ids) {
        const studentPaths = student_ids.map(student_id => this.getStudentDirPath(student_id))
        let studentFiles = await db.files.whereIn("path", studentPaths)

        return this.deleteFiles(studentFiles.map(studentFile => studentFile.id))
    }

    async uploadFiles(files, parent_id, student_id, user_id) {
        const studentFile = await this.createStudentDir(student_id, user_id)

        if (!parent_id)
            parent_id = studentFile.id

        const parent = await db.files.where({id: parent_id}).first()

        if (!parent)
            throw new Error("Директория не задана")

        let file_ids = [];
        for (const file of files) {
            const filePath = path.join(parent.path, file.originalname)

            mv(file.path, filePath, {mkdirp: true}, function (err) {
                if (err)
                    throw err
            })

            const model = new File({
                name: file.originalname,
                size: file.size,
                type: "file",
                path: filePath,
                parent_id: parent.id,
                user_id: user_id,
                student_id: parent.student_id,
                date: new Date()
            })

            let [id] = await db.files.insert(model).onConflict('path').merge()
            file_ids.push(id)
        }

        return db.files.whereIn('id', file_ids)
    }

    async deleteFiles(file_ids) {
        const files = await db.files.whereIn('id', file_ids)

        for (const file of files)
            fs.rmSync(file.path, {recursive: true})

        await db.files.whereIn('id', file_ids).delete()
    }

    async searchFile(name) {
        return db.files.whereILike("name", `%${name}%`)
    }

    async getFilePath(file_id) {
        const file = await db.files.where({id: file_id}).first()

        if (file && file.type === "file") {
            if (fs.existsSync(file.path))
                return file.path

            await db.files.where({id: file_id}).delete()
        }

        throw new Error("Файл не найден")
    }

    async getFiles(parent_id) {
        if (!parent_id)
            parent_id = null;

        return db.files.where({parent_id})
    }
}
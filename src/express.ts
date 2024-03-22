import express, { Request, Response } from 'express'
import * as path from 'path';
import * as fs from 'fs'
import fileUpload from "express-fileupload"
import { addPhoto, findPersonPhotos, getAllVisitors, getPersonLast_Photo, getPersonLast_Photo1 } from './dbWorks';

let app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('files'))
app.use(fileUpload());
  
app.use('/static', express.static(__dirname + '/static'));
// app.use('/static', express.static('public'))
// app.use('/static', express.static(path.join(__dirname, 'public')))

const static_url = "http://localhost:5001/static/"

export const init = async () => {
    const port = 5001

    app.listen(port, () => console.log(`🚀 Server running on port ${port}`))

    app.get('/', (req, res) => {
        res.send("<h1>Hello stranger!</h1>")
    })

    app.get('/user_photo', async (req, res) => {
        const name = req.query.name

        if (!name) return res.send(401);

        const photos = await findPersonPhotos(name.toString());

        

        res.json({
            photos: photos.map(p => static_url + p.fileName)
        });
    })

    app.get('/all_detected_users', async (req, res) => {
        const people = await getAllVisitors();

        res.json({
            people
        });
    })

    app.post('/upload', async function(req, res) {
        let sampleFile;
        let uploadPath;
      
        if (!req.files || Object.keys(req.files).length === 0) {
          res.status(400).send('No files were uploaded.');
          return;
        }
            sampleFile = req.files.form_field_name;
            const ids: string[] = req.query.uids?.toString().split(",") || [];
            
            let isAddedPhoto = false

            await Promise.all(ids.map(async (id) => {
                const lastPhoto = await getPersonLast_Photo1(id)
                if (Date.now() - (lastPhoto?.created_at.getTime() || 0) > 10 * 1000 && id.length){
                    console.log("added for id:", id)
                    isAddedPhoto = true
                    // @ts-ignore
                    return addPhoto(id, sampleFile.name)
                }
            }))

            if (isAddedPhoto)
                // @ts-ignore
                fs.writeFileSync(__dirname + '/static/' + sampleFile.name, sampleFile.data)

            res.send(200);
      });
      
}


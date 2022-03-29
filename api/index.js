import 'dotenv/config';
import * as fs from 'fs';
import Repo from './Repo.js';


const generateJsonFromGitHubRepo = async (repoInfo) => {
  const repo = new Repo(repoInfo)  

  await repo.get()
  await repo.getAllCommits()

  const repoJson = JSON.stringify({...repo});

  fs.writeFile(`./repo/${repoInfo.repo}_${repoInfo.owner}.json`, repoJson, 'utf8', ()=>{console.log('end of writing')});
}

const readJsonAsync = async (filePath)=> {
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, (err, fileData) => {
      const object = JSON.parse(fileData);
      return resolve(object);   
    });
  })
}

const updateList = async (filePath,repoInfo)=>{
  let list = await readJsonAsync(filePath)
  list.push(repoInfo)
  fs.writeFile(`./repo/list.json`, JSON.stringify(list), 'utf8', ()=>{console.log('list updated')});
}



(async ()=>{

  const repoInfo = {
    repo: 'test-webhook',
    owner: 'emma-laprevote'
  }



  const file = `${repoInfo.repo}_${repoInfo.owner}.json`

  if (!fs.existsSync(`./repo/${file}`)) {
    await generateJsonFromGitHubRepo(repoInfo)
    await updateList(`./repo/list.json`,repoInfo)
  }

  const jsonRepo = await readJsonAsync(`./repo/${file}`)


})()





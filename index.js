import 'dotenv/config';
import * as fs from 'fs';
import Repo from './Repo.js';



(async()=>{

  const repoInfo = {
    repo: 'IAMDinosaur',
    owner: 'ivanseidel'
  }
  
  const repo = new Repo(repoInfo)  

  await repo.get()
  await repo.getAllCommits()

  const repoJson = JSON.stringify({...repo});

  fs.writeFile(`${repoInfo.repo}_${repoInfo.owner}.json`, repoJson, 'utf8', ()=>{console.log('end of writing')});

})()









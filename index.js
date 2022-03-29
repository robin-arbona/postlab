import { Octokit, App } from "octokit";
import 'dotenv/config';
import * as fs from 'fs';

const octokit = new Octokit({ auth: process.env.TOKEN });

const repo = 'IAMDinosaur';
const owner = 'ivanseidel';

console.log( repo, owner)

const { data : {license, topics, language, description}}  =  await octokit.rest.repos.get({
    repo,
    owner
})


// licences, versions, mots clés, liens web …
// NOK collaborators

console.log(license, topics, language, description)

// get branches
const { data : branches} = await octokit.request(`GET /repos/${owner}/${repo}/branches`)

// Get un commit and add it to commits list object
const getCommit = async (sha, commits) => {
  const {status, data} = await octokit.request(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`)
  if(status === 200){
    commits[sha] = data;
    for(const parent of data?.parents){
      if(!(parent.sha in commits) || Object.keys(commits[sha]).length === 0){
        await getCommit(parent.sha,commits)
      }
    }
  }
} 


const getCommits = async (commits) =>{
  for (const sha in commits) {
    await getCommit(sha,commits)
  }
}


(async()=>{

  const commits = {};

  for (const branche of branches) {
    commits[branche.commit.sha] = {}  
  }

  await getCommits(commits);

  console.log('commits',Object.keys(commits).length);

  const repository = {
    repo,
    owner,
    license,
    topics,
    language,
    description,
    commits
  }
  
  const repoJson = JSON.stringify(repository);

  fs.writeFile(`${repo}_${owner}.json`, repoJson, 'utf8', ()=>{console.log('end of writing')});

})()









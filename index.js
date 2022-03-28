import { Octokit, App } from "octokit";
import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.TOKEN });

const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();


console.log("Hello, %s", login);

const repo = 'IAMDinosaur';
const owner = 'ivanseidel';

const { data : {license, topics, language, description}} =  await octokit.rest.repos.get({
    repo,
    owner
})

// licences, versions, mots clés, liens web …
// NOK collaborators

console.log(license, topics, language, description)

// get branches
const { data : branches} = await octokit.request(`GET /repos/${owner}/${repo}/branches`)
console.log(branches)

// get commits descriptions
const { data: {commit}} = await octokit.request(`https://api.github.com/repos/ivanseidel/IAMDinosaur/commits/a3737740ad6e18eb3260f9c32d1070102abc4f5e`)
console.log(commit)




import { Octokit, App } from "octokit";
import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.TOKEN });

const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();


  console.log("Hello, %s", login);

 const repo =  await octokit.rest.repos.get({
      repo: "IAMDinosaur",
      owner: 'ivanseidel'
  })

  // OK description, langages de programmation, licences, versions, mots clés, liens web …
  // NOK

  console.log(repo)
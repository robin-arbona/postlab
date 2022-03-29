import { Octokit, App } from "octokit";
import 'dotenv/config';

export default class Repo {

    constructor({repo, owner}){
        this.repo = repo
        this.owner = owner
        this.octokit = new Octokit({ auth: process.env.TOKEN });
    }

    async get(){
        const { status, data } = await this.octokit.rest.repos.get({
            repo: this.repo,
            owner: this.owner
        })
        if(status === 200){
            this.info = data
            const  {license, topics, language, description}  =  data;
            console.log(this.repo)
            console.log(description)
        }
        return data
    }

    async getBranches(){
        const { status, data } = await this.octokit.request(`GET /repos/${this.owner}/${this.repo}/branches`)
        if(status === 200){
            this.branches = data
        }
        return data
    }

    async getCommit(sha,commits){
        const {status, data} = await this.octokit.request(`https://api.github.com/repos/${this.owner}/${this.repo}/commits/${sha}`)
        if(status === 200){
            commits[sha] = data;
            for(const parent of data?.parents){
                if(!(parent.sha in commits) || Object.keys(commits[sha]).length === 0){
                    await this.getCommit(parent.sha,commits)
                }
            }
        }
    }

    async getAllCommits(){
        const commits = {};

        const branches = await this.getBranches()

        for (const branche of branches) {
            commits[branche.commit.sha] = {}  
        }

        for (const sha in commits) {
            await this.getCommit(sha,commits)
        }

        console.log('commits',Object.keys(commits).length);

        this.commits = commits
    }
}
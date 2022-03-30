
# Outil de veille et d’extraction d’information à partir de dépôts de code tels que Github, GitLab ou Bitbucket.

![width:500px bg left](https://www.postlab.fr/build/images/PostLab_dark_background.25537ee9.png)

---

# Description des fichiers


| folder              |   file   |                                                       description |
| ------------------- | :------: | ----------------------------------------------------------------: |
| /                   | index.js |                                  launch github scrapper on a repo |
| /                   | Repo.js  |                          scrapper (get repo info and all commits) |
| /repo               |    *     |                    repository info and commits are stored as json |
| /documenation       |    *     |                                       documentation about project |
| /web                |    *     |                                        visualisation of json file |
| /webhook/functions/ | index.js | format incomming webhook from github and send it to slack webhook |




---
# solution retenue

## 1 - réalisation vieille
- webhook (dépots adhérent postlab)
- cron (autre dépot)
## 2 - extraction des données
- api github
- info repo & commit stoqués en json
## 3 -  visualisation

```mermaid
flowchart TB
    D-->A1

    subgraph webhook
    A["github event (push/update repo)"]
    A -- POST request webhook -->B
    B(["API postLab"])
    B-->C["webhook Slack"]
    B-->D["Update repo database"];
    C-->F["message sur channel"]
    click F "www.google.fr" "kkjg"
    end

    subgraph github scrapper
    A1(["Connect to github API"])
    A1-->B1
    B1["Get repo info"]
    B1-->C1
    C1["Get last commit and parent ref"]
    D1["Get parent"]
    C1-->D1
    D1-->C1
    D1-->E1
    E1[("Save as JSON")]
    end

    subgraph view
    A2["display repo list"]
    B2["repo 1"]
    C2["repo ..."]
    D2["repo N"]

    A2-->B2
    A2-->C2
    A2-->D2

    E2["Display repo info (title/description/language/team...)"]
    F2["Display timeline from changes (commit)"]

    D2-->E2
    D2-->F2

    E1-->A2


    end
    
```

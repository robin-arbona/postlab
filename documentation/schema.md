
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
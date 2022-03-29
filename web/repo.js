(async ()=>{

    const params = (new URL(document.location)).searchParams;
    const repo = params.get('repo'); 
    const owner = params.get('owner'); 

    const repoInfo = { repo, owner }

    const file = `${repoInfo.repo}_${repoInfo.owner}.json`


    const jsonRepo = await fetch(`../repo/${file}`).then(r=>r.json())

    console.log(jsonRepo)

    const dataSet = [];

    let id = 0;
    for (const sha in jsonRepo.commits) {
        id++
        const { commit } = jsonRepo.commits[sha]
        dataSet.push({
        id,
        content: commit.author.name,
        start: commit.author.date.slice(0,10)
        })
    }

    console.log(dataSet)

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet(dataSet);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
})()


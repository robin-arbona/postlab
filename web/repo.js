(async ()=>{

    const params = (new URL(document.location)).searchParams;
    const repo = params.get('repo'); 
    const owner = params.get('owner'); 

    const repoInfo = { repo, owner }

    const file = `${repoInfo.repo}_${repoInfo.owner}.json`


    const {commits, info} = await fetch(`../repo/${file}`).then(r=>r.json())

    console.log(info)
    // Project info
    for (const key in info) {
        if (Object.hasOwnProperty.call(info, key)) {
            const el = document.querySelector(`#${key}`)
            if(el){
                el.innerHTML = typeof info[key] === 'object' ? JSON.stringify(info[key]) : info[key]
            }
        }
    }

    // --- TimeLine ---
    const dataSet = [];

    let id = 0;
    for (const sha in commits) {
        id++
        const { commit } = commits[sha]
        dataSet.push({
            id,
            content: commit.author.name,
            start: commit.author.date.slice(0,10),
            sha
        })
    }

    console.log(dataSet)

    // DOM element where the Timeline will be attached
    const container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    const items = new vis.DataSet(dataSet);

    // Configuration for the Timeline
    const options = {};

    // Create a Timeline
    const timeline = new vis.Timeline(container, items, options);

    document.getElementById('visualization').onclick = function (event) {
        const props = timeline.getEventProperties(event)
        console.log(commits[dataSet[props.item].sha]);
      }
})()


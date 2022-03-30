(async ()=>{

    const elList = document.querySelector('#list')

    const jsonRepo = await fetch(`../repo/list.json`).then(r=>r.json())

    jsonRepo.forEach(repo => {
        const a = document.createElement('a')
        a.setAttribute('href',`./repo.html?repo=${repo.repo}&owner=${repo.owner}`)
        a.innerHTML = `<h2>${repo.repo}</h2><p>${repo.owner}</p>`

        elList.appendChild(a)
    });

})()


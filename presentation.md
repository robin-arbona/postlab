---
marp: true
paginate: true
style: |
  section {  
    background-color: black;
    color: white;
  }
  h1 {
      color: white;
      font-size: 50px;
      margin-bottom: 0;
      text-decoration: underline;
      text-decoration-color: orange;
  }

  h2 {
      margin-top: 0;
      color: white;
      margin-bottom: 0;
  }

  p {
      color: white;
  }

  ul, li {
    margin : 0;
  }

  a {
    padding: 10px;
    color: white;
    text-decoration: none;
    border: 1px solid orange;
    margin: 50px;
    margin-left: 0;
    width: 200px;
  }

  a:hover{
      background-color: orange;
      transition: background-color 1000ms linear;
  }
---

# Outil de veille et d’extraction d’information à partir de dépôts de code tels que Github, GitLab ou Bitbucket.

![width:500px bg left](https://www.postlab.fr/build/images/PostLab_dark_background.25537ee9.png)

---

# solution retenue

## 1 - réalisation vieille
- webhook (dépots adhérent postlab)
- cron (autre dépot)
<br />
## 2 - extraction des données
- api github

---

# proof of concept

1 - récuperer informations repo / commits 
2 - webkhook pour notifier

---

# demo

[Repo github](https://github.com/robin-arbona/postlab)

[slack](slack://open)

[Demo web](http://127.0.0.1:5500/web/index.html)
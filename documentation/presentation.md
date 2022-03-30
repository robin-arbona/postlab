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
- cron (autre dépot) (non réalisé)
## 2 - extraction des données
- api github
- info repo & commit stoqués en json
## 3 -  visualisation

![width:500px bg right](./schema.png)

---

# proof of concept

[Repo github](https://github.com/robin-arbona/postlab)

[slack](slack://open)

[Demo web](http://127.0.0.1:5500/web/index.html)


---

# Annexe webhook (1/2)

1 - Settings > webhooks > create

Add url (payload and request can be visualised in recent deliveries)

![width:500px bg right](./github_webhook.png)

---

# Annexe webhook slack (2/2)


[Doc slack webhooks](https://api.slack.com/messaging/webhooks#posting_with_webhooks)

![width:500px bg right](./slack_webhook.png)

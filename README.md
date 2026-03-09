# Hybrid sovellus projekti koulua varten 2026

Linkki julkaistuun sovellukseen joka käyttää opettajan API:a:
https://users.metropolia.fi/~annakall/Hybrid/Hybrid-project/

Linkki omaan Backend/API:
https://github.com/GhostZp/hybrid-servers-26

Tämä projekti on toteutettu opettajien esimerkkien pohjalta ja siihen on käytetty AI:ta koodaus apuna(Vscode Copilot ja ChatGPT).

## Kuvakaappaukset projektin käyttöliittymästä:

![alt text](https://github.com/GhostZp/Urbex-react-project/blob/master/ss/Screenshot%202026-03-09%20141727.png?raw=true)
![alt text](https://github.com/GhostZp/Urbex-react-project/blob/master/ss/Screenshot%202026-03-09%20141748.png?raw=true)
![alt text](https://github.com/GhostZp/Urbex-react-project/blob/master/ss/Screenshot%202026-03-09%20141759.png?raw=true)
![alt text](https://github.com/GhostZp/Urbex-react-project/blob/master/ss/Screenshot%202026-03-09%20141816.png?raw=true)

## Mitä minä olen tehnyt:

- Lisäsin MyUploads osion, AI auttoi minua näyttämään kirjautuneen käyttäjän tiedostot.
- Poistin edit napin.
- Kirjautunut käyttäjä voi poistaa omia tiedostoja.
- Käytetään opettajan malli API:a, ainoastaan database on hieman erillainen.

## Ongelma kohtia:

- Ongelmia uploadamisen kanssa koska: Field 'base_url' doesn't have a default value. Korjattu poistamalla base_url column.
- Tailwind ei ole tuttu tapa koodata niin käytin AI:ta apuna tekemään projektistani vanhan noin 2010 luvun internetin näköisen.
- Kommentti UI ongelma. Jos avaa median jossa on kommentti, sulkee sen, avaa toisen median missä ei ole kommenttia, niin edellisen median kommentit näkyy siellä.



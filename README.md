# Football 4-4-2 – Selainpeli

Selainversio lautapelistä *Football 4-4-2 – Jalkapallostrategiapeli kahdelle*.

## 🔧 Asennus

1. Pura `football442_complete.zip`
2. Avaa kansio terminaalissa ja asenna riippuvuudet:
   ```bash
   npm install
   ```

3. Käynnistä paikallinen kehityspalvelin:
   ```bash
   npm run dev
   ```

## 🌐 Julkaisu GitHub Pagesiin

### 1. Luo GitHub-repositorio
Esimerkiksi `football-442`

### 2. Linkitä projekti
Korvaa `<KÄYTTÄJÄTUNNUS>` ja `<REPO>`:
```bash
git init
git remote add origin https://github.com/<KÄYTTÄJÄTUNNUS>/<REPO>.git
git branch -M main
```

### 3. Lisää `homepage` kenttä `package.json`-tiedostoon:
```json
"homepage": "https://<KÄYTTÄJÄTUNNUS>.github.io/<REPO>"
```

### 4. Asenna ja käytä `gh-pages`
```bash
npm install --save-dev gh-pages
```

Lisää `scripts`-osioon:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 5. Julkaise:
```bash
npm run deploy
```

## ✅ Valmista!
Peli toimii osoitteessa:
```
https://<KÄYTTÄJÄTUNNUS>.github.io/<REPO>
```

---

Lisätiedot: Lautapelin suunnittelija Mikko Jäppinen

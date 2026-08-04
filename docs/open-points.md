# Punti aperti

Stato al 3 agosto 2026. Questo file raccoglie ciò che non si deduce leggendo il
repository: attese esterne, domande senza risposta, decisioni prese a voce.
Va tenuto corto e potato quando le voci si chiudono.

## Stato delle fasi

Tutte le fasi completate. In produzione su `https://andrea-bagnardi.is-a.dev/`.
Lighthouse mobile, misurato il 3 agosto 2026 sul sito pubblicato. Accessibilità
100, best practices 100 e SEO 100 sono stabili su entrambe le lingue. La
performance no: quattro misurazioni di fila sullo stesso commit hanno dato 97,
97, 99 e 100. Peso trasferito 182 KiB. Un numero solo, preso una volta, qui non
significa niente: misurare tre volte prima di dire che qualcosa è peggiorato.
Attenzione anche al browser: se il Chrome della macchina non è in italiano, la
richiesta alla radice viene reindirizzata e si finisce per misurare `/en/`.

**Fase 8 completata.** La pull request 45788 al registro `is-a-dev/register` è
stata unita il 4 agosto 2026 e il dominio è `andrea-bagnardi.is-a.dev`. Il
vecchio `andrea-bagnardi.github.io` reindirizza qui da solo, quindi i link già
consegnati continuano a funzionare.

Se un giorno il dominio cambia ancora, tre cose non si sistemano da sole. Due
non derivano da `site` in `astro.config.mjs`: l'indirizzo della sitemap scritto
a mano in `public/robots.txt`, e la stringa in `src/lib/share-image.ts` che
finisce incisa come pixel dentro le due immagini di anteprima. La terza è che
**il file `public/CNAME` da solo non configura niente**: con il deploy via
GitHub Actions, Pages non lo legge per impostare il dominio. Va scritto nelle
impostazioni del repository, a mano o con
`gh api -X PUT repos/OWNER/REPO/pages -f cname=...`, e allo stesso modo si
attiva `https_enforced` una volta che il certificato risulta `approved`.

**Fase 9 completata.** Italiano su `/`, inglese su `/en/`. `src/data/index.ts`
espone `getContent(locale)` e ogni componente legge `Astro.currentLocale`:
aggiungere una terza lingua significa un file di contenuti e una riga in
`locales`, senza toccare i componenti. Da tenere a mente due punti che non si
vedono dal codice: la 404 è bilingue perché GitHub Pages ne serve una sola per
qualunque percorso, e il reindirizzamento automatico guarda la lingua del
browser, non il paese, che qui non è conoscibile.

## Scelte su cui Andrea può ancora tornare

- `Celery Beat` sta nella colonna Dati mentre `Celery` sta in Backend. È
  voluto — segnala i job di aggregazione schedulati — ma si può leggere come
  una ripetizione.
- `pytest` è nello stack anche se i test sono generati dall'agente. È coerente
  con la sezione Metodo, che lo dichiara apertamente.

## Vincoli emersi lavorando

- **Il repository di GuitarPath è privato.** Lo stack del progetto è stato
  ricavato dal suo `package.json`. Se diventa pubblico, va acceso il link
  "vedi il codice" in `content.it.ts`.
- **Il nome dell'azienda non compare da nessuna parte**, ed è un vincolo della
  spec al §2. L'applicazione consumer resta senza nome. Il dataset della
  dashboard è generato con Faker, quindi il nome che vi compare è inventato.
- **Nello stack Google Cloud resta la sola piattaforma.** Andrea non ricorda
  quali servizi, e BigQuery non era attivo. Aggiungere una voce lì richiede una
  verifica in console, non un ricordo.
- **GitHub Pages impone una cache di dieci minuti** su tutti gli asset e non è
  configurabile. Lighthouse la elenca fra le diagnostiche, ma il punteggio non
  la conta: pesa zero.
- **Lo Speed Index oscilla fra 1,3 e 4,3 secondi a parità di codice**, ed è
  tutta la differenza fra 97 e 100. Non è la sequenza dell'hero, come questo
  file ha sostenuto per giorni: i fotogrammi di Lighthouse dicono il contrario.
  Nella misurazione peggiore, a 1,1 secondi la pagina era ancora bianca; in
  quella migliore, allo stesso istante la sequenza era già in corso e sotto si
  vedeva la sezione successiva. Il numero segue il primo disegno, che su GitHub
  Pages varia da una richiesta all'altra.

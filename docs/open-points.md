# Punti aperti

Stato al 3 agosto 2026. Questo file raccoglie ciò che non si deduce leggendo il
repository: attese esterne, domande senza risposta, decisioni prese a voce.
Va tenuto corto e potato quando le voci si chiudono.

## Stato delle fasi

Fasi 1-7 completate e in produzione su `https://andrea-bagnardi.github.io/`.
Lighthouse mobile, misurato il 3 agosto 2026 sul sito pubblicato: performance
97, accessibilità 100, best practices 100, SEO 100. Peso trasferito 182 KiB su
13 richieste, anteprima di GuitarPath compresa.

**Fase 8, in attesa esterna.** La pull request al registro `is-a-dev/register`
è aperta: numero 45788, aggiunge `domains/andrea-bagnardi.json` con un CNAME
verso `andrea-bagnardi.github.io`. I test del registro passano.

Quando viene unita, e non prima:

1. creare `public/CNAME` con dentro `andrea-bagnardi.is-a.dev`
2. cambiare `site` in `astro.config.mjs`
3. build, commit, push
4. dire ad Andrea di impostare il dominio in Settings → Pages e di attivare
   *Enforce HTTPS* appena la casella diventa selezionabile

Farlo prima che il DNS risolva rende il sito irraggiungibile: GitHub Pages
inizia a reindirizzare verso un dominio che non esiste ancora.

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
- **Speed Index 4,3 s** è l'unica detrazione vera: è la sequenza dell'hero, che
  per due secondi e mezzo mostra righe di log invece del contenuto. Vale circa
  due punti e mezzo dei tre che mancano. È un costo scelto.

# Punti aperti

Stato al 2 agosto 2026. Questo file raccoglie ciò che non si deduce leggendo il
repository: attese esterne, domande senza risposta, decisioni prese a voce.
Va tenuto corto e potato quando le voci si chiudono.

## Stato delle fasi

Fasi 1-7 completate e in produzione su `https://andrea-bagnardi.github.io/`.
Lighthouse mobile all'ultima misurazione: performance 97, accessibilità 100,
best practices 100, SEO 100. Peso trasferito 165 KB, 262 KB non compressi.

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

**Fase 9, non iniziata.** Versione inglese. La struttura dei dati è già
pronta: `src/data/content.it.ts` è un oggetto tipato, aggiungere una lingua
significa un file fratello e una riga in `src/data/index.ts`. Da tradurre
anche la pagina 404. Da decidere dove mettere il selettore di lingua, visto
che la spec vuole navigazione minima.

## Domande in attesa di risposta

- **Strumento di visualizzazione dati.** Confermato l'uso di "Looker Studio o
  simili", ma non quale. Serve il nome esatto prima di aggiungerlo alla
  colonna Dati: un prodotto sbagliato lì non regge a una domanda.
- **Google Analytics.** Nella colonna Dati c'è `Firebase Analytics`, che è
  confermato. Google Analytics no: da chiedere se usato.
- **BigQuery.** Firebase Analytics ha un export nativo verso BigQuery che si
  attiva con un interruttore. Da verificare nella console: se era attivo,
  è la voce più pesante fra quelle rimaste fuori.
- **Servizi Google Cloud.** Andrea non ricorda quali. Nello stack c'è solo la
  piattaforma, ed è la scelta giusta finché non si sa.

## Scelte su cui Andrea può ancora tornare

- `Celery Beat` sta nella colonna Dati mentre `Celery` sta in Backend. È
  voluto — segnala i job di aggregazione schedulati — ma si può leggere come
  una ripetizione.
- `pytest` è nello stack anche se i test sono generati dall'agente. È coerente
  con la sezione Metodo, che lo dichiara apertamente.
- Le due anteprime dei progetti hanno temperature diverse: GuitarPath è scura,
  la dashboard chiara. Si può ricatturare la dashboard in tema scuro.

## Vincoli emersi lavorando

- **Il repository di GuitarPath è privato.** Lo stack del progetto è stato
  ricavato dal suo `package.json`. Se diventa pubblico, va acceso il link
  "vedi il codice" in `content.it.ts`.
- **Il nome dell'azienda non compare da nessuna parte**, ed è un vincolo della
  spec al §2. L'applicazione consumer resta senza nome. Il dataset della
  dashboard è generato con Faker, quindi il nome che vi compare è inventato.
- **GitHub Pages impone una cache di dieci minuti** su tutti gli asset e non è
  configurabile. È una delle due detrazioni su Lighthouse e non si recupera.
- **Speed Index 4,5 s** è l'altra: è la sequenza dell'hero, che per due secondi
  e mezzo mostra righe di log invece del contenuto. È un costo scelto.

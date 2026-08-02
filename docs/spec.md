# Specifica — sito portfolio personale

Documento di lavoro da fornire a Claude Code come brief iniziale del progetto.
Ultimo aggiornamento: 1 agosto 2026.

---

## 1. Obiettivo

Sito vetrina personale di un software engineer con più di dieci anni di esperienza, orientato al backend. È un sito di presentazione: non dichiara disponibilità e non raccoglie offerte di lavoro.

Il sito viene linkato da LinkedIn, dal CV e dai social. Chi lo apre è quasi sempre un recruiter o un CTO, spesso da mobile, e dedica pochi secondi alla prima impressione.

Il sito deve fare tre cose, in ordine:

1. comunicare in pochi secondi che tipo di ingegnere è chi lo ha scritto
2. lasciare un ricordo visivo, così che il profilo si distingua dagli altri
3. portare a LinkedIn, a GitHub e ai due progetti pubblici

Il sito **non** è la prova principale delle competenze. La prova sono i due progetti pubblici linkati. Il sito deve essere curato e veloce, non spettacolare a spese della sostanza.

---

## 2. Vincoli non negoziabili

- Nessun dominio a pagamento: si usa GitHub Pages, eventualmente con sottodominio gratuito `is-a.dev`
- Sito completamente statico, nessun backend, nessun database, nessun blog
- Nessun nome di azienda o datore di lavoro in nessun punto del sito
- Nessuna sezione sul percorso formativo
- Nessun servizio esterno che richieda account a pagamento
- Deve funzionare bene su mobile, dove arriverà buona parte del traffico

---

## 3. Hosting e deploy

- Repository GitHub esistente, pubblicato su GitHub Pages
- Build e deploy automatici via GitHub Actions su push del branch principale
- Astro configurato con `site` e `base` corretti per il percorso di GitHub Pages
- File `.nojekyll` nella cartella di output
- Sottodominio `is-a.dev` da aggiungere in un secondo momento tramite pull request al registro pubblico, con file `CNAME` nel repository. Non bloccante per la prima pubblicazione.

---

## 4. Stack tecnico

- **Astro** con output statico, zero JavaScript di default
- **Tailwind CSS** per lo styling
- **GSAP** con ScrollTrigger per la sequenza dell'hero e le rivelazioni allo scroll
- **Lenis** per lo smooth scroll
- **Canvas 2D** per il campo di punti animato, in un componente client-only
- Font self-hosted tramite `@fontsource`, nessuna chiamata a CDN esterni di font
- Nessuna dipendenza React o altro framework UI: componenti Astro e vanilla JS

Contenuti in file di dati separati dal markup (`src/data/*.ts` o `*.json`), così che aggiornare un testo non richieda toccare i componenti.

---

## 5. Direzione visiva

L'estetica di riferimento è quella di un pannello di monitoraggio: sobria, densa di informazione, con pochissimo colore usato in modo funzionale. Non deve somigliare a un sito di agenzia creativa né a un tema editor di codice.

### Palette

| Ruolo | Chiaro | Scuro |
|---|---|---|
| Sfondo | `#F5F6F7` | `#0F1216` |
| Superficie | `#FFFFFF` | `#171B21` |
| Testo primario | `#14181D` | `#EDEFF2` |
| Testo secondario | `#5A6470` | `#98A2AE` |
| Accento | `#4C4FE0` | `#7B7EF0` |
| Segnale (solo numeri e stati) | `#B4740C` | `#E0A03A` |

Due accenti in tutto. L'accento indaco è per elementi interattivi e per il campo di punti attivo; il segnale ambra è riservato ai numeri chiave e agli stati nel trace. Il tema segue `prefers-color-scheme`, con eventuale interruttore manuale come extra opzionale.

Da evitare esplicitamente: fondo crema caldo con serif ad alto contrasto e accento terracotta; fondo quasi nero con accento verde acido; layout tipo giornale con filetti sottili e colonne dense. Sono i tre look che ricorrono ovunque e leggono come default, non come scelta.

### Tipografia

- Display: **Bricolage Grotesque** variabile, usata solo per il nome nell'hero e per i titoli di sezione
- Testo: **Inter Tight**, pesi 400 e 500
- Monospazio: **JetBrains Mono**, per le righe di log, i tag tecnologici e i numeri

Scala tipografica esplicita, con il nome nell'hero volutamente grande (tra 64 e 96 px su desktop, minimo 40 px su mobile). Due pesi per famiglia, mai di più.

### Layout

Colonna centrale con larghezza massima intorno ai 1100 px, molta aria verticale tra le sezioni, nessun bordo arrotondato accentuato: raggio massimo 8 px. Bordi sottili invece di ombre.

### Elemento firma

Il campo di punti animato, presente su tutta la pagina come strato di sfondo a bassissima opacità e reattivo al mouse, che nell'hero ospita la sequenza del trace. È l'unico elemento di spettacolarità del sito: tutto il resto attorno resta disciplinato e silenzioso.

---

## 6. Struttura e contenuti

Pagina singola, sei blocchi in sequenza. Navigazione minima: solo un'ancora di ritorno in cima e i link ai contatti. Nessun menu a comparsa.

### 6.1 Hero

Contenuti:

- Nome: **Andrea Bagnardi**
- Riga di posizionamento, da scegliere tra queste tre alternative:
  1. "Costruisco backend che reggono oltre centomila persone al giorno"
  2. "Backend, dati e infrastruttura. Più di dieci anni a tenere in piedi cose che vanno in produzione"
  3. "Software engineer. Progetto backend, li porto in produzione e li mantengo vivi"
- Riga di contesto sotto: "Più di dieci anni di sviluppo professionale, oggi orientato a backend, dati e infrastruttura."

La riga di posizionamento deve essere specifica, non un titolo generico: è quella che decide se chi arriva continua a scorrere.

Comportamento animato descritto nella sezione 7.

### 6.2 Aree di competenza

Griglia due per due su desktop, colonna singola su mobile. Ogni card ha titolo, affermazione, evidenza e tag tecnologici. Nessun riferimento ad aziende o prodotti per nome.

**Backend e API su larga scala**
Progetto e mantengo backend che reggono traffico reale. Ho disegnato da zero l'architettura Django e le API di un'applicazione consumer con oltre 100.000 utenti attivi al giorno e picchi di decine di migliaia di sessioni simultanee, e l'ho portata avanti per anni con aggiornamenti profondi dello stack senza interruzioni di servizio.
Tag: Python, Django, REST, PostgreSQL

**Infrastruttura e delivery**
Gestisco l'infrastruttura e il percorso che porta il codice in produzione. Responsabilità diretta su server e ambienti da tutta la carriera, containerizzazione con Docker e Docker Compose, pipeline CI/CD costruite per fare da controllo qualità sulle pull request del team. Backup e ripristino del database di produzione. In preparazione la certificazione AWS Solutions Architect Associate.
Tag: Docker, GitHub Actions, Linux, Google Cloud

**Full stack e prodotto**
So portare una funzionalità dal database allo schermo. Ho sviluppato un portale web gestionale in Ionic e costruito da zero un CRM appoggiato a un backend già in produzione, lavorando su interfacce usate quotidianamente da operatori professionali. Ho pubblicato applicazioni su App Store e Play Store.
Tag: Angular, Ionic, TypeScript, Tailwind

**Dati e business intelligence**
Prendo dati sparsi in gestionali diversi e li rendo interrogabili. Pipeline ETL in Python e Pandas, data warehouse a schema a stella con storicizzazione SCD2, dashboard interattiva per l'analisi. Codice pubblico e demo online.
Tag: Pandas, ETL, data warehouse, Streamlit

**Fascia trasversale**, a tutta larghezza sotto la griglia, senza numeri:
Revisione del codice e mentoring di sviluppatori junior, stime e pianificazione tecnica, interlocuzione con fornitori esterni.

### 6.3 Progetti

Due blocchi a tutta larghezza, non card affiancate. Colonna di testo con posizionamento sticky, anteprima visiva che scorre a fianco. La sezione va costruita per accogliere N progetti, non due.

**GuitarPath** — occhiello: prodotto in soft launch

- Problema: imparare chitarra da autodidatta significa esercitarsi senza sapere se lo si sta facendo bene, e i corsi online propongono lo stesso percorso a tutti.
- Soluzione: esercizi personalizzati su caratteristiche e progressi di chi suona, analisi dell'esecuzione con valutazione e consigli, tablature interattive.
- Decisioni tecniche da evidenziare: due modelli distinti con ruoli separati, uno per la generazione dei percorsi e delle tablature e uno per l'analisi audio; elaborazione audio nel browser; suite di test estesa.
- Riga sul metodo, da riportare testualmente: "Realizzato interamente con Claude Code. Il codice è generato dall'agente, l'architettura, i vincoli e il controllo qualità sono miei: TypeScript in modalità strict, 440 test automatici, revisione di ogni pull request."
- Numeri: 6 lingue, 440 test, live in produzione
- Azioni: prova la demo, vedi il codice (il secondo solo se il repository è pubblico)

**Sistema di business intelligence** — occhiello: progetto di business intelligence con codice pubblico

Nessun riferimento all'origine accademica del progetto.

- Problema: nel settore della formazione i dati operativi restano sparsi tra gestionali diversi e non diventano mai informazione utile per decidere.
- Soluzione: raccoglie i dati dai gestionali, li normalizza e li storicizza, poi li espone in una dashboard. Da non ripetere con le stesse parole della card 6.2, che descrive la stessa pipeline.
- Decisioni tecniche da evidenziare: scelta dello schema a stella con motivazione in una riga; storicizzazione SCD2.
- Numeri: nove settimane dallo zero alla demo online
- Azioni: dashboard live (`https://pw-bagnardi-andrea.streamlit.app/`), repository (`https://github.com/andrea-bagnardi/project-work`)

Ogni progetto elenca le proprie tecnologie accanto ai numeri, nella colonna dell'anteprima.

Anteprime: immagine statica per progetto, in `webp`, con dimensioni esplicite. Le clip video sono state abbandonate e il codice che le caricava è stato rimosso: reintrodurle significa rimettere sia il markup sia il caricamento differito.

### 6.4 Stack

Quattro colonne di testo raggruppate per area: backend, frontend, dati, infrastruttura. Una parola per voce, nessun logo, nessuna barra di percentuale.

La sezione è l'inventario completo degli strumenti di lavoro, non un riassunto: i tag sulle card delle competenze ne mostrano le voci più rappresentative, qui c'è il resto. Non deve limitarsi a ripetere quei tag.

Le tecnologie dei progetti non stanno qui: ogni progetto elenca le proprie nella sezione 6.3. Gli strumenti che usa chiunque, dal controllo di versione al tracker dei ticket, restano fuori.

Il PHP non compare.

### 6.5 Metodo di lavoro

Diagramma orizzontale in quattro fasi che si disegna quando entra nella viewport: specifica → vincoli → generazione → verifica. Le prime due fasi in accento indaco (decisioni umane), la terza in un colore distinto (output dell'agente), la quarta come cancello di verifica. Sotto, una nota: se la verifica fallisce, il problema è nella specifica.

Quattro righe di testo, una per fase:

- La specifica la scrivo prima di far generare una riga di codice. Quando qualcosa va storto, quasi sempre è la specifica a essere ambigua.
- Le regole del progetto stanno in un file che l'agente legge sempre, dalle convenzioni di naming ai pattern architetturali.
- L'agente scrive il codice, io leggo ogni diff.
- I test automatici sono la rete di sicurezza sul codice che non ho battuto a mano, e la CI blocca tutto ciò che non passa.

Riga di chiusura: le stesse pipeline CI le ho costruite in azienda per fare da controllo qualità sulle pull request del team, e i test automatici li ho introdotti da quando la generazione assistita ha reso veloce scriverli.

Il soggetto delle frasi è sempre la persona, mai lo strumento. Da non usare in nessun punto del sito: l'etichetta "AI engineer".

### 6.6 Dove trovarmi

- Riga di apertura: dice cosa si trova dietro ciascun link, non se chi scrive è disponibile
- Due azioni: LinkedIn, GitHub
- Nessun indirizzo email in nessuna forma, nemmeno offuscato o composto da JavaScript
- Nessun CV scaricabile
- Nessun numero di telefono, nessuna città, nessun form di contatto
- Chiusura visiva: il campo di punti si dirada fino a spegnersi verso il fondo pagina

Oltre alla pagina singola esiste una **404** con la stessa grafica, marcata `noindex` e fuori dalla sitemap. Carica solo il campo di punti: niente sequenza dell'hero, niente animazioni allo scroll.

---

## 7. Animazioni

### 7.1 Campo di punti (elemento firma, persistente)

- Canvas a tutta pagina come strato di sfondo, dietro al contenuto
- Griglia regolare di punti, spaziatura circa 24 px, raggio base 1 px
- I punti entro un raggio di circa 110 px dal cursore si spostano radialmente verso l'esterno, aumentano di raggio e passano al colore accento, con intensità proporzionale alla vicinanza
- Opacità di base molto bassa fuori dall'hero, in modo da non disturbare la lettura
- Ogni sezione può aumentare localmente la densità sotto l'elemento in hover (card delle competenze, colonne dello stack)
- Il canvas si mette in pausa quando esce dalla viewport e quando la scheda del browser non è attiva

### 7.2 Sequenza dell'hero

Durata totale massima 2,5 secondi. Si esegue una sola volta per sessione, memorizzata in `sessionStorage`: chi torna sulla pagina nella stessa sessione vede subito lo stato finale.

1. Il campo di punti è già presente, quasi spento
2. Righe di log in monospazio compaiono in sequenza, una ogni 140 ms circa, allineate a sinistra al centro dell'area; ogni riga mostra metodo, percorso, codice di stato e tempo di risposta
3. I punti sotto ogni riga si illuminano al passaggio della riga stessa
4. Le righe collassano verso il centro e svaniscono
5. Il nome si rivela dal basso con maschera, seguito dalla riga di posizionamento e da un filetto in accento
6. Il campo di punti sale alla sua intensità normale e diventa interattivo

Le righe di log sono verosimili ma generiche: nessun nome di dominio, prodotto o azienda riconoscibile.

Se lo scroll parte prima della fine, la sequenza si conclude immediatamente allo stato finale.

### 7.3 Scroll

- Rivelazioni sfalsate all'ingresso di ogni sezione, spostamento verticale contenuto (massimo 24 px) e dissolvenza
- Contatore animato da 0 a 100.000+ sulla prima card delle competenze, una sola volta. È l'unico numero animato del sito.
- Colonna di testo sticky nella sezione progetti
- Diagramma del metodo che si disegna all'ingresso

### 7.4 Movimento ridotto

Con `prefers-reduced-motion: reduce` attivo:

- nessuna sequenza dell'hero, si parte dallo stato finale
- campo di punti disegnato una volta e statico, senza reazione al mouse
- nessuna rivelazione allo scroll, nessun contatore animato, smooth scroll disattivato
- il layout e i contenuti restano identici

---

## 8. Qualità

### Performance

- Obiettivo Lighthouse su mobile: performance sopra 95, accessibilità 100, best practices 100, SEO 100
- Nessun JavaScript sul percorso critico oltre a quello del campo di punti, caricato in modo differito
- GSAP e Lenis caricati solo dopo il primo rendering utile
- Font self-hosted in formato woff2 con `font-display: swap` e sottoinsieme latino
- Immagini in AVIF o WebP con dimensioni esplicite per evitare spostamenti di layout
- Peso della pagina iniziale sotto i 300 KB escluse le clip video

### Accessibilità

- Contrasto minimo AA in entrambi i temi
- Focus visibile su tutti gli elementi interattivi
- Navigazione completa da tastiera
- Canvas decorativo con `aria-hidden="true"`
- Struttura di intestazioni corretta, un solo `h1`
- Testo alternativo su ogni immagine e clip
- Il sito deve restare leggibile e navigabile con JavaScript disattivato

### SEO e condivisione

- Titolo e meta description espliciti
- Open Graph e Twitter Card con immagine di anteprima generata dal sito stesso
- Dati strutturati `schema.org/Person`
- `sitemap.xml` e `robots.txt`
- Lingua principale italiana. Versione inglese non prevista in prima battuta, ma la struttura dei dati deve permettere di aggiungerla senza riscrivere i componenti.

---

## 9. Convenzioni di progetto

- Tutto il codice in inglese: nomi di cartelle, file, variabili, funzioni, classi. Nessun italiano fuori dai contenuti testuali.
- Messaggi di commit in inglese, scritti in modo naturale, senza riferimenti o firme relative all'assistenza AI
- Formattazione con Prettier, linting con ESLint
- Un file di regole di progetto alla radice, letto dall'agente, con convenzioni, palette, scala tipografica e vincoli di questa specifica

---

## 10. Fasi di lavoro

1. Impalcatura del progetto Astro con Tailwind, workflow di deploy su GitHub Pages, pagina vuota pubblicata e raggiungibile
2. Sistema di design: token di colore, font self-hosted, scala tipografica, tema chiaro e scuro
3. Struttura statica di tutte e sei le sezioni con i contenuti definitivi, senza animazioni
4. Campo di punti e sequenza dell'hero
5. Animazioni allo scroll e diagramma del metodo
6. Anteprime dei progetti, meta tag, dati strutturati, immagine di anteprima
7. Verifica su Lighthouse, prova con movimento ridotto, prova da tastiera, prova con JavaScript disattivato
8. Aggiunta del sottodominio `is-a.dev`
9. Versione inglese: routing `/en`, `hreflang`, sitemap a due lingue, selettore di lingua, traduzione dei contenuti e della pagina 404

Dopo la fase 3 il sito è già pubblicabile e linkabile: le animazioni sono un miglioramento incrementale, non un prerequisito.

---

## 11. Decisioni prese sul materiale

- CV in PDF: **non si fanno**. Il sito non ospita CV scaricabili.
- Clip video dei progetti: **abbandonate**. Restano le immagini statiche.
- Riga di posizionamento: scelta la prima delle tre alternative, con l'aggiunta di "oltre".
- Repository di GuitarPath: **resta privato**, quindi l'azione "vedi il codice" non compare.

---

## 12. Fuori ambito

Blog, form di contatto, analytics, sistema di commenti, area riservata, animazioni 3D, tema editor di codice, tema terminale, muro di loghi tecnologici, barre di percentuale sulle competenze, sezione testimonianze, cronologia lavorativa, sezione formazione.

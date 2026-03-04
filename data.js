
const PLACES = [

{
id:1,
title:"Cripta di San Sepolcro",
pass:"Umbilicus",
desc:`Sotto l’asfalto e il traffico moderno esiste un luogo dove Milano smette di essere contemporanea. La cripta della chiesa di San Sepolcro custodisce le stratificazioni più antiche della città: resti romani, pavimentazioni medievali, segni di continuità religiosa. Qui il tempo non si sovrappone: si accumula.`,
curiosita:[
"Per secoli è rimasta chiusa e poco visitata, conosciuta solo da studiosi e religiosi.",
"Il pavimento conserva elementi della Mediolanum romana.",
"Il termine Umbilicus era usato nell’antica Roma per indicare il centro simbolico della città."
],
leggende:[
{titolo:"Il centro invisibile",
testo:"Secondo una tradizione erudita, questo punto coinciderebbe con l’antico ombelico simbolico della città romana. Non un centro geografico, ma un punto di convergenza spirituale e civica."}
],
misteri:[
{titolo:"Strati non ancora letti",
testo:"Archeologi e storici ipotizzano che sotto le pavimentazioni visibili possano esistere livelli ancora più antichi, testimonianze non completamente studiate della Milano paleocristiana."}
]
},

{
id:2,
title:"Biblioteca Ambrosiana",
pass:"1609",
desc:`Fondata dal cardinale Federico Borromeo nel 1609, la Biblioteca Ambrosiana non fu solo un deposito di libri: fu un progetto politico e culturale. Rendere accessibile il sapere significava costruire autorità e orientare il pensiero.`,
curiosita:[
"È una delle prime biblioteche pubbliche d’Europa.",
"Custodisce il Codice Atlantico di Leonardo da Vinci.",
"Il cortile fu progettato come spazio simbolico di accesso al sapere."
],
leggende:[
{titolo:"I manoscritti non esposti",
testo:"Tra studiosi e appassionati circola da secoli la voce secondo cui alcuni manoscritti rari non siano mai stati esposti al pubblico, conservati per la loro delicatezza o per il loro valore politico e religioso."}
],
misteri:[
{titolo:"Sapere e controllo",
testo:"La nascita della biblioteca pubblica viene letta anche come strumento di controllo culturale: selezionare ciò che è accessibile significa indirizzare ciò che può essere pensato."}
]
},

{
id:3,
title:"Basilica di Sant’Ambrogio",
pass:"Serpente",
desc:`Cuore religioso e identitario della città, la basilica ambrosiana è un luogo in cui fede, potere e simboli convivono. Qui la tradizione cristiana si intreccia con elementi simbolici e popolari.`,
curiosita:[
"La Colonna del Diavolo si trova poco distante dalla basilica.",
"Il serpente bronzeo su una colonna è un antico simbolo reinterpretato in chiave cristiana.",
"La basilica conserva reliquie di grande importanza storica."
],
leggende:[
{titolo:"La Colonna del Diavolo",
testo:"La tradizione racconta che il diavolo, tentando di colpire Sant’Ambrogio, rimase incastrato nella colonna lasciando i segni delle corna nel marmo. Ancora oggi i fori sono visibili."}
],
misteri:[
{titolo:"L’odore di zolfo",
testo:"Secondo la credenza popolare, avvicinando l’orecchio ai fori della colonna si percepirebbe odore di zolfo o suoni provenienti dal sottosuolo, eco simbolico del regno infernale."}
]
},

{
id:4,
title:"Sotterranei del Duomo",
pass:"Santa Tecla",
desc:`Sotto il Duomo si nasconde una città precedente: resti della basilica di Santa Tecla e strutture medievali testimoniano come Milano abbia costruito la propria monumentalità sopra ciò che l’ha preceduta.`,
curiosita:[
"La basilica di Santa Tecla era tra le più grandi dell’Italia medievale.",
"Le stratificazioni archeologiche mostrano secoli di trasformazioni urbane.",
"Il sito testimonia la continuità tra architetture religiose successive."
],
leggende:[
{titolo:"La città sotto la città",
testo:"La tradizione popolare parla di passaggi sotterranei che collegherebbero il Duomo ad altri edifici storici. Non esistono prove definitive, ma il mito persiste."}
],
misteri:[
{titolo:"Costruire sopra",
testo:"Ogni ricostruzione religiosa ha comportato la cancellazione simbolica di quella precedente: distruggere, inglobare, trasformare."}
]
},

{
id:5,
title:"Ca’ Granda",
pass:"Colomba",
desc:`L’Ospedale Maggiore, detto Ca’ Granda, rappresenta la trasformazione della carità in istituzione pubblica. La cura diventa organizzazione, la pietà diventa sistema.`,
curiosita:[
"La colomba è simbolo legato alla fondazione.",
"L’edificio è un capolavoro rinascimentale lombardo.",
"L’ospedale fu sostenuto da donazioni e lasciti."
],
leggende:[
{titolo:"La colomba della protezione",
testo:"Secondo una tradizione simbolica, la colomba rappresentava la protezione divina sui malati e sui poveri ospitati nell’istituto."}
],
misteri:[
{titolo:"Cura e controllo",
testo:"Storici sociali sottolineano come l’assistenza sanitaria fosse anche un modo per gestire povertà e marginalità urbana."}
]
},

{
id:6,
title:"Necropoli di Sant’Eustorgio",
pass:"Stella",
desc:`Le sepolture paleocristiane attorno a Sant’Eustorgio raccontano una città che si espande anche nella morte. Le necropoli definivano spazi, gerarchie e identità.`,
curiosita:[
"Gli scavi hanno rivelato tombe antichissime.",
"La stella sul campanile è un simbolo distintivo.",
"L’area era punto d’accesso meridionale alla città."
],
leggende:[
{titolo:"La stella guida",
testo:"La tradizione popolare associa la stella alla guida spirituale dei defunti verso l’aldilà."}
],
misteri:[
{titolo:"Gerarchie invisibili",
testo:"La disposizione delle tombe suggerisce differenze sociali e religiose non immediatamente visibili."}
]
},

{
id:7,
title:"San Bernardino alle Ossa",
pass:"Ossario",
desc:`Qui la morte non è nascosta: è esposta. Le ossa umane disposte in motivi ornamentali trasformano il ricordo dei defunti in linguaggio visivo.`,
curiosita:[
"Le ossa provengono da antiche sepolture.",
"La cappella ossario è annessa alla chiesa.",
"È uno dei luoghi più singolari di Milano."
],
leggende:[
{titolo:"La danza dei morti",
testo:"Secondo una tradizione popolare, nella notte del 2 novembre le ossa si animerebbero in una danza simbolica, rievocazione medievale del memento mori."}
],
misteri:[
{titolo:"Ornamento e memoria",
testo:"Trasformare resti umani in decorazione è una scelta culturale: la morte diventa grammatica visiva e monito permanente."}
]
},

{
id:8,
title:"Cimitero Monumentale — Famedio",
pass:"Memoria",
desc:`Inaugurato nel 1866, il Monumentale è un museo a cielo aperto. Il Famedio celebra i cittadini illustri: qui la memoria diventa architettura.`,
curiosita:[
"Progettato da Carlo Maciachini.",
"Ospita le tombe di figure storiche come Alessandro Manzoni.",
"Le sculture riflettono l’arte e il simbolismo dell’Ottocento."
],
leggende:[
{titolo:"Il tempio della fama",
testo:"Il Famedio fu concepito come un tempio laico dedicato alla memoria civica, luogo in cui l’identità della città viene celebrata."}
],
misteri:[
{titolo:"Simboli nascosti",
testo:"Molti monumenti presentano allegorie e simbolismi complessi che studiosi e appassionati interpretano in chiave esoterica o massonica."}
]
}

];

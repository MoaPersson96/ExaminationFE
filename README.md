# ExaminationFE

Detta är min filmsamlings sida (The Movie Shelf). Där alla film nördar kan spara deras filmer för att komma ihåg vad man sett.

För att starta denna sida:
1. Ladda ner repot till din dator.
2. Öppna repot på din dator.
3. Öppna HTML mappen och högerklicka på index.html och klicka på "Live Server"

För att hjälpa dig på traven med hur man använder sidan så kommer du först på Home sidan där du kan se 10 filmer, du har ett sökfält där du kan skriva in namnet på en film - du har möjligheten att klicka på "Mer info" knappen då en modal kommer att komma fram med kort information om filmen - denna modal kan du sen stänga. Du har också möjligheten att lägga till filmer i din favoritlista genom att klicka på favorit knappen. För att kunna se din favoritlista så kan du klicka på "favoriter" i navigeringsbaren - Då kommer du till favorit sidan där dina favoriter ligger. Där kan du återigen klicka på mer info och en modal kommer upp - och nu har du en "ta bort" knapp istället så du kan ta bort filmer från din favoritlista.

I detta projekt uppfyller jag kraven för:
1. JSON - Genom att hämta JSON data från ett API som jag omvandlar till JS data.
2. HTTP/HTTPS - Genom att jag använder fetch() för att hämta data från API:et
3. Asynkronitet - Funktionen fetchMovies() och andra API-anrop är asynkrona och jag använder async/await för att hantera de löften.
4. UX/UI - Sidan är inte för mycket, saker ligger där man kan förvänta sig att de ska ligga.

Jag hämtar data från OMDb API:
Bas URL:
http://www.omdbapi.com/?apikey=bbe8d74e&
Endpoint - "s=<query>&page=<page> - För att hämta filmer baserat på sökord
Endpoint - "i=<imdbID> - För att hämta detaljer om en specifik film

Parametrar:
s: sökning efter film baserat på titel.
page: sidindelning för resultaten.
i: hämtar detaljer för specifik film med hjälp av imdbID

API nyckel:
bbe8d74e


# Figma design:
https://www.figma.com/design/rCgdbAtUZcuWgLuOdIbEJY/ExaminationFE?node-id=7-116&p=f&t=UgN01DOp8hOqJ7Z5-0

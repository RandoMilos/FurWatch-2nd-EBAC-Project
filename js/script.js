const mainAllowedPaths = ['/classics.html', '/index.html', '/newStuff.html', '/theBest.html']; //Constant to check the user actual ubication

const createShowCard = (show) => { //Function to create a showcard on the main page on the DOM
    const card = document.createElement('div');
    card.classList.add('show-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('show-info');

    const showRatingDiv = document.createElement('div');
    showRatingDiv.classList.add('show-rating');

    const showRating = document.createElement('p');
    showRating.classList.add('show-rating-text');
    showRating.textContent = `${show.rating.average} / 10`;

    const showRatingIcon = document.createElement('img');
    showRatingIcon.src = "img/star.svg";
    showRatingIcon.alt = "Icono estrella";
    showRatingIcon.classList.add('show-rating-icon');

    showRatingDiv.appendChild(showRatingIcon);
    showRatingDiv.appendChild(showRating);

    const showName = document.createElement('h2');
    showName.classList.add('show-name');
    showName.textContent = show.name;

    const showGenres = document.createElement('div');
    showGenres.classList.add('show-genres');

    show.genres.forEach((genre) => {
        const genreSpan = document.createElement('span');
        genreSpan.classList.add('show-genre', genre);
        genreSpan.textContent = genre;
        showGenres.appendChild(genreSpan);
    });

    infoDiv.appendChild(showName);
    infoDiv.appendChild(showGenres);
    infoDiv.appendChild(showRatingDiv);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('show-image-container');

    const image = document.createElement('img');
    image.classList.add('show-image');
    image.src = show.image.original;
    image.alt = `${show.name} image`;

    imageContainer.appendChild(image);

    card.appendChild(imageContainer);
    card.appendChild(infoDiv);

    return card;
};

const createSelectedShow = (show) => { //Function to create the selected show on the DOM
    const showContainer = document.createElement('div');
    showContainer.classList.add('selected-show-container');

    const showInfoMainContainer = document.createElement('div');
    showInfoMainContainer.classList.add('show-info-main-container')
    showContainer.appendChild(showInfoMainContainer)

    const showEpisodesContainer = document.createElement('div');
    showEpisodesContainer.classList.add('show-episodes-container')

    const shortInfoDiv = document.createElement('div');
    shortInfoDiv.classList.add('short-info-div');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('short-image-div');
    showInfoMainContainer.appendChild(imageDiv);

    const imageShort = document.createElement('img');
    imageShort.classList.add("short-image");
    imageShort.src = show.image.original;
    imageShort.alt = `${show.name} image`;
    imageDiv.appendChild(imageShort);

    const selectedShowTitle = document.createElement('h2');
    selectedShowTitle.classList.add('selected-show-title');
    selectedShowTitle.textContent = show.name;

    const showGenres = document.createElement('div');
    showGenres.classList.add('show-genres');

    show.genres.forEach((genre) => {
        const genreSpan = document.createElement('span');
        genreSpan.classList.add('show-genre', genre);
        genreSpan.textContent = genre;
        showGenres.appendChild(genreSpan);
    });

    const showRatingDiv = document.createElement('div');
    showRatingDiv.classList.add('show-rating');

    const showRating = document.createElement('p');
    showRating.classList.add('show-rating-text');
    showRating.textContent = `${show.rating.average} / 10`;

    const showRatingIcon = document.createElement('img');
    showRatingIcon.src = "img/star.svg";
    showRatingIcon.alt = "Icono estrella";
    showRatingIcon.classList.add('show-rating-icon');

    showRatingDiv.appendChild(showRatingIcon);
    showRatingDiv.appendChild(showRating);

    const showLanguage = document.createElement('p');
    showLanguage.classList.add('show-lang-text');
    showLanguage.textContent = `Lenguaje: ${show.language}`;

    const longInfoDiv = document.createElement('div');
    longInfoDiv.classList.add('show-long-info-div');

    const showLongInfo = document.createElement('p');
    showLongInfo.classList.add('show-long-info-text');
    showLongInfo.innerHTML = show.summary;

    const showNetwork = document.createElement('p');
    showNetwork.classList.add('show-long-network');
    showNetwork.textContent = `Cadena: ${show.network?.name}` || 'No network info';

    const showNetworkCountry = document.createElement('p');
    showNetworkCountry.classList.add('show-long-net-country');
    showNetworkCountry.textContent = `Pais de Origen: ${show.network?.country?.name}` || 'No country info';

    shortInfoDiv.appendChild(selectedShowTitle);
    shortInfoDiv.appendChild(showGenres);
    shortInfoDiv.appendChild(showRatingDiv);
    shortInfoDiv.appendChild(showLanguage);

    longInfoDiv.appendChild(showLongInfo);
    longInfoDiv.appendChild(showNetwork);
    longInfoDiv.appendChild(showNetworkCountry);

    showInfoMainContainer.appendChild(shortInfoDiv); 
    showInfoMainContainer.appendChild(longInfoDiv); 

    const showEPGridTitle = document.createElement('p');
    showEPGridTitle.classList.add('show-ep-title');
    showEPGridTitle.textContent = 'Lista de Episodios:'
    showContainer.appendChild(showEPGridTitle);
            

    
    const showEpGrid = document.getElementById('show-ep-grid');
    

    if (showEpGrid) showContainer.appendChild(showEpGrid); //If to instert the show episodes grid if it exists on the DOM

    const createEpisodesGrid = (ep) => { //Function to create the show episode grids
        const epInfoDiv = document.createElement('div');
        epInfoDiv.classList.add('ep-info-div');

        const epImage = document.createElement('img');
        epImage.classList.add('ep-info-img');
        epImage.src = ep.image?.medium || '';
        epImage.alt = `${ep.name} image`;

        const epName = document.createElement('p');
        epName.classList.add('ep-name');
        epName.textContent = `Episodio: ${ep.name}`;

        epInfoDiv.appendChild(epImage);
        epInfoDiv.appendChild(epName);

        return epInfoDiv;
    };

    async function fetchShowEpisodes(show) { //Function to fetch the selected show episode from the API
        try {

            const epRes = await axios.get(`https://api.tvmaze.com/shows/${show.id}/episodes`);
            const showEPS = epRes.data;
            if (showEpGrid) 
                showEpGrid.innerHTML = "";

            for (const ep of showEPS) {
                if (!ep || !ep.season || !ep.number) continue;
                const epCard = createEpisodesGrid(ep);
                if (showEpGrid) 
                    showEpGrid.appendChild(epCard);
            }
        } catch (error) {
            console.error("Error al obtener episodios:", error);
        }
    }

    fetchShowEpisodes(show);
    return showContainer;
};

const toShow = (show) => { //Function to save the selected show to the Local Storage
    localStorage.setItem('show', JSON.stringify(show));
    window.location.assign("selectedShow.html");
};

function endDateShow(show) { //Function to change the show end value from string to int
    const cleanEDate = show.ended ? show.ended.replace(/-/g, "") : "0";
    show.IntEDate = parseInt(cleanEDate);
}

async function loadMainShows() {
    const showGrid = document.getElementById('shows-grid');
    if (!showGrid) return; // Evita errores si el elemento no existe

    try {
        const res = await axios.get("https://api.tvmaze.com/shows");
        const shows = res.data;
        showGrid.innerHTML = "";

        for (const show of shows) {
            if (!show || !show.rating || !show.image) continue;
            endDateShow(show);
            const showCard = createShowCard(show);
            showCard.addEventListener('click', () => toShow(show));
            showGrid.appendChild(showCard);
        }
    } catch (error) {
        console.error("Error haciendo fetch de los datos del show: ", error);
    }
}

async function loadBestShows() { //Function to load the best shows
    const showGrid = document.getElementById('shows-grid');
    if (!showGrid) return;
    try {
        const res = await axios.get("https://api.tvmaze.com/shows", { params: { limit: 50 } });
        const shows = res.data;
        showGrid.innerHTML = "";

        for (const show of shows) {
            if (!show || !show.rating || !show.image) continue;
            if (show.rating.average >= 8.5) {
                const showCard = createShowCard(show);
                showCard.addEventListener('click', () => toShow(show));
                showGrid.appendChild(showCard);
            }
        }
    } catch (error) {
        console.error("Error haciendo fetch de los datos del show: ", error);
    }
}

async function loadNewStuff() { //Function to load the latest shows
    const showGrid = document.getElementById('shows-grid');
    if (!showGrid) return;
    try {
        const res = await axios.get("https://api.tvmaze.com/shows", { params: { limit: 50 } });
        const shows = res.data;
        showGrid.innerHTML = "";

        for (const show of shows) {
            if (!show || !show.rating || !show.image) continue;

            const cleanEDate = show.ended ? show.ended.replace(/-/g, "") : "0";
            const intEDate = parseInt(cleanEDate);
            if (intEDate >= 20210101) {
                const showCard = createShowCard(show);
                showCard.addEventListener('click', () => toShow(show));
                showGrid.appendChild(showCard);
            }
        }
    } catch (error) {
        console.error("Error haciendo fetch de los datos del show: ", error);
    }
}

async function loadClassics() { //Function to load the section classics show
    const showGrid = document.getElementById('shows-grid');
    if (!showGrid) return;
    try {
        const res = await axios.get("https://api.tvmaze.com/shows", { params: { limit: 50 } });
        const shows = res.data;
        showGrid.innerHTML = "";

        for (const show of shows) {
            if (!show || !show.rating || !show.image) continue;

            const cleanSDate = show.premiered ? show.premiered.replace(/-/g, "") : "99999999";
            const intSDate = parseInt(cleanSDate);
            if (intSDate <= 20061003) {
                const showCard = createShowCard(show);
                showCard.addEventListener('click', () => toShow(show));
                showGrid.appendChild(showCard);
            }
        }
    } catch (error) {
        console.error("Error haciendo fetch de los datos del show: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    console.log('DOM Loaded')

    if (path.includes('selectedShow.html')) { //If to check the user actual page to load the content the user needs
        const selectedShow = JSON.parse(localStorage.getItem('show'));
        const selectedShowDiv = document.getElementById('showDiv');
        
        console.log("selectedShow", selectedShow);
        console.log("selectedShowDiv", selectedShowDiv);

        if (!selectedShow) {
        alert("No se encontró el show en localStorage");
        }
        if (!selectedShowDiv) {
        alert("No se encontró el div showDiv");
        }
        
        if (selectedShow && selectedShowDiv) {
            const showElement = createSelectedShow(selectedShow);
            selectedShowDiv.appendChild(showElement);
        }
    } else if (path.includes('theBest.html')) {
        loadBestShows();
    } else if (path.includes('newStuff.html')) {
        loadNewStuff();
    } else if (path.includes('classics.html')) {
        loadClassics();
    } 
    else {
        loadMainShows();
    }

    const cellMenuIcon = document.getElementById('mobile-menu-icon'); //Selection of the mobile menu icon
    const cellMenuBody = document.getElementById('mobile-menu-body'); //Selection of the mobile menu body

    cellMenuIcon.addEventListener('click', () => { //Event listener to show and hide the menu
        cellMenuBody.classList.toggle('dmenu-hidden');
    });
});

var universityName = document.querySelector(".uni-name")
var resultList = document.querySelector(".result-list")

var URL = "https://universities.hipolabs.com/search";

let univseritiesArr = [];

fetch(URL)
    .then(data => data.json())
    //... is spread operator
    .then(data => univseritiesArr.push(...data))
    .catch(errorCatch)

function errorCatch(error) {
    resultList.innerText = error;
}


function filterResult(universityToMatch, universitiesArr) {
    return universitiesArr.filter(universityName => {
        // g is global match and i is case-insensitive
        const regex = new RegExp(universityToMatch, "gi")
        return universityName.name.match(regex) || universityName.name.match(regex) //Match with university name or country
    })
}

function displayResult() {
    // this.value - gets the input from textbox ("WORD TO BE SEARCHED")
    var result = filterResult(this.value, univseritiesArr)

    var output = result.map(data => {
        var highlight = new RegExp(this.value, 'gi');
        var highlightUniversity = data.name.replace(highlight, `<span class="highlight">${this.value}</span>`)
        var highlightCountry = data.country.replace(highlight, `<span class="highlight">${this.value}</span>`)

        return `<li> ${highlightUniversity}, ${highlightCountry} <br> <b>Website: </b>${data.web_pages}</li>`
    }).join("");
    resultList.innerHTML = output
}

universityName.addEventListener("input", displayResult)


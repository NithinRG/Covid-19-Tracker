$.getJSON("https://api.covid19api.com/summary",function(data){
    // console.log(data);

    //Set global stats
    $(".globalTotalCases").append(data.Global.TotalConfirmed);
    $(".globalTotalRecovered").append(data.Global.TotalRecovered);
    $(".globalTotalDeaths").append(data.Global.TotalDeaths);
    
    //Set stats for countries
    for (let i = 0; i < data.Countries.length; i++) {
        let country = data.Countries[i].Country;
        let totalCases = data.Countries[i].TotalConfirmed;
        let totalRecovered = data.Countries[i].TotalRecovered;
        let totalDeaths = data.Countries[i].TotalDeaths;
        let newCases = data.Countries[i].NewConfirmed;
        let newRecovered = data.Countries[i].NewRecovered;
        let newDeaths = data.Countries[i].NewDeaths;
        $(".tableBody").append(
            `<tr>
                <td class="countryRow">${country}</td>
                <td class="totalCasesRow">${totalCases}</td>
                <td class="totalRecoveredRow">${totalRecovered}</td>
                <td class="totalDeathsRow">${totalDeaths}</td>
                <td class="newCasesRow">${newCases}</td>
                <td class="newRecoveredRow">${newRecovered}</td>
                <td class="newDeathsRow">${newDeaths}</td>
            </tr>`
        );
    }

    //Last updated
    let months = [ " January ", " February ", " March ", " April ", " May ", " June ", 
    " July ", " August ", " September ", " October ", " November ", " December " ];
    let lastUpdated = data.Date.slice(8,10) + months[parseInt(data.Date.slice(5,8)) - 1] + data.Date.slice(0,4) + ", " + data.Date.slice(11,19) + "(UTC)";
    $(".lastUpdated").append(lastUpdated);

    //Back to top
    $('.backToTop').click(function() {
        $('body,html').animate({
            scrollTop : 0
        }, 500);
    });

    //Search box close button
    var table, tr, i;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    let searchBox = document.querySelectorAll('.search-box input[type="text"] + span');
    searchBox.forEach((elm) => {
        elm.addEventListener('click', () => {
            elm.previousElementSibling.value = '';
            for (i = 0; i < tr.length; i++) {
                    tr[i].style.display = "";
            }
        });
    });
    
    //Sort icon function
    $(function() {
        $("#myTable").tablesorter({ sortList: [[0,0]] });
    });
    $("th").click(function () {
        setTimeout(
            function () {
                $(".tablesorter-headerDesc").find("img").attr("src","./assets/img/desc.png");
                $(".tablesorter-headerAsc").find("img").attr("src","./assets/img/asc.png");
                $(".tablesorter-headerUnSorted").find("img").attr("src","./assets/img/unsorted.png");
            },
            5);
    });

});
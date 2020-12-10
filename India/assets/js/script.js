$(document).ready(function(){
    $("#dark").click(function () {
        if (!$(this).hasClass("dark")) {
            $(this).addClass("dark");
            $("body").addClass("darkMode");
            $(this).attr("src","./assets/img/light-mode.png")
        } else {
            $(this).removeClass("dark");
            $("body").removeClass("darkMode");
            $(this).attr("src","./assets/img/dark-mode.png")
        }
    });
});

$.getJSON("https://api.covid19india.org/v2/state_district_wise.json", function (data) {
    let countryConfirmed = 0, countryActive = 0, countryRecovered = 0, countryDeceased = 0 
    countryConfirmedDelta = 0, countryRecoveredDelta = 0, countryDeceasedDelta = 0;
    function returnNonZero(num) {
        if (num == 0) {
            return "";
        } else {
            return "+" + num;
        }
    }
    const appendToTable = (state) => {
        let stateName = state.state;
        let stateConfirmed = 0, stateActive = 0, stateRecovered = 0, stateDeceased = 0, 
        stateConfirmedDelta = 0, stateRecoveredDelta = 0, stateDeceasedDelta = 0;
        state.districtData.forEach(element => {
            stateConfirmed += element.confirmed;
            stateActive += element.active;
            stateRecovered += element.recovered;
            stateDeceased += element.deceased;
            stateConfirmedDelta += element.delta.confirmed;
            stateRecoveredDelta += element.delta.recovered;
            stateDeceasedDelta += element.delta.deceased;
        });
        $(".tableBody").append(
            `<tr>
                <td>${stateName}</td>
                <td><span class="stateDelta isRed">${returnNonZero(stateConfirmedDelta)}</span>${stateConfirmed.toLocaleString('en-IN')}</td>
                <td>${stateActive.toLocaleString('en-IN')}</td>
                <td><span class="stateDelta isGreen">${returnNonZero(stateRecoveredDelta)}</span>${stateRecovered.toLocaleString('en-IN')}</td>
                <td><span class="stateDelta isGray">${returnNonZero(stateDeceasedDelta)}</span>${stateDeceased.toLocaleString('en-IN')}</td>
            </tr>`
        );
    }
    for (let i = 1; i < data.length; i++) {
        let state = data[i];
        appendToTable(state);
        let stateConfirmed = 0, stateActive = 0, stateRecovered = 0, stateDeceased = 0, 
        stateConfirmedDelta = 0, stateRecoveredDelta = 0, stateDeceasedDelta = 0;
        state.districtData.forEach(element => {
            stateConfirmed += element.confirmed;
            stateActive += element.active;
            stateRecovered += element.recovered;
            stateDeceased += element.deceased;
            stateConfirmedDelta += element.delta.confirmed;
            stateRecoveredDelta += element.delta.recovered;
            stateDeceasedDelta += element.delta.deceased;
        });
        countryConfirmed += stateConfirmed;
        countryActive += stateActive;
        countryRecovered += stateRecovered;
        countryDeceased += stateDeceased;
        countryConfirmedDelta += stateConfirmedDelta;
        countryRecoveredDelta += stateRecoveredDelta;
        countryDeceasedDelta += stateDeceasedDelta;
    }
    $(".countryConfirmed").append(countryConfirmed.toLocaleString('en-IN'));
    $(".countryActive").append(countryActive.toLocaleString('en-IN'));
    $(".countryRecovered").append(countryRecovered.toLocaleString('en-IN'));
    $(".countryDeceased").append(countryDeceased.toLocaleString('en-IN'));
    $(".countryConfirmedDelta").append(countryConfirmedDelta);
    $(".countryRecoveredDelta").append(countryRecoveredDelta);
    $(".countryDeceasedDelta").append(countryDeceasedDelta);


    //Search function
    $(".search").click(() => {
        let searchString = $(".search-box").val();
        let matching = [];
        for (let i = 1; i < data.length; i++) {
            stateName = data[i].state.toLowerCase();
            if (stateName.includes(searchString.toLowerCase())) {
                matching.push(data[i].statecode)
            }
        }
        console.log(matching);
        $(".tableBody").empty()
        if (matching.length == 0) {
            $(".table").hide();
            $(".notFound").show();
        } else {
            $(".table").show();
            $(".notFound").hide();
            for (const stateCode of matching) {
                for (let i = 1; i < data.length; i++) {
                    state = data[i];
                    console.log(state.statecode)
                    console.log(stateCode)
                    if (state.statecode === stateCode) {
                        appendToTable(state);
                    }
                }
            }
        }
    });
    $(".search-box").on('keypress', (key) => {
        if (key.which == 13) {
            $(".search").click();
        }
    })
});
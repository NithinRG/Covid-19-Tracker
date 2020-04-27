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
    console.log(data);
    let countryConfirmed = 0, countryActive = 0, countryRecovered = 0, countryDeceased = 0 
    countryConfirmedDelta = 0, countryRecoveredDelta = 0, countryDeceasedDelta = 0;
    function returnNonZero(num) {
        if (num == 0) {
            return "";
        } else {
            return "+" + num;
        }
    }
    for (let i = 0; i < data.length; i++) {
        let state = data[i].state;
        let stateConfirmed = 0, stateActive = 0, stateRecovered = 0, stateDeceased = 0, 
        stateConfirmedDelta = 0, stateRecoveredDelta = 0, stateDeceasedDelta = 0;
        data[i].districtData.forEach(element => {
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
                <td>` + state + `</td>
                <td><span class="stateDelta isRed">` + returnNonZero(stateConfirmedDelta) + `</span>` + stateConfirmed.toLocaleString('en-IN') + `</td>
                <td>` + stateActive.toLocaleString('en-IN') + `</td>
                <td><span class="stateDelta isGreen">` + returnNonZero(stateRecoveredDelta) + `</span>` + stateRecovered.toLocaleString('en-IN') + `</td>
                <td><span class="stateDelta isGray">` + returnNonZero(stateDeceasedDelta) + `</span>` + stateDeceased.toLocaleString('en-IN') + `</td>
            </tr>`
        );
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
});
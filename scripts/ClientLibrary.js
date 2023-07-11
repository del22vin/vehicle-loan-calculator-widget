var banksData;

function RenderLoanCalculator(theme, title, amountOfLoan, width) {

    document.getElementById("C88VehicleLoanCalculatorContainer").style.maxWidth = width + "px";
    //var theme= window.frameElement.getAttribute('calculatortheme');
    //var theme = getAllUrlParams().calculatortheme;
    if (theme == '' || theme == null) {
        theme = "bluehorizon";
    }

    var cssId = 'VehicleLoanCalculatorCss';  // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/" + theme + ".css";
        link.media = 'all';
        head.appendChild(link);
    }


    var imgPathTheme;

    if (theme == "bluehorizon") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/BlueHorizon";
    }
    else if (theme == "greenforest") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/GreenForest";
    }
    else if (theme == "grayscale") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/Grayscale";
    }
    else if (theme == "blackmatter") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/BlackMatter";
    }
    else if (theme == "redroyale") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/RedRoyale";
    }
    else if (theme == "browncrown") {
        imgPathTheme = "http://localhost:17071/Products/VehicleLoanCalculator/V2/Themes/Images/BrownCrown";
    }
    //document.getElementById('VehicleLoanCalculatorCss').href = "../Themes/" + theme + ".css";

    //var title = getAllUrlParams().title;
    title = decodeURI(title).toUpperCase();

    var content;

    var head = '';
    var form = '';
    var actionBtns = '';
    var applyBtn = '';
    var last = '';

    var computation = '';

    //var amountOfLoan = getAllUrlParams().amount;
  
     banksData = GetBanksData();

    var rates;

    head = '<div class="loanCalculatorMainContent"><div class="top"><div class="topLeft"> &nbsp;</div> <div class="topCenter"><span id="CalculatorLogo"></span> <label id="LoanCalculatorHeaderName" class="loanCalculatortitle">' + title + '</label> &nbsp;</div><div class="topRight"> &nbsp;</div> </div><div class="middle"> <div class="middleLeft">&nbsp;</div><div class="middleCenter"><div id="LoanCalculatorIcon" class="objectIcon"></div><div id="LoanCalculatorTitle" class="objectTitle">Housing Loan Calculator</div><div id="LoanCalculatorDescription" class="objectDescription">loan Calculator................</div>';

    form = '<form id="LoanCalculatorForm" class="form" method="post" action=""><div id="AddNewLoanCalculatorValidationSummaryErrors" class="validationSummaryErrors"> <span></span><ul> <li></li></ul></div><div id="LoanCalculatorPropertiesTabControl" class="tabControl"> <ul> <li id="GeneralTab" class="selected"><a href="#GeneralTabItem">Housing Loan Calculator</a></li></ul><div id="GeneralTabItem" class="tabItem"><div id="GeneralTabContent" class="tabContent"> ';

    var formItems = '';

    formItems += '<div id="LoanCalculatorIdPropertyDiv" class="propertyDiv">';
    formItems += '<label id="LoanCalculatorIdLabel" class="propertyNameLabel">Loan Calculator Id</label>';
    formItems += '<input type="text" name="LoanCalculatorIdValueTextBox" id="LoanCalculatorIdValueTextBox" class="propertyValueTextBox" />';
    formItems += '<div id="LoanCalculatorIdNotification" class="propertyNotification"><div id="LoanCalculatorIdNotificationIcon" class="propertyNotificationIcon"></div><div id="LoanCalculatorIdNotificationMessage" class="propertyNotificationMessage"></div></div>';
    formItems += '<div id="LoanCalculatorIdPopover" class="propertyPopover"><div id="LoanCalculatorIdPopoverIcon" class="propertyPopoverIcon"></div><div id="LoanCalculatorIdPopoverTitle" class="propertyPopoverTitle">LoanCalculatorId </div><div id="LoanCalculatorIdPopoverDescription" class="propertyPopoverDescription">LoanCalculatorId.. </div></div>';
    formItems += '</div>';

    formItems += ' <div id="AmountOfLoanPropertyDiv" class="propertyDiv">';
    formItems += '<label id="AmountOfLoanLabel" class="propertyNameLabel">Amount Of Loan</label>';
    formItems += '<input type="text" name="AmountOfLoanValueTextBox" id="AmountOfLoanValueTextBox" class="propertyValueTextBox" value="' + amountOfLoan + '" readonly/>';
    formItems += '<div id="AmountOfLoanNotification" class="propertyNotification"><div id="AmountOfLoanNotificationIcon" class="propertyNotificationIcon"></div> <div id="AmountOfLoanNotificationMessage" class="propertyNotificationMessage"></div></div>';
    formItems += '<div id="AmountOfLoanPopover" class="propertyPopover"> <div id="AmountOfLoanPopoverIcon" class="propertyPopoverIcon"></div><div id="AmountOfLoanPopoverTitle" class="propertyPopoverTitle"> ..</div><div id="AmountOfLoanPopoverDescription" class="propertyPopoverDescription">..</div></div>';
    formItems += '</div>';

    formItems += '<div id="BankPropertyDiv" class="propertyDiv">';
    formItems += '<label id="BankLabel" class="propertyNameLabel">Bank</label>';

    //Banks data
    formItems += '<select name="BankSelect" id="BankValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();">';

    for (var i = 0; i < banksData.value.length; i++) {
        formItems += '<option value="' + i + '">' + banksData.value[i].Bank + '</option>';
    }

    formItems += '</select>';

    formItems += '<div id="BankNotification" class="propertyNotification"><div id="BankNotificationIcon" class="propertyNotificationIcon"></div><div id="BankNotificationMessage" class="propertyNotificationMessage"></div></div>';
    formItems += '<div id="BankPopover" class="propertyPopover"><div id="BankPopoverIcon" class="propertyPopoverIcon"></div><div id="BankPopoverTitle" class="propertyPopoverTitle">..</div><div id="BankPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
    formItems += '</div>';

    formItems += '<div id="DownpaymentPropertyDiv" class="propertyDiv">';
    formItems += '<label id="DownpaymentLabel" class="propertyNameLabel">Downpayment</label>';
    formItems += '<select name="downpaymentSelect" id="DownpaymentValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();"><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50" selected="selected">50%</option></select>';
    formItems += '<div id="DownpaymentNotification" class="propertyNotification"><div id="DownpaymentNotificationIcon" class="propertyNotificationIcon"></div><div id="DownpaymentNotificationMessage" class="propertyNotificationMessage"></div></div>';
    formItems += '<div id="DownpaymentPopover" class="propertyPopover"><div id="DownpaymentPopoverIcon" class="propertyPopoverIcon"></div><div id="DownpaymentPopoverTitle" class="propertyPopoverTitle">..</div><div id="DownpaymentPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
    formItems += '</div>';

    formItems += '<div id="PaymentTermPropertyDiv" class="propertyDiv">';
    formItems += '<label id="PaymentTermLabel" class="propertyNameLabel">Payment Term</label>';
    formItems += '<select name="downpaymentSelect" id="PaymentTermValueSelect" class="propertyValueTextBox" onchange="CalculateLoan();"><option value="12">1 Year</option><option value="18">1.5 Years</option><option value="24">2 Years</option><option value="36">3 Years</option><option value="48">4 Years</option><option value="60" selected="selected">5 Years</option></select>';
    formItems += '<div id="PaymentTermNotification" class="propertyNotification"><div id="PaymentTermNotificationIcon" class="propertyNotificationIcon"></div> <div id="PaymentTermNotificationMessage" class="propertyNotificationMessage"></div></div>';
    formItems += ' <div id="PaymentTermPopover" class="propertyPopover"><div id="PaymentTermPopoverIcon" class="propertyPopoverIcon"></div><div id="PaymentTermPopoverTitle" class="propertyPopoverTitle">.. </div><div id="PaymentTermPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
    formItems += '</div>';

    //formItems += '<div id="EmailPropertyDiv" class="propertyDiv">';
    //formItems += '<label id="EmailLabel" class="propertyNameLabel">Email</label>';
    //formItems += '<input type="text" id="EmailValue" class="propertyValueTextBox" />';
    //formItems += '<div id="PaymentTermNotification" class="propertyNotification"><div id="PaymentTermNotificationIcon" class="propertyNotificationIcon"></div> <div id="PaymentTermNotificationMessage" class="propertyNotificationMessage"></div></div>';
    //formItems += ' <div id="PaymentTermPopover" class="propertyPopover"><div id="PaymentTermPopoverIcon" class="propertyPopoverIcon"></div><div id="PaymentTermPopoverTitle" class="propertyPopoverTitle">.. </div><div id="PaymentTermPopoverDescription" class="propertyPopoverDescription"> ..</div></div>';
    //formItems += '</div>';

    form += formItems;

    form += ' </div></div> </div></form>';

    actionBtns += '<div id="LoanCalculatorActionButtonGroup" class="actionButtonGroup"> <div class="top"><div class="topLeft">&nbsp;</div><div class="topCenter">&nbsp;</div><div class="topRight"> &nbsp;</div></div><div class="middle"> <div class="middleLeft">&nbsp;</div><div class="middleCenter">';
    //actionBtns += '<a href="javascript:void(0);" id="CalculateLoanCalculatorButton" onclick="CalculateLoanCalculatorButton_Clicked()" class="button" onmousedown="className=\'button pressed\';" onmouseup="className=\'button hovered\';" onmouseout="className=\'button\';" title="" data-disabled="enabled" ><img alt="" src="" height="1px" width="1px" /><span>Calculate</span></a>';
    actionBtns += '<a href="javascript:void(0);" id="ClearLoanCalculatorButton" onclick="ClearLoanCalculatorButton_Clicked()" class="button" onmousedown="className=\'button pressed\';" onmouseup="className=\'button hovered\';" onmouseout="className=\'button\';" title="" data-disabled="enabled" ><img alt="" src="" height="1px" width="1px" /><span>Clear</span></a>';
    actionBtns += '</div>';

    var computationHeaderMsg;
    var monthlyPrice;
    var downpayment;
    var amountFinanced;


    //class dependent
    computationHeaderMsg = 'Fulfill your dream to own a house!';


    /*--------------------------------------------------------*/
    computation += '<div id="ComputationContainer" style="display:none;"> <div id="ComputationHeader"> <div id="ComputationHeaderSec1"><img src="' + imgPathTheme + '/driveDream.png" /></div>  </div> ';

    computation += '<div id="ComputationContent">';
    computation += '<div id="ComputationMonthlyContent"><div id="MonthlyPriceComputation">  </div><div id="MonthlyLabel">Monthly</div></div>';

    computation += '<div id="ComputationDetailsContent">';
    computation += '<table>';
    computation += '<tr id="DownpaymentComputation"><td class="computationDetailsLabel">Downpayment</td><td id="DownpaymentComputationValue" class="computationDetailsValue">   </td></tr>';
    computation += '<tr id="FinancedComputation"><td class="computationDetailsLabel">Amount Financed</td><td id="FinancedComputationValue" class="computationDetailsValue">   </td></tr>';
    computation += '</table>';
    computation += '</div>';

    computation += ' </div></div>';
    /*--------------------------------------------------------*/

    applyBtn += '<div id="ApplyContainer"><a href="javascript:void(0);" id="ApplyLoanCalculatorButton" onclick="ApplyLoanCalculatorButton_Clicked()" title="" data-disabled="enabled" ><img alt="" src="' + imgPathTheme + '/carBG-Apply.png" /><span></span></a></div>';


    last = '<div class="middleRight"> &nbsp;</div></div><div class="bottom"><div class="bottomLeft"> &nbsp;</div><div class="bottomCenter"> &nbsp;</div><div class="bottomRight">&nbsp;</div> </div></div></div><div class="middleRight"> &nbsp;</div> </div><div class="bottom"><div class="bottomLeft">&nbsp;</div><div class="bottomCenter">&nbsp;</div><div class="bottomRight">&nbsp;</div> </div></div>';


    content = head + form + actionBtns + computation + applyBtn + last;
    //$('#C88VehicleLoanCalculatorContainer').html(content);
    
    var theDiv = document.getElementById("C88VehicleLoanCalculatorContainer");
    theDiv.innerHTML = content;

    //for (var i = 0; i < banksData.value.length; i++) {
    //    banks +=  banksData.value[i].Rate1;
    //}

    if ((document.getElementById("C88VehicleLoanCalculatorContainer").offsetWidth) < 450) {
        document.getElementById('C88VehicleLoanCalculatorContainer').className += ' minCalcuContainer';
    }


    CalculateLoan();
}

function GetBanksData() {
    //TODO:get banks data rates from DB

    var text = '{"value":[' +
'{"Bank":"Security Bank", "Rate1":"10.18", "Rate2":"10.36", "Rate3":"11.75", "Rate4":"11.96", "Rate5":"12.05", "Rate6":"12.41" },' +
'{"Bank":"BPI", "Rate1":"8.95", "Rate2":"8.90", "Rate3":"9.74", "Rate4":"9.94", "Rate5":"10.03", "Rate6":"10.18" },' +
'{"Bank":"Metrobank", "Rate1":"8.44", "Rate2":"8.44", "Rate3":"9.24", "Rate4":"9.44", "Rate5":"9.53", "Rate6":"9.68"},' +
'{"Bank":"PNB", "Rate1":"9.36", "Rate2":"9.54", "Rate3":"9.74", "Rate4":"9.94", "Rate5":"10.03", "Rate6":"10.18"},' +
'{"Bank":"UnionBank", "Rate1":"11.90", "Rate2":"11.31", "Rate3":"10.50", "Rate4":"10.39", "Rate5":"10.63", "Rate6":"10.93"},' +
'{"Bank":"PBCom", "Rate1":"10.90", "Rate2":"9.88", "Rate3":"11.13", "Rate4":"9.90", "Rate5":"10.12", "Rate6":"10.85"},' +
'{"Bank":"RCBC", "Rate1":"10.08", "Rate2":"9.93", "Rate3":"10.09", "Rate4":"10", "Rate5":"10.08", "Rate6":"10.23"}]}';

    var data = JSON.parse(text);
    return data;
}

function CalculateLoan() {

    //Get input values

    var amountOfLoan = document.getElementById('AmountOfLoanValueTextBox').value;
    var bankRate;
    var downpayment = document.getElementById('DownpaymentValueSelect').value;
    var paymentTerm = document.getElementById('PaymentTermValueSelect').value;

    
    var bank = document.getElementById('BankValueSelect').value;
   
    if (paymentTerm == 12) {
        bankRate = banksData.value[bank].Rate1;
    }
    else if (paymentTerm == 18) {
        bankRate = banksData.value[bank].Rate2;
    }
    else  if (paymentTerm == 24) {
        bankRate = banksData.value[bank].Rate3;
    }
    else if (paymentTerm == 36) {
        bankRate = banksData.value[bank].Rate4;
    }
    else if (paymentTerm == 48) {
        bankRate = banksData.value[bank].Rate5;
    }
    else if (paymentTerm == 60) {
        bankRate = banksData.value[bank].Rate6;
    }

   

    CalculateDownpaymentPrice(amountOfLoan, bankRate, downpayment, paymentTerm);
    CalculateAmortizationPayment(amountOfLoan, bankRate, downpayment, paymentTerm);
    CalculateAmountFinanced(amountOfLoan, bankRate, downpayment, paymentTerm);

    var x = document.getElementById('ComputationContainer');
    x.style.display = 'block';
}

function CalculateAmortizationPayment(amountOfLoan, bankRate, downpayment, paymentTerm) {

    var downpaymentPayment = amountOfLoan * (downpayment / 100);

    var rate = bankRate / 100 / 12, paymentTerm;
    var nper =  paymentTerm;
    var pv =  -Math.round(amountOfLoan - downpaymentPayment);

    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    //-------------------------------------
    //var downpaymentPayment = amountOfLoan * (downpayment / 100);
    //var amount = Math.round((amountOfLoan - downpaymentPayment) / paymentTerm);
    var amount = pmt.toLocaleString("en") + ' PHP';

    //$('#MonthlyPriceComputation').html(amount);
    var theDiv = document.getElementById("MonthlyPriceComputation");
    theDiv.innerHTML = amount;

    //pmt(bankRate / 100 / 12, paymentTerm,  Math.round((amountOfLoan - downpaymentPayment) / paymentTerm)).toFixed(2);
}

function pmt(rate, nper, pv) {
    var pvif, pmt;

    pvif = Math.pow(1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    return pmt;
};
function CalculateDownpaymentPrice(amountOfLoan, bankRate, downpayment, paymentTerm) {
    var downpaymentPayment = Math.round(amountOfLoan * (downpayment / 100));
    downpaymentPayment = downpaymentPayment.toLocaleString("en") + ' PHP';

    //$('#DownpaymentComputation > .computationDetailsValue').html(downpaymentPayment);
    var theDiv = document.getElementById("DownpaymentComputationValue");
    theDiv.innerHTML = downpaymentPayment;

}
function CalculateAmountFinanced(amountOfLoan, bankRate, downpayment, paymentTerm) {

    var downpaymentPayment = Math.round(amountOfLoan * (downpayment / 100));
    var amountFinanced = Math.round(amountOfLoan - downpaymentPayment);
    amountFinanced = amountFinanced.toLocaleString("en") + ' PHP';

    //$('#FinancedComputation > .computationDetailsValue').html(amountFinanced);
    var theDiv = document.getElementById("FinancedComputationValue");
    theDiv.innerHTML = amountFinanced;
}

function CalculateLoanCalculatorButton_Clicked() {
    CalculateLoan();
}

function GetAmountFromExternal() {
    return 2970000;
}


//------------------------------

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                    // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
                // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;      //---------https://www.sitepoint.com/get-url-parameters-with-javascript/
}
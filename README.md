# vehicle-loan-calculator-widget
A vehicle loan calculator widget I created that can be implemented on different websites which allows users to compare rates from different partner banks.  

You can also implement this widget on your website with pre-made themes.
  <ul>
    <li>blackmatter</li>
    <li>bluehorizon</li>
    <li>browncrown</li>
    <li>grayscale</li>
    <li>greenforest</li>
    <li>redroyale</li>
  </ul>


  To implement, add the files on your project folder and include these on your page:
  
  <code>
  
    <script src="scripts/ClientLibrary-1.2.0.js"></script>

    <script type="text/javascript">
        window.onload = function(e){
            //include this
            $("#VehicleLoanCalculatorContainer").HousingLoanCalculator({
                amountOfLoan: 800000,
                theme: "redroyale",
                width: 520,
                defaultPaymentTerms: 60,
                lockPaymentTerms: false,
                hidePaymentTerms: false,
                defaultBank: "BPI",
                lockBank: false,
                hideBank: false,
                defaultDownpayment: 20,
                lockDownpayment: false,
                hideDownpayment: false,
                hideMarketing: false
            });

        }

    </script>
    
  </code>
Click here for a quick demo:
<a href="https://del22vin.github.io/vehicle-loan-calculator-widget/">Vehicle Loan Calculator Widget Demo</a>

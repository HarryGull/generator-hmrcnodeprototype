var express = require('express');

var router = express.Router();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// **************************************************************************************
// **************************************************************************************
// Add your own project folder to the views folder and then add your own prototype route below 
// When ready remove the views/examples folder and the associated example routes below. 
// **************************************************************************************
// **************************************************************************************
router.get('/', function (req, res) {
  res.render('start');
});

// Landing page
router.post('/start', function(req, res){
    // routing
    res.redirect(301, '/scenarios');
});

/************** example basic route section with no pre-population or session saving ***/
router.get('/scenarios', function (req, res) {
  
  // just clear any session variables out as starting a new scenario (journey through prototype)
  req.session.service = '',
  req.session.SRN = '',
  req.session.indOrComp = '',
  req.session.isIndividual = '',
  req.session.isCompany = '',
  req.session.fullname = '',
  req.session.address1 = '',
  req.session.address2 = '',
  req.session.address3 = '',
  req.session.address4 = '',
  req.session.postcode = '', 
  req.session.phone = '',
  req.session.dateDday = '',
  req.session.dateMonth = '',
  req.session.dateYear = '',
  req.session.nino = ''

   // just render the page 'as  is'
  res.render('scenarios');
});

// about-service
router.get('/examples/about-service', function (req, res) {
  res.render('examples/about-service');
});

router.post('/examples/about-service', function (req, res) {
 // conditional navigation based on entered form data
 if (req.body.indOrComp == 'company') {
   res.redirect(301, '/examples/about-company');      
  }
  else  {
   res.redirect(301, '/examples/about-person');
  }
});

// about-person
router.get('/examples/about-person', function (req, res) {
  res.render('examples/about-person');
});

router.post('/examples/about-person', function (req, res) {
    res.redirect(301, '/examples/about-person-two');
});

// about-person-two
router.get('/examples/about-person-two', function (req, res) {
  res.render('examples/about-person-two');
});

router.post('/examples/about-person-two', function (req, res) {
    res.redirect(301, '/examples/summary');
});

// about-company
router.get('/examples/about-company', function (req, res) {
  res.render('examples/about-company');
});

router.post('/examples/about-company', function (req, res) {
    res.redirect(301, '/examples/about-company-two');
});

// about-company-two
router.get('/examples/about-company-two', function (req, res) {
  res.render('examples/about-company-two');
});

router.post('/examples/about-company-two', function (req, res) {
    res.redirect(301, '/examples/summary');
});

// summary
router.get('/examples/summary', function (req, res) {
  res.render('examples/summary');
});

router.post('/examples/summary', function(req, res){
    res.redirect(301, 'examples/summary');
});
/************************************* end of basic routes section ***************************************/


/************** Advanced example routes with pre-population and session saving ***************************/
/*## Same basic journey but using session to save entered data and display it later **********************/
/*## If no data is entered default data is saved into session on post ************************************/
/*## The same summary page is reused to display the data whether a company or individual                  /
/    by using mustache to change the labels and edit links based on the session data passed to the page.  /
/    See router.get('/examples/summary-session' and  summary-session.html                                */
/************************************* end of basic routes section ***************************************/

// about-service-session
router.get('/examples/about-service-session', function (req, res) {
  res.render('examples/about-service-session');
});

router.post('/examples/about-service-session', function (req, res) {
  // save the data. set up default data if nothing entered for this prototype
  if (req.body.SRN) {
    req.session.SRN = req.body.SRN;
  } else {
    req.session.SRN = '12345789';
  }

  if(req.body.indOrComp && req.body.indOrComp == 'individual') {
    req.session.isIndividual = true;; 
    req.session.isCompany = false; 
    req.session.indOrComp = 'individual';
  }else {
    req.session.isCompany = true; 
    req.session.isIndividual = false; 
    req.session.indOrComp = 'company';
  }
  if (req.body.service) {
    req.session.service = req.body.service;
  } else {
     req.session.service = 'Default service';
  }
  
  // routing - conditional navigation based on form data
  if (req.session.isCompany) {
    res.redirect(301, '/examples/about-company-session');      
  }
  else  {
   res.redirect(301, '/examples/about-person-session');
  }
});

// about-person-session
router.get('/examples/about-person-session', function (req, res) {
  res.render('examples/about-person-session');
});

router.post('/examples/about-person-session', function (req, res) {
  
  // save the data. set up default data if nothing entered for this prototype
  if (req.body.fullname) {
    req.session.fullname = req.body.fullname;
  } else {
    req.session.fullname = 'Mr Default Name';
  }
  if (req.body.address1) {
    req.session.address1 = req.body.address1;
  } else {
    req.session.address1 = '1 Default St';
  }
  if (req.body.address2) {
    req.session.address2 = req.body.address2;
  } else {
    req.session.address2 = 'Default Area';
  }
  if (req.body.address3) {
    req.session.address3 = req.body.address3;
  } else {
    req.session.address3 = 'Default Town';
  }
  if (req.body.address4) {
    req.session.address4 = req.body.address4;
  } else {
    req.session.address4 = 'Default County';
  }
  if (req.body.postcode) {
    req.session.postcode = req.body.postcode;
  } else {
    req.session.postcode = 'PE6 5O8';
  }

  // routing
  res.redirect(301, '/examples/about-person-two-session');
});

// about-person-two-session
router.get('/examples/about-person-two-session', function (req, res) {
  res.render('examples/about-person-two-session');
});

router.post('/examples/about-person-two-session', function (req, res) {
  // save the data. set up default data if nothing entered for this prototype
  if (req.body.phone) {
    req.session.phone = req.body.phone;
  } else {
    req.session.phone = '01234 56789';
  }
  if (req.body.dateDday) {
    req.session.dateDday = req.body.dateDday;
  } else {
    req.session.dateDday = '1';
  }
  if (req.body.dateMonth) {
    req.session.dateMonth = req.body.dateMonth;
  } else {
    req.session.dateMonth = '1';
  }
  if (req.body.dateYear) {
    req.session.dateYear = req.body.dateYear;
  } else {
    req.session.dateYear = '1970';
  }
  if (req.body.nino) {
    req.session.nino = req.body.nino;
  } else {
    req.session.nino = 'ZZ654321A';
  }
  
  res.redirect(301, '/examples/summary-session');
});

// about-company-session
router.get('/examples/about-company-session', function (req, res) {
  res.render('examples/about-company-session');
});

router.post('/examples/about-company-session', function (req, res) {
  // save the data. set up default data if nothing entered for this prototype
  if (req.body.fullname) {
    req.session.fullname = req.body.fullname;
  } else {
    req.session.fullname = 'Default Company Name';
  }
  if (req.body.address1) {
    req.session.address1 = req.body.address1;
  } else {
    req.session.address1 = '2 Default St';
  }
  if (req.body.address2) {
    req.session.address2 = req.body.address2;
  } else {
    req.session.address2 = 'Default Area';
  }
  if (req.body.address3) {
    req.session.address3 = req.body.address3;
  } else {
    req.session.address3 = 'Default Town';
  }
  if (req.body.address4) {
    req.session.address4 = req.body.address4;
  } else {
    req.session.address4 = 'Default County';
  }
  if (req.body.postcode) {
    req.session.postcode = req.body.postcode;
  } else {
    req.session.postcode = 'CMP 4NY';
  }

  res.redirect(301, '/examples/about-company-two-session');
});

// about-company-two-session
router.get('/examples/about-company-two-session', function (req, res) {
  res.render('examples/about-company-two-session');
});

router.post('/examples/about-company-two-session', function (req, res) {
    
// save the data. set up default data if nothing entered for this prototype
  if (req.body.phone) {
    req.session.phone = req.body.phone;
  } else {
    req.session.phone = '01234 56789';
  }
  if (req.body.dateDday) {
    req.session.dateDday = req.body.dateDday;
  } else {
    req.session.dateDday = '4';
  }
  if (req.body.dateMonth) {
    req.session.dateMonth = req.body.dateMonth;
  } else {
    req.session.dateMonth = '2';
  }
  if (req.body.dateYear) {
    req.session.dateYear = req.body.dateYear;
  } else {
    req.session.dateYear = '1989';
  }
  if (req.body.nino) {
    req.session.nino = req.body.nino;
  } else {
    req.session.nino = '';
  }

  res.redirect(301, '/examples/summary-session');
});

// summary-session
router.get('/examples/summary-session', function (req, res) {
  // The router get() method allows us to intercept the request when a GET request is made for the page. 
  // We will use this to pass JSON to the rendered page and then use mustache templating in the page to pre-populate it.
  // (see summary-session.html)
  res.render('examples/summary-session',{
    service : req.session.service,
    SRN : req.session.SRN,
    indOrComp : req.session.indOrComp,
    isIndividual :req.session.isIndividual,
    isCompany :req.session.isCompany,
    fullname : req.session.fullname,
    address1 : req.session.address1,
    address2 : req.session.address2,
    address3 : req.session.address3,
    address4 : req.session.address4,
    postcode : req.session.postcode,
    phone : req.session.phone,
    dateDday : req.session.dateDday,
    dateMonth : months[req.session.dateMonth - 1],
    dateYear : req.session.dateYear,
    nino : req.session.nino
  });
});

// Summary-Session
router.post('/examples/summary-session', function(req, res){
    console.log("in summary session");
    res.redirect(301, '/examples/summary-session');
});
/****************** end of advanced routes example *****************************/


module.exports = router;
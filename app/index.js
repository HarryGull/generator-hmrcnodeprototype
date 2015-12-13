var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodeExpressGenerator = module.exports = function NodeExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodeExpressGenerator, yeoman.generators.Base);

NodeExpressGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);


  // section to prompt the user for a response. In this case to launch the prototype or not on completion.
  var prompts = [
    {
      name: 'RunOnComplete',
      type: 'confirm',
      message: 'Do you want to start the application in localhost on compeltion?',
      default: true
    }
  ];

   /**
   * If you add a prompt above, make sure you add it below here as well
   * e.g this.newName = props.newName;
   */
  this.prompt(prompts, function (props) {
    this.RunOnComplete = props.RunOnComplete;
    cb();
  }.bind(this));
};


NodeExpressGenerator.prototype.copyRootFiles = function copyRootFiles() {
  
  console.log("Creating app template application root files...");
  this.copy('gitignore', '.gitignore');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('Procfile', 'Procfile');
  this.copy('README.md', 'README.md');
  this.copy('_package.json', 'package.json');
  this.copy('server.js', 'server.js');
  this.copy('start.js', 'start.js');  
};

NodeExpressGenerator.prototype.routes = function routes() {
  
  console.log("Creating app directory and the application routes file...");
  this.mkdir('app')
  this.copy('routes.js', 'app/routes.js');
};

NodeExpressGenerator.prototype.views = function views() {
  
  console.log("Scaffolding the application views...");
  console.log("Creating the app/views folders and copying view content files...");
  this.mkdir('app')
  this.mkdir('app/views');
  this.mkdir('app/views/examples');
  this.mkdir('app/views/examples/elements');
  this.mkdir('app/views/includes');

  this.copy('views/start.html', 'app/views/start.html');
  this.copy('views/scenarios.html', 'app/views/scenarios.html');
  this.copy('views/layout.html', 'app/views/layout.html');
  this.copy('views/unbranded.html', 'app/views/unbranded.html');
  this.copy('views/unbranded_template.html', 'app/views/unbranded_template.html');

  console.log("Creating the view/examples folder and copying its content files...");  
  this.copy('views/examples/about-company.html', 'app/views/examples/about-company.html');
  this.copy('views/examples/about-company-session.html', 'app/views/examples/about-company-session.html');
  this.copy('views/examples/about-company-two.html', 'app/views/examples/about-company-two.html');
  this.copy('views/examples/about-company-two-session.html', 'app/views/examples/about-company-two-session.html');
  this.copy('views/examples/about-person.html', 'app/views/examples/about-person.html');
  this.copy('views/examples/about-person-session.html', 'app/views/examples/about-person-session.html');
  this.copy('views/examples/about-person-two.html', 'app/views/examples/about-person-two.html');
  this.copy('views/examples/about-person-two-session.html', 'app/views/examples/about-person-two-session.html');
  this.copy('views/examples/about-service.html', 'app/views/examples/about-service.html');
  this.copy('views/examples/about-service-session.html', 'app/views/examples/about-service-session.html');
  this.copy('views/examples/summary.html', 'app/views/examples/summary.html');
  this.copy('views/examples/summary-session.html', 'app/views/examples/summary-session.html');


  console.log("Creating the view/examples/elements folder and copying its content files..."); 
  this.copy('views/examples/elements/forms.html', 'app/views/examples/elements/forms.html');
  this.copy('views/examples/elements/grid-layout.html', 'app/views/examples/elements/grid-layout.html');
  this.copy('views/examples/elements/radio-buttons-checkboxes.html', 'app/views/examples/elements/radio-buttons-checkboxes.html');
  this.copy('views/examples/elements/toggled-content.html', 'app/views/examples/elements/toggled-content.html');
  this.copy('views/examples/elements/typography.html', 'app/views/examples/elements/typography.html');

  console.log("Creating the view/includes folder and copying its content files..."); 
  this.copy('views/includes/breadcrumb_examples.html', 'app/views/includes/breadcrumb_examples.html');
  this.copy('views/includes/examples_head.html', 'app/views/includes/examples_head.html');
  this.copy('views/includes/head.html', 'app/views/includes/head.html');
  this.copy('views/includes/propositional_navigation.html', 'app/views/includes/propositional_navigation.html');
  this.copy('views/includes/propositional_navigation_alpha.html', 'app/views/includes/propositional_navigation_alpha.html');
  this.copy('views/includes/scripts.html', 'app/views/includes/scripts.html');
};

NodeExpressGenerator.prototype.lib = function lib() {
  
  console.log("Scaffolding the lib folder...");  
  console.log("Creating the lib folder and copying its content files...");  

  this.mkdir('lib'); 
  // root lib folder
  this.copy('lib/template-config.js', 'lib/template-config.js');
  this.copy('lib/template-conversion.js', 'lib/template-conversion.js');
  this.copy('lib/template-engine.js', 'lib/template-engine.js'); 
  this.copy('lib/utils.js', 'lib/utils.js'); 
};


NodeExpressGenerator.prototype.assets = function assets() {

  console.log("Scaffolding the app/assets folder...");  
  console.log("Creating the app/assets folder and copying its content files...");  

  // scaffold all target directories
  this.mkdir('app');
  this.mkdir('app/assets');
  this.mkdir('app/assets/images');
  this.mkdir('app/assets/javascripts');
  this.mkdir('app/assets/javascripts/govuk');
  this.mkdir('app/assets/sass');
  this.mkdir('app/assets/sass/elements');
  this.mkdir('app/assets/sass/elements/forms');
  this.mkdir('app/assets/sass/patterns');
  

  // scaffold these by copying in all the required items from the template folders to the tyarget app folders:
  // assets/images
  console.log("copying the assets/images content files...");   
  this.copy('assets/images/favicon.ico', 'app/assets/images/favicon.ico');
  this.copy('assets/images/hmrc_crest_27px.png', 'app/assets/images/hmrc_crest_27px.png');
  this.copy('assets/images/separator.png', 'app/assets/images/separator.png');
  this.copy('assets/images/separator-2x.png', 'app/assets/images/separator-2x.png');

  // assets/javascripts
  console.log("copying the assets/javascripts content files...");   
  this.copy('assets/javascripts/application.js', 'app/assets/javascripts/application.js');
  this.copy('assets/javascripts/details.polyfill.js', 'app/assets/javascripts/details.polyfill.js');
  this.copy('assets/javascripts/jquery-1.11.3.js', 'app/assets/javascripts/jquery-1.11.3.js');
  this.copy('assets/javascripts/govuk/selection-buttons.js', 'app/assets/javascripts/govuk/selection-buttons.js');

  // assets/sass
  console.log("copying the assets/sass content files...");   
  this.copy('assets/sass/application.scss', 'app/assets/sass/application.scss');
  this.copy('assets/sass/elements.scss', 'app/assets/sass/elements.scss');
  this.copy('assets/sass/examples.scss', 'app/assets/sass/examples.scss');
  this.copy('assets/sass/patterns.scss', 'app/assets/sass/patterns.scss');

  console.log("copying the assets/sass/elements content files...");   
  this.copy('assets/sass/elements/_breadcrumb.scss', 'app/assets/sass/elements/_breadcrumb.scss');
  this.copy('assets/sass/elements/_buttons.scss', 'app/assets/sass/elements/_buttons.scss');
  this.copy('assets/sass/elements/_components.scss', 'app/assets/sass/elements/_components.scss'); 
  this.copy('assets/sass/elements/_details.scss', 'app/assets/sass/elements/_details.scss');
  this.copy('assets/sass/elements/_elements-typography.scss', 'app/assets/sass/elements/_elements-typography.scss');
  this.copy('assets/sass/elements/_forms.scss', 'app/assets/sass/elements/_forms.scss');
  this.copy('assets/sass/elements/_helpers.scss', 'app/assets/sass/elements/_helpers.scss');
  this.copy('assets/sass/elements/_icons.scss', 'app/assets/sass/elements/_icons.scss');
  this.copy('assets/sass/elements/_layout.scss', 'app/assets/sass/elements/_layout.scss');
  this.copy('assets/sass/elements/_lists.scss', 'app/assets/sass/elements/_lists.scss');
  this.copy('assets/sass/elements/_panels.scss', 'app/assets/sass/elements/_panels.scss');
  this.copy('assets/sass/elements/_reset.scss', 'app/assets/sass/elements/_reset.scss');
  this.copy('assets/sass/elements/_tables.scss', 'app/assets/sass/elements/_tables.scss');

  this.copy('assets/sass/elements/forms/_form-block-labels.scss', 'app/assets/sass/elements/forms/_form-block-labels.scss');
  this.copy('assets/sass/elements/forms/_form-date.scss', 'app/assets/sass/elements/forms/_form-date.scss');
  this.copy('assets/sass/elements/forms/_form-validation.scss', 'app/assets/sass/elements/forms/_form-validation.scss');
  
   console.log("copying the assets/sass/patterns content files...");   
  
  this.copy('assets/sass/patterns/check-your-answers.scss', 'app/assets/sass/patterns/check-your-answers.scss');
 };
